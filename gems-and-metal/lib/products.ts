import "server-only";
import { connection } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export type Availability = "in_stock" | "made_to_order";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  material: string;
  isCustom: boolean;
  availability: Availability;
  description: string;
  /** Cover image — images[0], or null if none uploaded yet. */
  image: string | null;
  images: string[];
  createdAt: string;
}

const PRODUCT_IMAGES_BUCKET = "product-images";

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  material: string;
  is_custom: boolean;
  availability: Availability;
  description: string;
  images: string[];
  created_at: string;
}

function fromRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    material: row.material,
    isCustom: row.is_custom,
    availability: row.availability,
    description: row.description,
    images: row.images ?? [],
    image: row.images?.[0] ?? null,
    createdAt: row.created_at,
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(name: string, ignoreId?: string): Promise<string> {
  const db = supabaseAdmin();
  const base = slugify(name) || "piece";
  let candidate = base;
  let suffix = 2;

  for (;;) {
    let query = db.from("products").select("id").eq("slug", candidate).limit(1);
    if (ignoreId) query = query.neq("id", ignoreId);
    const { data } = await query;
    if (!data || data.length === 0) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function listProducts(): Promise<Product[]> {
  await connection();
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to load products: ${error.message}`);
  return (data as ProductRow[]).map(fromRow);
}

export async function listCategories(): Promise<string[]> {
  const products = await listProducts();
  const set = new Set(products.map((p) => p.category).filter(Boolean));
  return Array.from(set).sort();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connection();
  const db = supabaseAdmin();
  const { data, error } = await db.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? fromRow(data as ProductRow) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  await connection();
  const db = supabaseAdmin();
  const { data, error } = await db.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? fromRow(data as ProductRow) : null;
}

export interface ProductInput {
  name: string;
  price: number;
  category: string;
  material: string;
  isCustom: boolean;
  availability: Availability;
  description: string;
}

async function uploadImage(file: File, productId: string): Promise<string> {
  const db = supabaseAdmin();
  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const path = `${productId}/${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await db.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: true,
  });
  if (error) throw new Error(`Failed to upload image: ${error.message}`);

  return db.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
}

async function deleteImages(urls: string[]): Promise<void> {
  if (urls.length === 0) return;
  const db = supabaseAdmin();
  const prefix = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
  const paths = urls
    .map((url) => {
      const i = url.indexOf(prefix);
      return i === -1 ? null : url.slice(i + prefix.length);
    })
    .filter((p): p is string => Boolean(p));
  if (paths.length > 0) await db.storage.from(PRODUCT_IMAGES_BUCKET).remove(paths);
}

export async function createProduct(input: ProductInput, imageFile: File | null): Promise<Product> {
  const db = supabaseAdmin();
  const slug = await uniqueSlug(input.name);

  const { data: inserted, error: insertError } = await db
    .from("products")
    .insert({
      slug,
      name: input.name,
      price: input.price,
      category: input.category,
      material: input.material,
      is_custom: input.isCustom,
      availability: input.availability,
      description: input.description,
      images: [],
    })
    .select("*")
    .single();

  if (insertError) throw new Error(`Failed to create product: ${insertError.message}`);

  const row = inserted as ProductRow;

  if (imageFile && imageFile.size > 0) {
    const url = await uploadImage(imageFile, row.id);
    const { data: updated, error: updateError } = await db
      .from("products")
      .update({ images: [url] })
      .eq("id", row.id)
      .select("*")
      .single();
    if (updateError) throw new Error(`Failed to attach image: ${updateError.message}`);
    return fromRow(updated as ProductRow);
  }

  return fromRow(row);
}

export async function updateProduct(
  id: string,
  input: ProductInput,
  imageFile: File | null
): Promise<Product | null> {
  const db = supabaseAdmin();
  const existing = await getProductById(id);
  if (!existing) return null;

  const slug = await uniqueSlug(input.name, id);
  let images = existing.images;

  if (imageFile && imageFile.size > 0) {
    await deleteImages(existing.images);
    images = [await uploadImage(imageFile, id)];
  }

  const { data: updated, error } = await db
    .from("products")
    .update({
      slug,
      name: input.name,
      price: input.price,
      category: input.category,
      material: input.material,
      is_custom: input.isCustom,
      availability: input.availability,
      description: input.description,
      images,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(`Failed to update product: ${error.message}`);
  return fromRow(updated as ProductRow);
}

export async function deleteProduct(id: string): Promise<void> {
  const db = supabaseAdmin();
  const existing = await getProductById(id);
  if (existing) await deleteImages(existing.images);
  const { error } = await db.from("products").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete product: ${error.message}`);
}
