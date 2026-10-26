"use client";

import { motion } from "motion/react";
import { BadgeCheck, Receipt, Trophy, UserRound } from "lucide-react";
import { Counter, Reveal, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "@/components/ui/motion";
import { stats, whyUs } from "@/lib/content";

const icons = [Trophy, BadgeCheck, UserRound, Receipt];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[40rem] w-[40rem] rounded-full border border-white/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flare" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <SectionHeading
            dark
            align="left"
            eyebrow="Why Choose Us"
            title="Why 2,500+ Contractors Outsource Estimating to Us"
            highlight={["2,500+"]}
          />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-mist">
              In-house estimators cost <span className="font-semibold text-white">$80K–$120K a year</span> — and still take
              vacations. We give you a full estimating department on demand, for a fraction of one salary.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={w.title}>
                <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-ink-2 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-signal to-signal-deep text-ink transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display mt-6 text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{w.text}</p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <StatsBand />
      </div>
    </section>
  );
}

export function StatsBand({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`mt-16 grid grid-cols-2 overflow-hidden rounded-3xl border lg:grid-cols-4 ${
        light ? "border-line bg-white" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.08}
          className={`relative p-5 sm:p-9 ${i % 2 ? "" : light ? "border-r border-line" : "border-r border-white/10"} ${
            i < 2 ? (light ? "border-b border-line lg:border-b-0" : "border-b border-white/10 lg:border-b-0") : ""
          } ${i === 1 ? (light ? "lg:border-r lg:border-line" : "lg:border-r lg:border-white/10") : ""}`}
        >
          <p className={`font-display whitespace-nowrap text-3xl font-bold sm:text-5xl ${light ? "text-ink" : "text-gradient"}`}>
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
          </p>
          <p className={`mt-2 text-sm ${light ? "text-muted" : "text-mist"}`}>{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
