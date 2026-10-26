"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Magnetic, Reveal, SectionHeading } from "@/components/ui/motion";
import { plans } from "@/lib/content";

export function PricingPlans() {
  return (
    <section className="bg-grid-light relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent Pricing — No Hidden Fees, No Monthly Commitment"
          highlight={["Transparent"]}
          text="Pay per project. Every quote is flat and confirmed before we start — what we quote is what you pay."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative h-full">
                {p.featured && (
                  // rotating conic border
                  <div className="absolute -inset-[2px] overflow-hidden rounded-[2rem]">
                    <div className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,var(--color-signal),var(--color-flare),transparent_40%,var(--color-signal))]" />
                  </div>
                )}
                <div
                  className={`relative flex h-full flex-col rounded-[2rem] p-6 sm:p-10 ${
                    p.featured ? "bg-ink text-white" : "border border-line bg-white text-ink"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3.5 right-8 inline-flex items-center gap-1.5 rounded-full bg-flare px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-flare/30">
                      <Sparkles className="h-3.5 w-3.5" /> Most Popular
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${p.featured ? "text-mist" : "text-muted"}`}>{p.blurb}</p>
                  <div className="mt-7">
                    <span className={`text-sm ${p.featured ? "text-mist" : "text-muted"}`}>Starting at</span>
                    <p className="mt-1 flex items-baseline gap-2 whitespace-nowrap">
                      <span className={`font-display text-5xl font-bold sm:text-6xl ${p.featured ? "text-gradient" : ""}`}>{p.price}</span>
                      <span className={p.featured ? "text-mist" : "text-muted"}>{p.unit}</span>
                    </p>
                  </div>
                  {p.lead && <p className="mt-7 text-sm font-semibold text-signal">{p.lead}</p>}
                  <ul className={`${p.lead ? "mt-4" : "mt-7"} flex-1 space-y-3.5`}>
                    {p.features.map((f, j) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + j * 0.07 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            p.featured ? "bg-signal text-ink" : "bg-ink text-signal"
                          }`}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-9">
                    <Magnetic
                      href={`/contact?service=${encodeURIComponent(p.service)}`}
                      variant={p.featured ? "primary" : "dark"}
                      className="w-full"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </Magnetic>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-muted">
            Need ongoing estimates every week?{" "}
            <a href="/contact" className="font-semibold text-signal-deep underline decoration-signal/40 underline-offset-4 hover:decoration-signal">
              Ask about monthly plans
            </a>{" "}
            built for busy GCs & subs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
