import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <h1 className="font-display text-3xl text-ink">Terms and Conditions</h1>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-ink-soft">
        Last updated: [add date before launch]
      </p>

      <div className="mt-10 border border-dashed border-line bg-paper-raised px-6 py-5 text-sm leading-relaxed text-ink-soft">
        This is a starting template, not a finished legal document. Have it reviewed before
        launch.
      </div>

      <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">1. About these terms</h2>
          <p className="mt-2">
            These terms govern your use of this website, operated by {SITE.name} from{" "}
            {SITE.location}. By using this site, you agree to them.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">2. Products</h2>
          <p className="mt-2">
            We work exclusively in pure sterling silver. Each product listing shows the price and
            a description of the piece. Because custom pieces are finished by hand, slight
            natural variation between the photo and the delivered item is expected.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">
            3. Orders, payment, shipping, and returns
          </h2>
          <p className="mt-2">
            Advance payment, order sizing, delivery timelines, Cash on Delivery, and our return
            policy for custom pieces are all covered on the{" "}
            <a href="/policies" className="text-plum-700 underline underline-offset-4">
              Policies
            </a>{" "}
            page, which is part of these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">4. Care and warranty</h2>
          <p className="mt-2">
            Sterling silver tarnishes naturally with air exposure over time; this is not a
            manufacturing defect. [Add any workmanship warranty you intend to honor.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">5. Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            {SITE.contactEmail || "[add contact email]"}.
          </p>
        </section>
      </div>
    </div>
  );
}
