export default function RevenueChart() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[var(--d-outline-variant)]/60 bg-[var(--d-surface-container-low)] p-4 lg:col-span-8">
      <div className="flex flex-col gap-2 border-b border-[var(--d-outline-variant)]/40 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-plus-jakarta text-base font-bold text-[var(--d-on-surface)]">
            Revenue &amp; Volume Growth
          </h2>
          <p className="text-xs text-[var(--d-outline)]">
            Gross revenue performance correlated with query traffic
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <div className="flex items-center gap-1.5 text-xs text-[var(--d-outline)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--d-primary)]" />
              <span>Revenue ($)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--d-outline)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--d-tertiary)]" />
              <span>Volume (k)</span>
            </div>
          </div>
          <div className="flex rounded-lg border border-[var(--d-outline-variant)]/60 bg-[var(--d-surface-container)] p-0.5 text-xs">
            <button type="button" className="rounded px-2.5 py-1 text-[var(--d-outline)] transition-colors hover:text-[var(--d-on-surface)]">
              Daily
            </button>
            <button type="button" className="rounded bg-[var(--d-surface-container-high)] px-2.5 py-1 font-semibold text-[var(--d-primary)] shadow-sm">
              Weekly
            </button>
            <button type="button" className="rounded px-2.5 py-1 text-[var(--d-outline)] transition-colors hover:text-[var(--d-on-surface)]">
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-72 w-full pt-3">
        <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
          <defs>
            <linearGradient id="primaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8083ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8083ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tertiaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4edea3" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line opacity="0.4" stroke="#464554" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="40" y2="40" />
          <line opacity="0.4" stroke="#464554" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="100" y2="100" />
          <line opacity="0.4" stroke="#464554" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="160" y2="160" />
          <line opacity="0.4" stroke="#464554" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="220" y2="220" />

          <path
            d="M 0 170 C 90 190, 150 140, 230 150 C 310 160, 390 110, 480 120 C 570 130, 630 80, 700 95 L 700 220 L 0 220 Z"
            fill="url(#tertiaryAreaGrad)"
          />
          <path
            d="M 0 170 C 90 190, 150 140, 230 150 C 310 160, 390 110, 480 120 C 570 130, 630 80, 700 95"
            fill="none"
            stroke="#4edea3"
            strokeLinecap="round"
            strokeWidth="2"
          />

          <path
            d="M 0 140 C 80 110, 160 160, 240 90 C 320 30, 400 110, 480 60 C 560 20, 620 70, 700 30 L 700 220 L 0 220 Z"
            fill="url(#primaryAreaGrad)"
          />
          <path
            d="M 0 140 C 80 110, 160 160, 240 90 C 320 30, 400 110, 480 60 C 560 20, 620 70, 700 30"
            fill="none"
            stroke="#c0c1ff"
            strokeLinecap="round"
            strokeWidth="2.5"
          />

          <line opacity="0.75" stroke="#908fa0" strokeDasharray="2 2" strokeWidth="1" x1="480" x2="480" y1="20" y2="220" />
          <circle cx="480" cy="60" fill="#8083ff" r="5" stroke="#0a0e18" strokeWidth="2" />
          <circle cx="480" cy="120" fill="#4edea3" r="4" stroke="#0a0e18" strokeWidth="2" />
        </svg>

        <div className="pointer-events-none absolute left-[62%] top-6 min-w-[140px] -translate-x-1/2 rounded-lg border border-[var(--d-outline-variant)] bg-[var(--d-surface-container-highest)] p-2.5 shadow-xl">
          <span className="mb-1 block text-[11px] uppercase text-[var(--d-outline)]">
            Week 3 - Oct 18
          </span>
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1 text-[var(--d-primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-primary)]" /> Revenue
            </span>
            <span className="font-semibold text-[var(--d-on-surface)]">$34,810</span>
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1 text-[var(--d-tertiary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-tertiary)]" /> Volume
            </span>
            <span className="font-semibold text-[var(--d-on-surface)]">18.4k</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-[var(--d-outline-variant)]/40 pt-1 text-[11px] text-[var(--d-outline)]">
        <span>Sep 25</span>
        <span>Oct 02</span>
        <span>Oct 09</span>
        <span className="font-semibold text-[var(--d-primary)]">Oct 16 (Peak)</span>
        <span>Oct 23</span>
        <span>Oct 30</span>
      </div>
    </div>
  );
}
