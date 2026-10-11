import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, NAV_LINKS, SITE } from "@/lib/content";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
        <div>
          <Image
            src="/brand/logo.png"
            alt={SITE.name}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">{SITE.tagline}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-plum-700">
            {SITE.since} &middot; {SITE.ownership}
          </p>
          <p className="mt-1 text-xs text-ink-soft">{SITE.location}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Navigate</p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Information</p>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          {SITE.contactEmail && (
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {SITE.contactEmail}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-line px-6 py-6 text-xs text-ink-soft md:px-10">
        <p>
          &copy; {currentYear} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
