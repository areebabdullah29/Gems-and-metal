// Hand-authored SVG line art used as restrained background texture.
// Monochrome, low-opacity, and placed behind content. Never decorative
// for its own sake.

export function HeroContours({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M-100 560C140 480 280 620 520 540C760 460 860 600 1100 500C1220 452 1300 480 1340 460"
        stroke="var(--line-strong)"
        strokeWidth="1"
      />
      <path
        d="M-100 620C180 660 340 520 560 600C780 680 920 540 1140 600C1240 628 1300 610 1340 596"
        stroke="var(--line-strong)"
        strokeWidth="1"
      />
      <path
        d="M-100 680C220 640 380 740 600 680C820 620 980 720 1180 672"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <circle cx="960" cy="200" r="120" stroke="var(--line-strong)" strokeWidth="1" />
      <circle cx="960" cy="200" r="150" stroke="var(--line)" strokeWidth="1" />
    </svg>
  );
}

export function SectionMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="10"
        y="1.5"
        width="12"
        height="12"
        transform="rotate(45 10 1.5)"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function RingMotif({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="140" cy="200" r="130" stroke="var(--line-strong)" strokeWidth="1" />
      <circle cx="260" cy="200" r="130" stroke="var(--line)" strokeWidth="1" />
      <circle cx="200" cy="120" r="80" stroke="var(--line-strong)" strokeWidth="1" />
    </svg>
  );
}

export function CornerFrame({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2 40V2H40" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
