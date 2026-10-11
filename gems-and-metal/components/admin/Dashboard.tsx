import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/app/admin/actions";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/content";
import DeleteProductForm from "./DeleteProductForm";

export default function Dashboard({ products }: { products: Product[] }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-line px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="Gems and Metal" width={32} height={32} className="h-8 w-8 object-contain" />
          <h1 className="font-display text-xl text-ink">Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink"
          >
            View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-soft">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
          <Link
            href="/admin/new"
            className="flex items-center gap-2 bg-ink px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-silver-900"
          >
            <span aria-hidden="true" className="text-base leading-none">
              +
            </span>
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mt-10 border border-dashed border-line px-8 py-16 text-center">
            <p className="text-sm text-ink-soft">
              No products yet. Click &quot;Add Product&quot; to list your first piece.
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col divide-y divide-line border-y border-line">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-silver-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink">{product.name}</p>
                  <p className="text-xs text-ink-soft">
                    {product.category} · {formatPrice(product.price)} ·{" "}
                    {product.availability === "in_stock" ? "In Stock" : "Made to Order"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-5">
                  <Link
                    href={`/admin/${product.id}/edit`}
                    className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink"
                  >
                    Edit
                  </Link>
                  <DeleteProductForm id={product.id} productName={product.name} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
