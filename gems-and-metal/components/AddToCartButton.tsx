"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          isCustom: product.isCustom,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      }}
      className="mt-10 inline-flex w-fit items-center justify-center gap-2 bg-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-plum-700"
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
