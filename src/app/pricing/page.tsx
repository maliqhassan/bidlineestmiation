import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/Cta";
import { FaqList } from "@/components/sections/Faq";
import { PricingPlans } from "@/components/sections/Pricing";
import { StatsBand } from "@/components/sections/WhyUs";

export const metadata: Metadata = {
  title: "Pricing — Takeoffs from $199, Bid Estimates from $499",
  description:
    "Flat, per-project pricing with no hidden fees or monthly commitment. Quantity takeoffs from $199 per trade and complete bid estimates from $499.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        eyebrow="Pricing"
        title="Flat Quotes. No Retainers. No Surprises."
        highlight={["Flat", "Quotes."]}
        text="Pay per project. Every quote is flat and confirmed before we start — what we quote is what you pay."
      />
      <PricingPlans />
      <section className="bg-paper pb-8">
        <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsBand light />
        </div>
      </section>
      <FaqList limit={4} />
      <CtaBanner />
    </>
  );
}
