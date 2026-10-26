import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/Cta";
import { Deliverables } from "@/components/sections/Deliverables";
import { SoftwareMarquee } from "@/components/sections/Marquees";
import { ServicesDetailed } from "@/components/sections/Services";
import { TakeoffDemo } from "@/components/sections/TakeoffDemo";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Estimating & Quantity Takeoff Services",
  description:
    "Quantity takeoffs, material takeoffs, MEP estimating, bid preparation, preconstruction budgets and bid reviews — RSMeans priced and delivered in 24–48 hours.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Our Services"
        title="Full-Scope Estimating & Quantity Takeoff Services"
        highlight={["Full-Scope"]}
        text="Outsource your construction estimating to a dedicated team — organized by all 50 CSI divisions, priced with RSMeans zip-code data, and delivered in Excel & PDF formats your team can bid from directly."
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-signal hover:bg-signal hover:text-ink"
            >
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>
      <SoftwareMarquee />
      <ServicesDetailed />
      <TakeoffDemo />
      <Deliverables />
      <CtaBanner />
    </>
  );
}
