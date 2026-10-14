import type { Metadata } from "next";
import { listCategories, listProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import { SectionMark } from "@/components/Decor";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let allProducts: Awaited<ReturnType<typeof listProducts>> = [];
  let categories: string[] = [];
  try {
    [allProducts, categories] = await Promise.all([listProducts(), listCategories()]);
  } catch (err) {
    console.error("Failed to load shop products:", err);
  }

  const products = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <Reveal>
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
          <SectionMark className="text-ink-soft" /> The Collection
        </p>
        <h1 className="font-display text-4xl text-ink">Shop</h1>
      </Reveal>

      {categories.length > 0 && (
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-8">
            <FilterLink label="All" active={!category} href="/shop" />
            {categories.map((c) => (
              <FilterLink
                key={c}
                label={c}
                active={category === c}
                href={`/shop?category=${encodeURIComponent(c)}`}
              />
            ))}
          </div>
        </Reveal>
      )}

      <div className="mt-12">
        {products.length === 0 ? (
          <Reveal>
            <EmptyState
              title="Nothing here yet"
              message="Pieces are added by hand as they're finished. Check back soon."
            />
          </Reveal>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterLink({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
        active ? "bg-ink text-paper" : "border border-line text-ink-soft hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </a>
  );
}
