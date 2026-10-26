import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Quote in 1 Hour",
  description: `Upload your plans for a flat-price estimating quote within one hour. Call ${site.phone} or email ${site.emails[0]}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get Started"
        title="Send Your Plans. Get a Flat Quote in 1 Hour."
        highlight={["Flat", "Quote"]}
        text="Tell us about the project or upload your plan set — a senior estimator replies with a price and turnaround, usually in under 60 minutes."
      />
      <QuoteSection />
      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-line">
            <iframe
              title={`${site.name} office location`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
              className="h-80 w-full grayscale-[60%] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
