"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE_LINES = [
  "Pure sterling silver",
  "jewelry and watches,",
  "handcrafted since 1997.",
];

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

export default function CinematicHero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-charcoal"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: parallaxY }}
        initial={reduceMotion ? undefined : { scale: 1.12 }}
        whileInView={reduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3.6, ease: EASE }}
      >
        <Image
          src="/brand/hero-necklace.png"
          alt="Close-up portrait of a woman wearing a Gems and Metal sterling silver pendant necklace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_88%]"
        />
      </motion.div>

      {/* Dark gradient for text legibility only, concentrated where the
          copy actually sits (lower-left, over the hair) — the face and
          pendant on the right stay clear and undarkened. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-6 pb-20 pt-36 text-start md:px-10 md:pb-28"
      >
        {/* Capped width and left-aligned deliberately: this photo's subject
            (face + pendant) sits in the right/center of the frame, so the
            copy lives in the open, lower-detail hair area on the left
            instead of overlapping either. */}
        <div className="max-w-lg">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="mb-6 text-xs uppercase tracking-[0.3em] text-paper/75"
          >
            {SITE.since} &middot; {SITE.location}
          </motion.p>

          <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-5xl md:text-[3.4rem] lg:text-6xl">
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.8 + i * 0.16, ease: EASE }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 1.45, ease: EASE }}
            className="mt-6 max-w-sm text-sm leading-relaxed text-paper/85 md:text-base"
          >
            Family-owned. Crafted in Karachi. Made to be worn for generations.
          </motion.p>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.75, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 bg-paper px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-plum-300"
          >
            Explore the Collection
            <Arrow />
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 border border-paper/70 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-paper hover:bg-paper/10"
          >
            Our Craft
            <Arrow />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
