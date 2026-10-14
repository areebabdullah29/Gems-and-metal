"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createSession,
  destroySession,
  isAuthenticated,
  verifyPassword,
} from "@/lib/auth";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  type Availability,
  type ProductInput,
} from "@/lib/products";
import { updateOrderStatus, type OrderStatus } from "@/lib/orders";

export interface FormState {
  error: string | null;
}

export async function loginAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const password = String(formData.get("password") ?? "");

  if (!password) {
    return { error: "Enter your admin password." };
  }

  let valid: boolean;
  try {
    valid = await verifyPassword(password);
  } catch {
    return {
      error:
        "Admin password is not configured yet. Run `npm run set-admin-password` in the project folder.",
    };
  }

  if (!valid) {
    return { error: "Incorrect password." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin");
}

function parseProductInput(formData: FormData): ProductInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const material = String(formData.get("material") ?? "").trim();
  const availability = String(formData.get("availability") ?? "in_stock") as Availability;
  const description = String(formData.get("description") ?? "").trim();
  const isCustom = formData.get("isCustom") === "on";

  if (!name) return { error: "Product name is required." };

  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price) || price < 0) {
    return { error: "Enter a valid price." };
  }

  if (!category) return { error: "Category is required." };
  if (!material) return { error: "Material is required." };

  return { name, price, category, material, isCustom, availability, description };
}

export async function createProductAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(await isAuthenticated())) {
    return { error: "Your session expired. Sign in again." };
  }

  const parsed = parseProductInput(formData);
  if ("error" in parsed) return parsed;

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? imageFile : null;

  try {
    await createProduct(parsed, image);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create product." };
  }

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProductAction(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(await isAuthenticated())) {
    return { error: "Your session expired. Sign in again." };
  }

  const parsed = parseProductInput(formData);
  if ("error" in parsed) return parsed;

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? imageFile : null;

  let updated;
  try {
    updated = await updateProduct(id, parsed, image);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update product." };
  }
  if (!updated) return { error: "Product not found." };

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath(`/shop/${updated.slug}`);
  redirect("/admin");
}

export async function deleteProductAction(id: string): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }
  await deleteProduct(id);
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin");
}

export async function setOrderStatusAction(id: string, status: OrderStatus): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }
  await updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
  redirect("/admin/orders");
}
