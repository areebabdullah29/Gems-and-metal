"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { useCart } from "@/lib/cart/CartContext";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const { itemCount } = useCart();

  const isHome = pathname === "/";
  // Only the homepage has a full-bleed photographic hero behind the header,
  // so only there does it make sense to start transparent-over-the-image.
  const transparentMode = isHome && !scrolled && !menuOpen;

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    // Nothing to track on other pages — `transparentMode` already requires
    // `isHome`, so a stale `scrolled` value from a previous visit to "/" is
    // harmless and gets recalculated the moment the effect below re-runs.
    if (!isHome) return;
    const updateScrolled = () => {
      const threshold = Math.max(window.innerHeight - 160, 320);
      setScrolled(window.scrollY > threshold);
    };
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    window.addEventListener("resize", updateScrolled);
    return () => {
      window.removeEventListener("scroll", updateScrolled);
      window.removeEventListener("resize", updateScrolled);
    };
  }, [isHome]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setHeaderHeight(el.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
        transparentMode
          ? "border-transparent bg-transparent"
          : "border-line bg-paper/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/brand/logo.png"
            alt=""
            width={44}
            height={44}
            className={`h-11 w-11 shrink-0 rounded-full object-contain transition-shadow duration-500 ${
              transparentMode ? "shadow-[0_0_0_1px_rgba(255,255,255,0.4)]" : ""
            }`}
            priority
          />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-xl uppercase tracking-[0.06em] transition-colors duration-500 sm:text-2xl md:text-[32px] ${
                transparentMode ? "text-paper" : "text-ink"
              }`}
            >
              {SITE.name}
            </span>
            <span
              className={`mt-1.5 hidden text-[10px] uppercase tracking-[0.25em] transition-colors duration-500 sm:block ${
                transparentMode ? "text-paper/70" : "text-ink-soft"
              }`}
            >
              Sterling Silver &middot; {SITE.since}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wide transition-colors duration-500 ${
                  transparentMode
                    ? "text-paper/90 hover:text-paper"
                    : active
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                {active && !transparentMode && (
                  <span className="absolute -bottom-1.5 start-0 h-px w-full bg-ink" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            className={`relative text-sm tracking-wide transition-colors duration-500 ${
              transparentMode ? "text-paper/90 hover:text-paper" : "text-ink-soft hover:text-ink"
            }`}
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center bg-plum-700 text-[10px] text-paper">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-px w-6 transition-transform ${
                transparentMode ? "bg-paper" : "bg-ink"
              } ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 transition-transform ${
                transparentMode ? "bg-paper" : "bg-ink"
              } ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-line bg-paper px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2.5 text-sm tracking-wide ${
                pathname === link.href ? "text-ink" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
      </header>
      {/* The header is `fixed` so it can overlay the homepage hero from the
          very first pixel. Everywhere else (and once the hero is scrolled
          past) this spacer reserves the space it would otherwise cover. */}
      {!transparentMode && <div style={{ height: headerHeight }} aria-hidden="true" />}
    </>
  );
}
