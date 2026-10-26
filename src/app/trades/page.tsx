import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/Cta";
import { TradesExplorer, TradesGrid } from "@/components/sections/Trades";

export const metadata: Metadata = {
  title: "Trades & CSI Divisions We Estimate",
  description:
    "Sitework, concrete, masonry, steel, framing, roofing, finishes and MEP — every trade and CSI MasterFormat division estimated with RSMeans zip-code pricing.",
};

export default function TradesPage() {
  return (
    <>
      <PageHero
        crumb="Trades"
        eyebrow="Trades & CSI Divisions"
        title="Every Trade, Every CSI Division — Under One Roof"
        highlight={["Every"]}
        text="Single-trade takeoffs for subs or full multi-division bids for GCs — from Division 02 earthwork to Division 28 low-voltage."
      />
      <TradesExplorer heading={false} />
      <TradesGrid />
      <CtaBanner />
    </>
  );
}
