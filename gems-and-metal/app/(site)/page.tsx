import { RingMotif, SectionMark } from "@/components/Decor";
import { ButtonLink } from "@/components/Button";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { Marquee } from "@/components/ui/marquee";
import CinematicHero from "@/components/CinematicHero";
import { listProducts } from "@/lib/products";

const MARQUEE_WORDS = [
  "Pure 925 Sterling Silver",
  "Custom Jewelry",
  "Men's Rings",
  "Watches",
  "Made to Order",
  "Karachi, Pakistan",
];

const FACTS = [
  {
    mark: "01",
    title: "Est. 1997",
    body: "Three decades of working silver by hand, in the same studio.",
  },
  {
    mark: "02",
    title: "Father & Daughter Owned",
    body: "A family business, start to finish. No outsourced production.",
  },
  {
    mark: "03",
    title: "Pure Sterling Silver",
    body: "No plating, no mixed metals. 925 silver only, every piece.",
  },
];

export default async function Home() {
  // The product grid is secondary content on this page — if Supabase isn't
  // reachable (not configured yet, or a transient outage), the hero and
  // the rest of the marketing page should still render instead of a hard 500.
  let featured: Awaited<ReturnType<typeof listProducts>> = [];
  try {
    featured = (await listProducts()).slice(0, 4);
  } catch (err) {
    console.error("Failed to load featured products:", err);
  }

  return (
    <>
      <CinematicHero />

      <div className="border-b border-line bg-charcoal py-4">
        <Marquee pauseOnHover className="[--gap:2.5rem]">
          {MARQUEE_WORDS.map((word) => (
            <span
              key={word}
              className="flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-paper/80"
            >
              {word}
              <span className="text-plum-300" aria-hidden="true">
                &#9671;
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
                <SectionMark className="text-ink-soft" /> Current Pieces
              </p>
              <h2 className="font-display text-3xl text-ink">New in the studio</h2>
            </div>
            <ButtonLink href="/shop" variant="secondary" className="hidden md:inline-flex">
              Shop All
            </ButtonLink>
          </div>
        </Reveal>

        {featured.length === 0 ? (
          <Reveal>
            <EmptyState
              title="The collection is being prepared"
              message="New sterling silver pieces will appear here as soon as they are added."
            />
          </Reveal>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:px-10">
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
              <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
                <SectionMark className="text-ink-soft" /> What We Make
              </p>
              <h2 className="font-display text-3xl text-ink">
                Custom jewelry and men&apos;s rings, in pure sterling silver only
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
                We work exclusively in pure sterling silver, no plating, no mixed metals. Every
                custom piece is made to order, confirmed with you before production begins.
              </p>
              <ButtonLink href="/about" variant="secondary" className="mt-8 w-fit">
                Read About Our Process
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <Reveal>
            <p className="mb-14 text-center text-xs uppercase tracking-[0.25em] text-paper/50">
              Three things worth knowing
            </p>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.title} delay={i * 0.08}>
                <div className="border-t border-paper/15 pt-6">
                  <span className="font-display text-sm text-plum-300">{fact.mark}</span>
                  <h3 className="mt-3 font-display text-xl text-paper">{fact.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">{fact.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Have a question about a piece?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Reach out directly and we will get back to you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact">Get in Touch</ButtonLink>
            <ButtonLink href="/policies" variant="secondary">
              Ordering &amp; Care Policies
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
