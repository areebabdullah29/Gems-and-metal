import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getScreenshotSignedUrl, listOrders, type OrderStatus } from "@/lib/orders";
import { formatPrice } from "@/lib/content";
import { setOrderStatusAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

const TABS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "Awaiting Verification", value: "awaiting_verification" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Cancelled", value: "cancelled" },
  { label: "All", value: "all" },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  const { status: statusParam } = await searchParams;
  const status = (statusParam as OrderStatus | "all") || "awaiting_verification";
  const orders = await listOrders(status === "all" ? undefined : status);

  const screenshotUrls = await Promise.all(
    orders.map((o) => (o.screenshotPath ? getScreenshotSignedUrl(o.screenshotPath) : null))
  );

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-line px-6 py-5 md:px-10">
        <div>
          <Link href="/admin" className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink">
            Back to Dashboard
          </Link>
          <h1 className="mt-2 font-display text-xl text-ink">Orders</h1>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <div className="flex flex-wrap gap-2 border-b border-line pb-6">
          {TABS.map((tab) => (
            <Link
              key={tab.value}
              href={`/admin/orders?status=${tab.value}`}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                status === tab.value
                  ? "bg-ink text-paper"
                  : "border border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="mt-10 border border-dashed border-line px-8 py-16 text-center">
            <p className="text-sm text-ink-soft">No orders in this view.</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-6">
            {orders.map((order, i) => {
              const screenshotUrl = screenshotUrls[i];
              const confirmAction = setOrderStatusAction.bind(null, order.id, "confirmed");
              const shipAction = setOrderStatusAction.bind(null, order.id, "shipped");
              const cancelAction = setOrderStatusAction.bind(null, order.id, "cancelled");

              return (
                <div key={order.id} className="border border-line p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-lg text-ink">
                        Order #{order.orderNumber} &middot; {order.customerName}
                      </p>
                      <p className="text-sm text-ink-soft">{order.customerPhone}</p>
                      <p className="text-sm text-ink-soft">{order.shippingAddress}</p>
                    </div>
                    <span className="shrink-0 border border-line px-3 py-1 text-xs uppercase tracking-[0.15em] text-ink-soft">
                      {order.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-1 border-t border-line pt-4 text-sm">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-ink-soft">
                          {item.name} &times; {item.qty}
                          {item.is_custom && (
                            <span className="ms-2 text-xs text-plum-700">(custom)</span>
                          )}
                        </span>
                        <span className="text-ink">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm sm:grid-cols-4">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">Total</dt>
                      <dd className="text-ink">{formatPrice(order.totalPrice)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">
                        Paid Now
                      </dt>
                      <dd className="text-ink">{formatPrice(order.amountPaidNow)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">
                        Remaining
                      </dt>
                      <dd className="text-ink">{formatPrice(order.remainingBalance)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">
                        Payment Method
                      </dt>
                      <dd className="text-ink">{order.paymentMethod}</dd>
                    </div>
                  </div>

                  {screenshotUrl && (
                    <div className="mt-4 border-t border-line pt-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.1em] text-ink-soft">
                        Payment Screenshot
                      </p>
                      <a href={screenshotUrl} target="_blank" rel="noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element --
                            short-lived (10 min) signed URL; not worth routing
                            through the image optimizer's cache for an
                            internal admin-only view */}
                        <img
                          src={screenshotUrl}
                          alt="Payment screenshot"
                          className="max-h-64 border border-line"
                        />
                      </a>
                    </div>
                  )}

                  {order.status === "awaiting_verification" && (
                    <div className="mt-5 flex gap-3 border-t border-line pt-4">
                      <form action={confirmAction}>
                        <button
                          type="submit"
                          className="bg-ink px-5 py-2 text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-plum-700"
                        >
                          Confirm Payment
                        </button>
                      </form>
                      <form action={cancelAction}>
                        <button
                          type="submit"
                          className="border border-line px-5 py-2 text-xs uppercase tracking-[0.15em] text-ink-soft transition-colors hover:border-red-700 hover:text-red-700"
                        >
                          Cancel Order
                        </button>
                      </form>
                    </div>
                  )}

                  {order.status === "confirmed" && (
                    <div className="mt-5 border-t border-line pt-4">
                      <form action={shipAction}>
                        <button
                          type="submit"
                          className="border border-line px-5 py-2 text-xs uppercase tracking-[0.15em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                        >
                          Mark as Shipped
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
