import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { createProductAction } from "../actions";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "Add Product",
  robots: { index: false, follow: false },
};

export default async function NewProductPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line px-6 py-5 md:px-10">
        <Link href="/admin" className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink">
          Back to Dashboard
        </Link>
        <h1 className="mt-2 font-display text-xl text-ink">Add Product</h1>
      </header>

      <div className="mx-auto max-w-xl px-6 py-10 md:px-10">
        <ProductForm action={createProductAction} submitLabel="Add Product" />
      </div>
    </div>
  );
}
