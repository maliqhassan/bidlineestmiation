import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/Cta";
import { FaqList } from "@/components/sections/Faq";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — Construction Estimating Questions",
  description:
    "Turnaround, CSI MasterFormat, trades covered, software, MEP, pricing, file formats, deliverables and NDAs — answers to what contractors ask before outsourcing.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        crumb="FAQ"
        eyebrow="FAQ"
        title="Frequently Asked Questions About Our Estimating Services"
        highlight={["Questions"]}
        text="Everything contractors ask before outsourcing their first takeoff. Still unsure? Call us — a real estimator answers."
      />
      <FaqList searchable heading={false} />
      <CtaBanner />
    </>
  );
}
