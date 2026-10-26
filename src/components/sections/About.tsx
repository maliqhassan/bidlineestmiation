"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Layers, MapPin, ShieldCheck, Timer } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Counter, Magnetic, Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/ui/motion";
import { aboutFeatures, images } from "@/lib/content";

const icons = [MapPin, Layers, ShieldCheck, Timer];

export function AboutSection({ full = false }: { full?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="bg-grid-light relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div ref={ref} className="relative">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">
            <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
              <Image
                src={images.about}
                alt="Estimator checking cost figures with a calculator and printed reports"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
              {["PlanSwift", "Bluebeam", "RSMeans"].map((t) => (
                <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            style={{ y: badgeY }}
            className="absolute -right-3 top-12 rounded-3xl bg-ink p-6 text-white shadow-2xl sm:-right-8"
          >
            <p className="font-display text-5xl font-bold text-gradient">
              <Counter value={15} suffix="+" />
            </p>
            <p className="mt-1 max-w-[9rem] text-sm text-mist">Years of field-tested expertise</p>
          </motion.div>

          <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full border-[18px] border-signal/30" />
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title="15+ Years of Precision Construction Estimating & Takeoffs"
            highlight={["Precision"]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We&apos;re a North America-based construction estimating company helping general contractors and
              subcontractors bid smarter across the US. Every quantity takeoff and cost estimate is built by a
              dedicated, field-experienced estimator and checked against RSMeans zip-code pricing — so your numbers hold
              up in the real world.
            </p>
          </Reveal>
          {full && (
            <Reveal delay={0.15}>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                From single-trade takeoffs — concrete, drywall, MEP, structural steel, lumber and more — to full
                bid-ready estimates, we&apos;ve supported 2,500+ projects across residential, commercial, industrial and
                civil work, on plans of every size and format.
              </p>
            </Reveal>
          )}

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {aboutFeatures.map((f, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={f.title}>
                  <div className="group h-full rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-xl hover:shadow-signal/10">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-signal transition duration-300 group-hover:rotate-[-8deg] group-hover:bg-signal group-hover:text-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display mt-4 font-semibold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {!full && (
            <Reveal delay={0.2} className="mt-10">
              <Magnetic href="/about" variant="dark">
                More About Us <ArrowRight className="h-4 w-4" />
              </Magnetic>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
