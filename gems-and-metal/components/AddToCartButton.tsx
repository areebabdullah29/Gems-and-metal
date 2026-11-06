"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCart();
  const [size, setSize] = useState("");
  const [error, setError] = useState<string | null>(null);

  const hasSizes = product.sizes.length > 0;

  function handleAdd() {
    if (hasSizes && !size) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      isCustom: product.isCustom,
      size: hasSizes ? size : null,
    });
    openDrawer();
  }

  return (
    <div className="mt-10 flex flex-col items-start gap-5">
      {hasSizes && (
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-ink-soft">Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(null);
                }}
                aria-pressed={size === s}
                className={`h-11 min-w-11 border px-3 text-sm transition-colors ${
                  size === s
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-700">{error}</p>}

      <button
        type="button"
        onClick={handleAdd}
        className="inline-flex w-fit items-center justify-center gap-2 bg-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-plum-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
