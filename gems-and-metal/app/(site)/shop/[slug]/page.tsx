import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, listProducts } from "@/lib/products";
import { formatPrice, SITE } from "@/lib/content";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description || SITE.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  let related: Awaited<ReturnType<typeof listProducts>> = [];
  try {
    const allProducts = await listProducts();
    related = allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3);
  } catch (err) {
    console.error("Failed to load related products:", err);
  }

  const enquirySubject = encodeURIComponent(`Enquiry: ${product.name}`);
  const enquiryBody = encodeURIComponent(
    `Hello, I'd like to ask about "${product.name}" (${formatPrice(product.price)}).`
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
        Back to Shop
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative aspect-square overflow-hidden bg-silver-100">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-silver-500">
                  No image yet
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{product.category}</p>
            <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">{product.name}</h1>
            <p className="mt-4 text-xl text-plum-700">{formatPrice(product.price)}</p>

            {product.description && (
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
                {product.description}
              </p>
            )}

            <dl className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Material</dt>
                <dd className="text-end text-ink">{product.material}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Availability</dt>
                <dd className="text-end text-ink">
                  {product.availability === "in_stock" ? "In Stock" : "Made to Order"}
                </dd>
              </div>
              {product.isCustom && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Custom Order</dt>
                  <dd className="text-end text-ink">50% advance payment required</dd>
                </div>
              )}
            </dl>

            <AddToCartButton product={product} />

            {SITE.contactEmail ? (
              <a
                href={`mailto:${SITE.contactEmail}?subject=${enquirySubject}&body=${enquiryBody}`}
                className="mt-4 inline-flex w-fit items-center justify-center gap-2 border border-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-plum-700 hover:text-plum-700"
              >
                Ask a Question
              </a>
            ) : (
              <Link
                href="/contact"
                className="mt-4 inline-flex w-fit items-center justify-center gap-2 border border-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-plum-700 hover:text-plum-700"
              >
                Ask a Question
              </Link>
            )}
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <div className="mt-28">
          <Reveal>
            <h2 className="font-display text-2xl text-ink">You may also like</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
