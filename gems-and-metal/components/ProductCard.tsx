import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/content";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-silver-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-silver-500">
              No image yet
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-end justify-center bg-ink/0 pb-5 opacity-0 transition-all duration-300 group-hover:bg-ink/15 group-hover:opacity-100">
          <span className="translate-y-2 bg-paper px-5 py-2 text-xs uppercase tracking-[0.18em] text-ink transition-transform duration-300 group-hover:translate-y-0">
            View Piece
          </span>
        </div>
        <span className="absolute left-0 top-0 h-px w-0 bg-plum-700 transition-all duration-500 group-hover:w-full" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-base text-ink">{product.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-ink-soft">
            {product.category}
          </p>
        </div>
        <p className="shrink-0 text-sm text-plum-700">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
