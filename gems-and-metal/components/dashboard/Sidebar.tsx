import {
  Activity,
  BarChart3,
  BookOpen,
  Headset,
  LayoutDashboard,
  MoreVertical,
  PieChart,
  Plus,
  Settings,
  Users,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#overview", active: true },
  { icon: BarChart3, label: "Analytics", href: "#analytics", active: false },
  { icon: PieChart, label: "Reports", href: "#reports", active: false },
  { icon: Users, label: "Customers", href: "#customers", active: false },
  { icon: Settings, label: "Settings", href: "#settings", active: false },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-[var(--d-outline-variant)] bg-[var(--d-surface-container-low)] p-3">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2 pt-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--d-primary)]/30 bg-[var(--d-primary-container)]/20 text-[var(--d-primary)]">
            <Activity className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-plus-jakarta text-base font-bold leading-none tracking-tight text-[var(--d-on-surface)]">
              Pulse Analytics
            </span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--d-outline)]">
              Enterprise Suite
            </span>
          </div>
        </div>

        <div className="px-1">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--d-primary)] px-3 py-2 text-sm font-semibold text-[var(--d-on-primary)] shadow-sm transition-all duration-150 hover:bg-[var(--d-primary-fixed)] active:scale-[0.98]"
          >
            <Plus className="h-[18px] w-[18px]" />
            New Query
          </button>
        </div>

        <nav className="mt-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "flex items-center gap-3 rounded-r-lg border-l-2 border-[var(--d-primary)] bg-[var(--d-surface-container-high)] px-3 py-2 font-medium text-[var(--d-primary)] transition-colors duration-150"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 font-normal text-[var(--d-on-surface-variant)] transition-colors duration-150 hover:bg-[var(--d-surface-container)] hover:text-[var(--d-on-surface)]"
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 border-t border-[var(--d-outline-variant)]/50 pt-3">
        <div className="flex flex-col gap-1">
          <a
            href="#docs"
            className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-[var(--d-on-surface-variant)] transition-colors duration-150 hover:bg-[var(--d-surface-container)] hover:text-[var(--d-on-surface)]"
          >
            <BookOpen className="h-[18px] w-[18px]" />
            <span className="text-xs">Documentation</span>
          </a>
          <a
            href="#support"
            className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-[var(--d-on-surface-variant)] transition-colors duration-150 hover:bg-[var(--d-surface-container)] hover:text-[var(--d-on-surface)]"
          >
            <Headset className="h-[18px] w-[18px]" />
            <span className="text-xs">Support</span>
          </a>
        </div>

        <div className="mt-1 flex items-center justify-between rounded-lg border border-[var(--d-outline-variant)]/40 bg-[var(--d-surface-container)] p-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--d-outline-variant)] bg-[var(--d-primary-container)]/30 text-xs font-semibold text-[var(--d-primary)]">
              AM
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold leading-tight text-[var(--d-on-surface)]">
                Alex Morgan
              </span>
              <span className="truncate text-[11px] leading-tight text-[var(--d-outline)]">
                VP of Growth
              </span>
            </div>
          </div>
          <button
            type="button"
            title="Account settings"
            className="rounded p-1 text-[var(--d-outline)] transition-colors hover:bg-[var(--d-surface-container-high)] hover:text-[var(--d-on-surface)]"
          >
            <MoreVertical className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </aside>
  );
}
