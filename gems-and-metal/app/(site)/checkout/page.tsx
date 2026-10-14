"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { formatPrice, PAYMENT, SITE } from "@/lib/content";
import { ButtonLink } from "@/components/Button";
import EmptyState from "@/components/EmptyState";

type PaymentChoice = "COD" | "Bank/Wallet";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, hasCustomItem, clear } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<PaymentChoice>(
    hasCustomItem ? "Bank/Wallet" : "COD"
  );
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const amountPaidNow = useMemo(() => {
    if (hasCustomItem) return Math.round(subtotal * 0.5 * 100) / 100;
    if (paymentChoice === "Bank/Wallet") return subtotal;
    return 0; // COD: nothing paid up front
  }, [hasCustomItem, paymentChoice, subtotal]);

  const remainingBalance = useMemo(
    () => Math.round((subtotal - amountPaidNow) * 100) / 100,
    [subtotal, amountPaidNow]
  );

  const requiresScreenshot = hasCustomItem || paymentChoice === "Bank/Wallet";

  if (orderNumber !== null) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center md:px-10">
        <h1 className="font-display text-3xl text-ink">Order Received</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Thank you, {name}. Your order{" "}
          <span className="text-plum-700">#{orderNumber}</span> has been received and is
          awaiting payment verification. We&apos;ll be in touch shortly.
        </p>
        <div className="mt-8">
          <ButtonLink href="/shop">Continue Shopping</ButtonLink>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 md:px-10">
        <h1 className="font-display text-3xl text-ink">Checkout</h1>
        <div className="mt-10">
          <EmptyState title="Your cart is empty" message="Add a piece before checking out." />
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in your name, phone number, and shipping address.");
      return;
    }
    if (requiresScreenshot && !screenshot) {
      setError("Please upload a screenshot of your payment transfer.");
      return;
    }

    setSubmitting(true);
    try {
      const db = supabaseBrowser();
      let screenshotPath: string | null = null;

      if (screenshot) {
        const ext = (screenshot.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await db.storage
          .from("payment-screenshots")
          .upload(path, screenshot, { contentType: screenshot.type });
        if (uploadError) throw new Error(`Screenshot upload failed: ${uploadError.message}`);
        screenshotPath = path;
      }

      const paymentMethod: PaymentChoice = hasCustomItem ? "Bank/Wallet" : paymentChoice;

      const { data, error: insertError } = await db
        .from("orders")
        .insert({
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          shipping_address: address.trim(),
          items: items.map((i) => ({
            product_id: i.productId,
            name: i.name,
            price: i.price,
            qty: i.qty,
            is_custom: i.isCustom,
          })),
          total_price: subtotal,
          amount_paid_now: amountPaidNow,
          remaining_balance: remainingBalance,
          payment_method: paymentMethod,
          screenshot_url: screenshotPath,
          status: "awaiting_verification",
        })
        .select("order_number")
        .single();

      if (insertError) throw new Error(`Could not place order: ${insertError.message}`);

      clear();
      setOrderNumber((data as { order_number: number }).order_number);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>

      <div className="mt-8 flex flex-col gap-2 border-y border-line py-6 text-sm">
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <span className="text-ink-soft">
              {item.name} &times; {item.qty}
              {item.isCustom && <span className="ms-2 text-xs text-plum-700">(custom)</span>}
            </span>
            <span className="text-ink">{formatPrice(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-line pt-2 font-medium">
          <span className="text-ink">Total</span>
          <span className="text-ink">{formatPrice(subtotal)}</span>
        </div>
      </div>

      {hasCustomItem ? (
        <div className="mt-6 border border-dashed border-plum-700/40 bg-plum-50 px-5 py-4 text-sm leading-relaxed text-ink">
          This order contains custom silver jewelry. Please transfer a{" "}
          <strong>50% advance of {formatPrice(amountPaidNow)}</strong> now. The remaining
          balance of <strong>{formatPrice(remainingBalance)}</strong> will be collected via
          Cash on Delivery.
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.15em] text-ink-soft">Payment Method</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaymentChoice("COD")}
              className={`flex-1 border px-4 py-3 text-sm transition-colors ${
                paymentChoice === "COD"
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              Cash on Delivery
            </button>
            <button
              type="button"
              onClick={() => setPaymentChoice("Bank/Wallet")}
              className={`flex-1 border px-4 py-3 text-sm transition-colors ${
                paymentChoice === "Bank/Wallet"
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              Bank / Wallet Transfer
            </button>
          </div>
          <p className="text-xs text-ink-soft">
            Cash on Delivery is available in Karachi only. Other cities require advance
            payment by bank or wallet transfer.
          </p>
        </div>
      )}

      {requiresScreenshot && (
        <div className="mt-6 border border-line bg-paper-raised px-5 py-5">
          <p className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            Transfer {formatPrice(amountPaidNow)} to one of the following
          </p>
          <dl className="mt-3 flex flex-col gap-1.5 text-sm">
            {PAYMENT.bankName && (
              <div className="flex justify-between">
                <dt className="text-ink-soft">Bank</dt>
                <dd className="text-ink">
                  {PAYMENT.bankName} &middot; {PAYMENT.bankAccountTitle} &middot;{" "}
                  {PAYMENT.bankAccountNumber}
                </dd>
              </div>
            )}
            {PAYMENT.raastId && (
              <div className="flex justify-between">
                <dt className="text-ink-soft">Raast ID</dt>
                <dd className="text-ink">{PAYMENT.raastId}</dd>
              </div>
            )}
            {PAYMENT.easypaisaNumber && (
              <div className="flex justify-between">
                <dt className="text-ink-soft">Easypaisa</dt>
                <dd className="text-ink">{PAYMENT.easypaisaNumber}</dd>
              </div>
            )}
            {PAYMENT.jazzcashNumber && (
              <div className="flex justify-between">
                <dt className="text-ink-soft">JazzCash</dt>
                <dd className="text-ink">{PAYMENT.jazzcashNumber}</dd>
              </div>
            )}
            {!PAYMENT.bankName && !PAYMENT.raastId && !PAYMENT.easypaisaNumber && (
              <p className="text-ink-soft">
                Owner: add bank/Raast/Easypaisa/JazzCash details in{" "}
                <code className="rounded bg-silver-100 px-1.5 py-0.5 text-xs">
                  lib/content.ts
                </code>
                .
              </p>
            )}
          </dl>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="03XX-XXXXXXX"
            className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label htmlFor="address" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            Shipping Address
          </label>
          <textarea
            id="address"
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>

        {requiresScreenshot && (
          <div>
            <label
              htmlFor="screenshot"
              className="text-xs uppercase tracking-[0.15em] text-ink-soft"
            >
              Payment Screenshot
            </label>
            <input
              id="screenshot"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
              className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none file:mr-4 file:border-0 file:bg-silver-100 file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-wide"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-plum-700 disabled:opacity-60"
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>

        {!SITE.contactEmail && !PAYMENT.bankName && (
          <p className="text-xs text-ink-soft">
            Having trouble? Reach out on the{" "}
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="underline underline-offset-4"
            >
              Contact
            </button>{" "}
            page.
          </p>
        )}
      </form>
    </div>
  );
}
