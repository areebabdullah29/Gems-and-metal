import type { Metadata } from "next";
import { SectionMark } from "@/components/Decor";
import Reveal from "@/components/Reveal";
import { POLICIES } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Policies",
};

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <Reveal>
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
          <SectionMark className="text-ink-soft" /> Before You Order
        </p>
        <h1 className="font-display text-4xl text-ink">Ordering &amp; Care Policies</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          Pricing, custom orders, delivery, and care, answered plainly. These policies apply to
          every order.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <Accordion type="single" collapsible className="mt-12">
          {POLICIES.map((policy, i) => (
            <AccordionItem key={i} value={`policy-${i}`}>
              <AccordionTrigger>{policy.question}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  {policy.answer.map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  );
}
