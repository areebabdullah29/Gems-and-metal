import Link from "next/link";
import type { ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3 text-xs uppercase tracking-[0.18em] transition-colors duration-300";

const variants = {
  primary: "bg-ink text-paper hover:bg-[#222222]",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
};

function Arrow() {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M0.5 5H11M11 5L7 1M11 5L7 9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: BaseProps & { href: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      <Arrow />
    </button>
  );
}
