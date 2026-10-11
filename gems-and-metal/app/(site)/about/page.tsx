import type { Metadata } from "next";
import { RingMotif, SectionMark } from "@/components/Decor";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10">
          <Reveal>
            <p className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
              <SectionMark className="text-ink-soft" /> About the Studio
            </p>
            <h1 className="font-display text-4xl text-ink md:text-5xl">
              A family jewelry studio in Karachi
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-plum-700">
              {SITE.since} &middot; {SITE.ownership}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -bottom-4 -start-4 h-full w-full border border-plum-700/30" />
              <div className="relative flex aspect-square items-center justify-center bg-silver-100">
                <RingMotif className="h-2/3 w-2/3" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center">
              <h2 className="font-display text-2xl text-ink">Our approach</h2>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                Gems and Metal is a father-and-daughter-owned jewelry and watch studio, working in
                pure sterling silver since 1997. We don&apos;t work in gold, plating, or mixed
                metals, silver is what we know, and it&apos;s all we use.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                We specialize in custom jewelry and men&apos;s rings. Every custom piece is made
                to order: we confirm sizing and design details with you before production starts,
                so the finished piece matches what you asked for.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10">
          <Reveal>
            <p className="font-display text-2xl italic leading-snug text-ink md:text-3xl">
              &quot;Silver is what we know, and it&apos;s all we use.&quot;
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-plum-700" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-4xl px-6 py-20 md:px-10">
          <Reveal>
            <h2 className="text-center font-display text-2xl text-ink">Materials &amp; Care</h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div>
                <h3 className="text-sm uppercase tracking-[0.15em] text-ink">
                  925 Sterling Silver
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Every piece is worked in high-quality 925 sterling silver. It does not
                  &quot;turn black&quot; permanently, but like any fine silver it can oxidize
                  slightly over time from air, moisture, perfume, or chemicals. This is normal and
                  easily cleaned.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h3 className="text-sm uppercase tracking-[0.15em] text-ink">Everyday Care</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Avoid contact with perfumes, lotions, and chemicals, and remove jewelry before
                  swimming or showering. Store in an airtight box or pouch and clean gently with a
                  silver polishing cloth.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-10 text-center text-sm text-ink-soft">
              Full ordering, delivery, and return policies are on the{" "}
              <a href="/policies" className="text-plum-700 underline underline-offset-4">
                Policies
              </a>{" "}
              page.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-3xl text-ink">See the current collection</h2>
          <ButtonLink href="/shop" className="mt-8">
            Shop Now
          </ButtonLink>
        </Reveal>
      </section>
    </div>
  );
}
