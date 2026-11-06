"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/content";

export default function CartDrawer() {
  const { items, itemCount, subtotal, isDrawerOpen, closeDrawer, setQty, removeItem } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <>
      <div
        aria-hidden={!isDrawerOpen}
        onClick={closeDrawer}
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300 ${
          isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-charcoal shadow-lg transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-paper/15 px-6 py-5">
          <p className="font-display text-lg text-paper">
            Your Cart {itemCount > 0 && <span className="text-paper/50">({itemCount})</span>}
          </p>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center text-paper/60 hover:text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-paper/50">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col divide-y divide-paper/10">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size ?? ""}`} className="flex gap-4 py-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-paper/10">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeDrawer}
                      className="text-sm text-paper hover:text-plum-300"
                    >
                      {item.name}
                    </Link>
                    {item.size && <p className="mt-0.5 text-xs text-paper/50">Size: {item.size}</p>}
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty(item.productId, item.size, item.qty - 1)}
                        className="h-6 w-6 border border-paper/25 text-xs text-paper/70 hover:border-paper hover:text-paper"
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className="w-5 text-center text-xs text-paper">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.productId, item.size, item.qty + 1)}
                        className="h-6 w-6 border border-paper/25 text-xs text-paper/70 hover:border-paper hover:text-paper"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-between">
                    <p className="text-sm text-paper">{formatPrice(item.price * item.qty)}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.size)}
                      className="text-xs text-paper/50 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-paper/15 px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.1em] text-paper/60">Subtotal</span>
              <span className="font-display text-lg text-plum-300">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="inline-flex w-full items-center justify-center gap-2 bg-paper px-7 py-3 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-plum-300"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="inline-flex w-full items-center justify-center gap-2 border border-paper/30 px-7 py-3 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:border-plum-300 hover:text-plum-300"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
