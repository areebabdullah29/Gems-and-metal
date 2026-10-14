// Central brand copy. Edit directly. Nothing here is fetched from anywhere else.

export const SITE = {
  name: "Gems and Metal",
  shortName: "Gems & Metal",
  tagline: "Pure sterling silver jewelry and watches, handcrafted since 1997.",
  description:
    "Gems and Metal is a father-and-daughter-owned jewelry and watch studio in Karachi, working exclusively in pure sterling silver since 1997. We specialize in custom jewelry and men's rings, each piece made to order.",
  since: "Est. 1997",
  ownership: "Father & Daughter Owned",
  location: "Karachi, Pakistan",
  // Fill these in before launch. Left blank rather than filled with placeholders.
  contactEmail: "",
  contactPhone: "",
  instagramUrl: "",
};

// Bank/wallet details shown at checkout for manual advance payments.
// Fill these in before launch — left blank rather than filled with placeholders.
export const PAYMENT = {
  bankAccountTitle: "",
  bankAccountNumber: "",
  bankName: "",
  raastId: "",
  easypaisaNumber: "",
  jazzcashNumber: "",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/policies", label: "Policies" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS = [
  { href: "/policies", label: "Policies" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
];

export interface Policy {
  question: string;
  answer: string[];
}

// Sourced directly from the shop's own policy posts. Edit wording here,
// not in the component. This is the single source of truth.
export const POLICIES: Policy[] = [
  {
    question: "Can prices change?",
    answer: [
      "Yes. Silver prices fluctuate according to the international and local bullion market rates.",
      "Prices may change without prior notice. Confirmed orders with advance payment will not be affected. Quotations are valid for a limited time only.",
    ],
  },
  {
    question: "Do you require advance payment for customised orders?",
    answer: [
      "Yes. All customised orders require advance payment to begin the production process. No order will be processed without confirmation of payment.",
    ],
  },
  {
    question: "What if I provide the wrong ring size?",
    answer: [
      "We confirm the size with you before production. If you provide an incorrect size and the ring does not fit after delivery, Gems and Metal will not be responsible.",
      "We strongly recommend visiting a jeweler to confirm your exact size and double-checking measurements before placing the order. Size corrections (if possible) may be charged separately.",
    ],
  },
  {
    question: "Is there a return or refund policy for customised items?",
    answer: [
      "No. Since customised pieces are specially made according to the client's design and size, we do not offer returns or refunds on custom-made orders.",
      "Refunds or adjustments will only be considered if there is a technical or manufacturing fault from our side.",
    ],
  },
  {
    question: "How long does the customisation process take, and how is it delivered?",
    answer: [
      "Customised jewellery requires 7 to 8 working days for production.",
      "Karachi: 1 additional working day after completion. Other cities: 2 to 3 working days after completion. Delivery timelines may vary slightly during peak seasons (Eid, exhibitions, etc.).",
      "Cash on Delivery (COD) is available only in Karachi. For all other cities, full advance payment is required.",
    ],
  },
  {
    question: "Will silver jewellery tarnish?",
    answer: [
      "Gems and Metal uses high-quality 925 sterling silver. Our jewellery does not \"turn black\" permanently. However, silver is a natural metal and may slightly oxidize over time due to air, moisture, perfumes, or chemicals.",
      "This is normal and can be easily cleaned.",
    ],
  },
  {
    question: "How should I care for my silver jewellery?",
    answer: [
      "Avoid contact with perfumes, lotions, and chemicals. Remove before swimming or showering.",
      "Store in an airtight box or pouch. Clean gently with a silver polishing cloth. Proper care ensures long-lasting shine and durability.",
    ],
  },
];

export function formatPrice(amount: number): string {
  return `Rs ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
