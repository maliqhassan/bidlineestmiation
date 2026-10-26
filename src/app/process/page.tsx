import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/Cta";
import { Deliverables } from "@/components/sections/Deliverables";
import { ProcessTimeline } from "@/components/sections/Process";
import { ProjectsGallery } from "@/components/sections/Projects";
import { TakeoffDemo } from "@/components/sections/TakeoffDemo";

export const metadata: Metadata = {
  title: "Our Estimating Process — Plans to Bid in 4 Steps",
  description:
    "Upload plans, get a flat quote in 1 hour, receive a QA-checked takeoff and estimate in 24–48 hours, then bid with confidence.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="Process"
        eyebrow="How It Works"
        title="From Plans to Winning Bid in 4 Simple Steps"
        highlight={["Winning", "Bid"]}
        text="No contracts, no monthly fees. Upload your plans and get a flat quote in 1 hour — that's how simple outsourcing your estimating should be."
      />
      <ProcessTimeline />
      <TakeoffDemo />
      <Deliverables />
      <ProjectsGallery />
      <CtaBanner />
    </>
  );
}
