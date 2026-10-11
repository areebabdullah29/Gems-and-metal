import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <h1 className="font-display text-3xl text-ink">Privacy Policy</h1>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-ink-soft">
        Last updated: [add date before launch]
      </p>

      <div className="mt-10 border border-dashed border-line bg-paper-raised px-6 py-5 text-sm leading-relaxed text-ink-soft">
        This is a starting template, not a finished legal document. Before launch, fill in the
        bracketed details below and have it reviewed against the actual data this site collects
        (contact form, analytics, cookies, etc.) and the laws of where the business operates.
      </div>

      <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">1. Who we are</h2>
          <p className="mt-2">
            {SITE.name} (&quot;we&quot;, &quot;us&quot;) operates this website from{" "}
            {SITE.location}. For any privacy question, contact us at{" "}
            {SITE.contactEmail || "[add contact email]"}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">2. Information we collect</h2>
          <p className="mt-2">
            We collect information you provide directly to us, such as your name, email address,
            or phone number when you contact us about a piece. If this site adds analytics,
            order processing, or a mailing list, list exactly what is collected here before
            launch.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">3. How we use information</h2>
          <p className="mt-2">
            We use the information you provide to respond to enquiries, process any orders, and
            communicate with you about your purchase. We do not sell personal information to
            third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">4. Cookies</h2>
          <p className="mt-2">
            [State plainly whether this site uses cookies or similar tracking technology, and
            for what (e.g. none, or basic analytics). Update this section to match reality.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">5. Data retention</h2>
          <p className="mt-2">
            We retain personal information only as long as needed to respond to your enquiry or
            fulfill an order, and as required by law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">6. Your rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your personal information
            by contacting us at {SITE.contactEmail || "[add contact email]"}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">7. Changes to this policy</h2>
          <p className="mt-2">
            We may update this policy from time to time. The &quot;Last updated&quot; date above
            will reflect the most recent changes.
          </p>
        </section>
      </div>
    </div>
  );
}
