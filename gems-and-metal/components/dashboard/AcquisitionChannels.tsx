import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { channels } from "./data";

export default function AcquisitionChannels() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[var(--d-outline-variant)]/60 bg-[var(--d-surface-container-low)] p-4 lg:col-span-4">
      <div>
        <div className="flex items-center justify-between border-b border-[var(--d-outline-variant)]/40 pb-3">
          <div>
            <h2 className="font-plus-jakarta text-base font-bold text-[var(--d-on-surface)]">
              Acquisition Channels
            </h2>
            <p className="text-xs text-[var(--d-outline)]">Ranked by volume &amp; share</p>
          </div>
          <button
            type="button"
            title="Settings"
            className="rounded p-1 text-[var(--d-outline)] hover:text-[var(--d-on-surface)]"
          >
            <SlidersHorizontal className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {channels.map((channel) => (
            <div key={channel.rank} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono-dash w-4 text-[var(--d-outline)]">
                    {channel.rank}
                  </span>
                  <span className="font-medium text-[var(--d-on-surface)]">{channel.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[var(--d-outline)]">{channel.share}</span>
                  <span className="font-semibold text-[var(--d-on-surface)]">
                    {channel.conversionRate}
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--d-surface-container)]">
                <div
                  className="h-full rounded-full"
                  style={{ width: channel.barWidth, backgroundColor: channel.barColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[var(--d-outline-variant)]/40 pt-3">
        <span className="text-[11px] text-[var(--d-outline)]">Target: &gt; 4.0% aggregate CR</span>
        <a
          href="#reports"
          className="inline-flex items-center gap-1 text-sm text-[var(--d-primary)] hover:underline"
        >
          Full breakdown <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
