"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/content";
import { ButtonLink } from "@/components/Button";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const { items, setQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-10">
        <h1 className="font-display text-3xl text-ink">Your Cart</h1>
        <div className="mt-10">
          <EmptyState
            title="Your cart is empty"
            message="Browse the collection and add a piece you like."
          />
        </div>
        <div className="mt-8 text-center">
          <ButtonLink href="/shop">Shop the Collection</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:px-10">
      <h1 className="font-display text-3xl text-ink">Your Cart</h1>

      <div className="mt-10 flex flex-col divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 py-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-silver-100">
              {item.image && (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/shop/${item.slug}`} className="font-display text-base text-ink hover:text-plum-700">
                {item.name}
              </Link>
              {item.isCustom && (
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-plum-700">
                  Custom order &middot; 50% advance
                </p>
              )}
              <p className="mt-1 text-sm text-ink-soft">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQty(item.productId, item.qty - 1)}
                className="h-8 w-8 border border-line text-ink-soft hover:border-ink hover:text-ink"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className="w-6 text-center text-sm text-ink">{item.qty}</span>
              <button
                type="button"
                onClick={() => setQty(item.productId, item.qty + 1)}
                className="h-8 w-8 border border-line text-ink-soft hover:border-ink hover:text-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <p className="w-24 shrink-0 text-end text-sm text-ink">
              {formatPrice(item.price * item.qty)}
            </p>
            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="shrink-0 text-xs uppercase tracking-[0.1em] text-ink-soft hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm uppercase tracking-[0.15em] text-ink-soft">Subtotal</span>
        <span className="font-display text-xl text-ink">{formatPrice(subtotal)}</span>
      </div>

      <div className="mt-8 flex justify-end">
        <ButtonLink href="/checkout">Proceed to Checkout</ButtonLink>
      </div>
    </div>
  );
}
