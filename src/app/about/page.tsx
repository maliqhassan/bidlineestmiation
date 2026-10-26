import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AboutSection } from "@/components/sections/About";
import { CtaBanner } from "@/components/sections/Cta";
import { Deliverables } from "@/components/sections/Deliverables";
import { IndustriesMarquee } from "@/components/sections/Marquees";
import { WhyUs } from "@/components/sections/WhyUs";

export const metadata: Metadata = {
  title: "About Us — 15+ Years of Construction Estimating",
  description:
    "North America-based construction estimating company with 15+ years of experience and 2,500+ projects estimated for GCs and subcontractors across the US.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Us"
        title="Field-Tested Estimators Behind 2,500+ Winning Bids"
        highlight={["2,500+", "Winning"]}
        text="A dedicated estimating department on demand — RSMeans-priced, CSI-organized, and QA-checked twice before it ever reaches your inbox."
      />
      <AboutSection full />
      <IndustriesMarquee />
      <WhyUs />
      <Deliverables />
      <CtaBanner />
    </>
  );
}
