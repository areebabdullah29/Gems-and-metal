import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { connection } from "next/server";

export type Availability = "in_stock" | "made_to_order";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  material: string;
  availability: Availability;
  description: string;
  image: string | null;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "products.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function readAll(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

async function writeAll(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(name: string, products: Product[], ignoreId?: string): Promise<string> {
  const base = slugify(name) || "piece";
  let candidate = base;
  let suffix = 2;
  while (products.some((p) => p.slug === candidate && p.id !== ignoreId)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export async function listProducts(): Promise<Product[]> {
  await connection();
  const products = await readAll();
  return products.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function listCategories(): Promise<string[]> {
  const products = await listProducts();
  const set = new Set(products.map((p) => p.category).filter(Boolean));
  return Array.from(set).sort();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connection();
  const products = await readAll();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  await connection();
  const products = await readAll();
  return products.find((p) => p.id === id) ?? null;
}

export interface ProductInput {
  name: string;
  price: number;
  category: string;
  material: string;
  availability: Availability;
  description: string;
}

async function saveImage(file: File, id: string): Promise<string> {
  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const filename = `${id}.${ext}`;
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

async function deleteImage(imagePath: string | null): Promise<void> {
  if (!imagePath) return;
  const filename = path.basename(imagePath);
  try {
    await fs.unlink(path.join(UPLOADS_DIR, filename));
  } catch {
    // image already gone; nothing to clean up
  }
}

export async function createProduct(input: ProductInput, imageFile: File | null): Promise<Product> {
  const products = await readAll();
  const id = randomUUID();
  const slug = await uniqueSlug(input.name, products);
  const image = imageFile && imageFile.size > 0 ? await saveImage(imageFile, id) : null;

  const product: Product = {
    id,
    slug,
    name: input.name,
    price: input.price,
    category: input.category,
    material: input.material,
    availability: input.availability,
    description: input.description,
    image,
    createdAt: new Date().toISOString(),
  };

  products.push(product);
  await writeAll(products);
  return product;
}

export async function updateProduct(
  id: string,
  input: ProductInput,
  imageFile: File | null
): Promise<Product | null> {
  const products = await readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = products[index];
  const slug = await uniqueSlug(input.name, products, id);

  let image = existing.image;
  if (imageFile && imageFile.size > 0) {
    await deleteImage(existing.image);
    image = await saveImage(imageFile, id);
  }

  const updated: Product = {
    ...existing,
    name: input.name,
    slug,
    price: input.price,
    category: input.category,
    material: input.material,
    availability: input.availability,
    description: input.description,
    image,
  };

  products[index] = updated;
  await writeAll(products);
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await readAll();
  const existing = products.find((p) => p.id === id);
  if (existing) await deleteImage(existing.image);
  await writeAll(products.filter((p) => p.id !== id));
}
