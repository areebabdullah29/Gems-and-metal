import { ChevronsUpDown, Download, Eye, MoreVertical, Search } from "lucide-react";
import { orders, type OrderStatus } from "./data";

const statusClasses: Record<OrderStatus, string> = {
  Completed: "bg-[var(--d-tertiary-container)]/20 border-[var(--d-tertiary)]/30 text-[var(--d-tertiary)]",
  Processing: "bg-[var(--d-primary-container)]/20 border-[var(--d-primary)]/30 text-[var(--d-primary)]",
  Pending: "bg-[var(--d-error-container)]/20 border-[var(--d-error)]/30 text-[var(--d-error)]",
};

const avatarClasses = [
  "bg-[var(--d-primary)]/20 border-[var(--d-primary)]/30 text-[var(--d-primary)]",
  "bg-[var(--d-secondary)]/20 border-[var(--d-secondary)]/30 text-[var(--d-secondary)]",
  "bg-[var(--d-tertiary)]/20 border-[var(--d-tertiary)]/30 text-[var(--d-tertiary)]",
];

export default function OrdersTable() {
  return (
    <section className="overflow-hidden rounded-xl border border-[var(--d-outline-variant)]/60 bg-[var(--d-surface-container-low)]">
      <div className="flex flex-col gap-3 border-b border-[var(--d-outline-variant)]/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-plus-jakarta text-base font-bold text-[var(--d-on-surface)]">
            Recent Transactions &amp; Orders
          </h2>
          <p className="text-xs text-[var(--d-outline)]">
            Latest subscriber charges, recurring upgrades, and plan changes
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-[var(--d-outline)]">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Filter orders..."
              className="w-48 rounded-lg border border-[var(--d-outline-variant)] bg-[var(--d-surface-container)] py-1 pl-8 pr-3 text-sm text-[var(--d-on-surface)] placeholder:text-[var(--d-outline)] focus:border-[var(--d-primary)] focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--d-outline-variant)] bg-[var(--d-surface-container)] px-3 py-1.5 text-sm text-[var(--d-on-surface)] transition-colors hover:bg-[var(--d-surface-container-high)]"
          >
            <Download className="h-4 w-4 text-[var(--d-outline)]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--d-outline-variant)] bg-[var(--d-surface-container)]/50 text-[11px] uppercase text-[var(--d-outline)]">
              <th className="px-4 py-2.5">
                <div className="flex cursor-pointer items-center gap-1 hover:text-[var(--d-on-surface)]">
                  <span>Order ID</span>
                  <ChevronsUpDown className="h-3.5 w-3.5" />
                </div>
              </th>
              <th className="px-4 py-2.5">Customer / Account</th>
              <th className="px-4 py-2.5">Product Plan</th>
              <th className="px-4 py-2.5">Date &amp; Time</th>
              <th className="px-4 py-2.5">
                <div className="flex cursor-pointer items-center gap-1 hover:text-[var(--d-on-surface)]">
                  <span>Amount</span>
                  <ChevronsUpDown className="h-3.5 w-3.5" />
                </div>
              </th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--d-outline-variant)]/30 text-sm">
            {orders.map((order, i) => (
              <tr key={order.id} className="transition-colors hover:bg-[var(--d-surface-container)]/40">
                <td className="font-mono-dash px-4 py-3 text-[var(--d-primary)]">{order.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${avatarClasses[i % avatarClasses.length]}`}
                    >
                      {order.initials}
                    </div>
                    <span className="font-medium text-[var(--d-on-surface)]">{order.customer}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded border border-[var(--d-outline-variant)] bg-[var(--d-surface-container)] px-2 py-0.5 text-[11px] text-[var(--d-on-surface)]">
                    {order.plan}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[var(--d-outline)]">{order.date}</td>
                <td className="px-4 py-3 font-semibold text-[var(--d-on-surface)]">{order.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusClasses[order.status]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      title="View details"
                      className="rounded p-1 text-[var(--d-outline)] hover:bg-[var(--d-surface-container)] hover:text-[var(--d-on-surface)]"
                    >
                      <Eye className="h-[18px] w-[18px]" />
                    </button>
                    <button
                      type="button"
                      title="Actions menu"
                      className="rounded p-1 text-[var(--d-outline)] hover:bg-[var(--d-surface-container)] hover:text-[var(--d-on-surface)]"
                    >
                      <MoreVertical className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--d-outline-variant)]/40 p-3 text-xs text-[var(--d-outline)]">
        <div>
          Showing <span className="font-medium text-[var(--d-on-surface)]">1</span> to{" "}
          <span className="font-medium text-[var(--d-on-surface)]">5</span> of{" "}
          <span className="font-medium text-[var(--d-on-surface)]">1,482</span> records
        </div>
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            disabled
            className="rounded border border-[var(--d-outline-variant)]/60 bg-[var(--d-surface-container)] px-3 py-1 text-[var(--d-outline)] transition-colors disabled:pointer-events-none disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border border-[var(--d-outline-variant)]/60 bg-[var(--d-surface-container)] px-3 py-1 text-[var(--d-on-surface)] transition-colors hover:bg-[var(--d-surface-container-high)]"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
