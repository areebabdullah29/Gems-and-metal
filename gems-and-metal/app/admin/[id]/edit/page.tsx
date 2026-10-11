import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getProductById } from "@/lib/products";
import { updateProductAction } from "../../actions";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "Edit Product",
  robots: { index: false, follow: false },
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const updateWithId = updateProductAction.bind(null, product.id);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line px-6 py-5 md:px-10">
        <Link href="/admin" className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink">
          Back to Dashboard
        </Link>
        <h1 className="mt-2 font-display text-xl text-ink">Edit {product.name}</h1>
      </header>

      <div className="mx-auto max-w-xl px-6 py-10 md:px-10">
        <ProductForm action={updateWithId} product={product} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
