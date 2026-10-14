import {
  Bell,
  Calendar,
  ChevronDown,
  Download,
  HelpCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-6 border-b border-[var(--d-outline-variant)] bg-[var(--d-surface-container-lowest)]/90 px-8 py-4 backdrop-blur-md">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="font-plus-jakarta text-lg font-bold text-[var(--d-on-surface)]">
            Analytics Overview
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-tertiary)]/30 bg-[var(--d-tertiary-container)]/20 px-2 py-0.5 text-[11px] font-semibold text-[var(--d-tertiary)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--d-tertiary)]" />
            Live sync
          </span>
        </div>
        <p className="mt-0.5 text-xs text-[var(--d-outline)]">
          Real-time performance metrics across all channels
        </p>
      </div>

      <div className="relative w-full max-w-md">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--d-outline)]">
          <Search className="h-[18px] w-[18px]" />
        </span>
        <input
          type="text"
          placeholder="Search metrics, reports, or customers..."
          className="w-full rounded-lg border border-[var(--d-outline-variant)] bg-[var(--d-surface-container-low)] py-1.5 pl-9 pr-14 text-sm text-[var(--d-on-surface)] placeholder:text-[var(--d-outline)] focus:border-[var(--d-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-primary)]"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
          <kbd className="font-mono-dash rounded border border-[var(--d-outline-variant)] bg-[var(--d-surface-container-highest)] px-1.5 py-0.5 text-[11px] text-[var(--d-outline)]">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--d-outline-variant)] bg-[var(--d-surface-container)] px-3 py-1.5 text-sm text-[var(--d-on-surface)] transition-colors hover:bg-[var(--d-surface-container-high)]">
          <Calendar className="h-4 w-4 text-[var(--d-outline)]" />
          <span>Last 30 Days</span>
          <ChevronDown className="h-4 w-4 text-[var(--d-outline)]" />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-[var(--d-outline-variant)] bg-[var(--d-surface-container)] px-3 py-1.5 text-sm text-[var(--d-on-surface)] transition-colors hover:bg-[var(--d-surface-container-high)]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filter</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg bg-[var(--d-primary)] px-3 py-1.5 text-sm font-semibold text-[var(--d-on-primary)] transition-colors hover:bg-[var(--d-primary-fixed)] active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </button>
        <div className="mx-1 h-6 w-px bg-[var(--d-outline-variant)]/60" />
        <button
          type="button"
          title="Notifications"
          className="relative rounded-lg p-2 text-[var(--d-outline)] transition-colors hover:bg-[var(--d-surface-container)] hover:text-[var(--d-on-surface)]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-[var(--d-surface-container-lowest)] bg-[var(--d-error)]" />
        </button>
        <button
          type="button"
          title="Help"
          className="rounded-lg p-2 text-[var(--d-outline)] transition-colors hover:bg-[var(--d-surface-container)] hover:text-[var(--d-on-surface)]"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
