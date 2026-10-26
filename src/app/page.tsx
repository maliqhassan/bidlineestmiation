import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/sections/About";
import { CtaBanner } from "@/components/sections/Cta";
import { IndustriesMarquee, SoftwareMarquee } from "@/components/sections/Marquees";
import { ProcessTimeline } from "@/components/sections/Process";
import { ProjectsGallery } from "@/components/sections/Projects";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { ServicesGrid } from "@/components/sections/Services";
import { TakeoffDemo } from "@/components/sections/TakeoffDemo";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <SoftwareMarquee />
      <IndustriesMarquee />
      <AboutSection />
      <ServicesGrid />
      <TakeoffDemo />
      <ProcessTimeline />
      <WhyUs />
      <ProjectsGallery />
      <QuoteSection compact />
      <CtaBanner />
    </>
  );
}
