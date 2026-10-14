import { ArrowDown, ArrowUp, CreditCard, ShoppingCart, TrendingUp, UserPlus } from "lucide-react";
import { metrics, type Metric } from "./data";

const icons: Record<Metric["icon"], React.ComponentType<{ className?: string }>> = {
  revenue: CreditCard,
  subscribers: UserPlus,
  orderValue: ShoppingCart,
  conversion: TrendingUp,
};

export default function MetricCards() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = icons[metric.icon];
        const TrendIcon = metric.trend === "up" ? ArrowUp : ArrowDown;
        const trendClasses =
          metric.trend === "up"
            ? "bg-[var(--d-tertiary-container)]/15 border-[var(--d-tertiary)]/30 text-[var(--d-tertiary)]"
            : "bg-[var(--d-error-container)]/20 border-[var(--d-error)]/30 text-[var(--d-error)]";

        return (
          <div
            key={metric.label}
            className="flex flex-col justify-between rounded-xl border border-[var(--d-outline-variant)]/60 bg-[var(--d-surface-container-low)] p-4 transition-all duration-150 hover:border-[var(--d-outline-variant)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--d-outline)]">{metric.label}</span>
              <div className="rounded-lg border border-[var(--d-outline-variant)]/40 bg-[var(--d-surface-container)] p-1.5 text-[var(--d-primary)]">
                <Icon className="h-[18px] w-[18px]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-plus-jakarta text-3xl font-bold tracking-tight text-[var(--d-on-surface)]">
                {metric.value}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${trendClasses}`}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                <span>{metric.delta}</span>
              </div>
              <span className="text-xs text-[var(--d-outline)]">vs last month</span>
              <svg className="h-6 w-16 shrink-0 overflow-visible" viewBox="0 0 64 24">
                <path
                  d={metric.sparkline}
                  fill="none"
                  stroke={metric.sparklineColor}
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </section>
  );
}
