import type { Metadata } from "next";
import { SectionMark } from "@/components/Decor";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const hasDirectContact = SITE.contactEmail || SITE.contactPhone;

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center md:px-10">
      <Reveal>
        <p className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
          <SectionMark className="text-ink-soft" /> Contact
        </p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Get in Touch</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
          Questions about a piece, an order, or custom work: reach out directly.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-line pt-10">
          <p className="text-sm text-ink-soft">{SITE.location}</p>
          {SITE.contactEmail && (
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="font-display text-xl text-ink hover:text-ink-soft"
            >
              {SITE.contactEmail}
            </a>
          )}
          {SITE.contactPhone && <p className="text-sm text-ink-soft">{SITE.contactPhone}</p>}
          {SITE.instagramUrl && (
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink-soft hover:text-ink"
            >
              Instagram
            </a>
          )}
          {!hasDirectContact && (
            <div className="mt-2 border border-dashed border-line px-8 py-8">
              <p className="text-sm text-ink-soft">
                Owner: add an email, phone number, or Instagram link in{" "}
                <code className="rounded bg-silver-100 px-1.5 py-0.5 text-xs">lib/content.ts</code>.
                This page will display whatever is filled in there.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
