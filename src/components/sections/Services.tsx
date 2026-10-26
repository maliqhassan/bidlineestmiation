"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic, Reveal, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "@/components/ui/motion";
import { services } from "@/lib/content";

/** Card grid — used on the home page. */
export function ServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Full-Scope Estimating & Quantity Takeoff Services"
          highlight={["Full-Scope"]}
          text="Outsource your construction estimating to a dedicated team — organized by all 50 CSI divisions, priced with RSMeans zip-code data, and delivered in Excel & PDF formats your team can bid from directly."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}>
              <SpotlightCard className="h-full rounded-3xl border border-line bg-paper">
                <Link href={`/services#${s.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                    <span className="font-display absolute left-5 top-4 text-5xl font-bold text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink transition duration-500 group-hover:rotate-45 group-hover:bg-signal">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink ring-1 ring-line">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Alternating detailed rows with parallax images — used on /services. */
export function ServicesDetailed() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:space-y-32 sm:px-6 lg:px-8">
        {services.map((s, i) => (
          <ServiceRow key={s.slug} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({ index }: { index: number }) {
  const s = services[index];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 ? 4 : -4, index % 2 ? -4 : 4]);
  const flip = index % 2 === 1;

  return (
    <div id={s.slug} ref={ref} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <Reveal className={`relative ${flip ? "lg:order-2" : ""}`}>
        <motion.div style={{ rotate }} className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">
          <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
            <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/50 to-transparent" />
        </motion.div>
        <span className="font-display absolute -top-10 text-[7rem] font-bold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-signal)] sm:text-[9rem] lg:-left-6">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Reveal>
      <div>
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">{s.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{s.text}</p>
        </Reveal>
        <Stagger className="mt-7 space-y-3">
          {[...s.tags, "Excel & PDF deliverables", "Free revisions included"].map((t) => (
            <StaggerItem key={t} className="flex items-center gap-3 text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-signal/15 text-signal-deep">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium">{t}</span>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.2} className="mt-8">
          <Magnetic href={`/contact?service=${encodeURIComponent(serviceOption(s.slug))}`} variant="dark">
            Request This Service <ArrowUpRight className="h-4 w-4" />
          </Magnetic>
        </Reveal>
      </div>
    </div>
  );
}

function serviceOption(slug: string) {
  switch (slug) {
    case "mep":
      return "MEP Estimating (Div 21–28)";
    case "bid-preparation":
      return "Complete Bid Estimate";
    case "preconstruction":
      return "Preconstruction Estimate";
    case "bid-review":
      return "Change Order / Bid Review";
    default:
      return "Quantity / Material Takeoff";
  }
}
