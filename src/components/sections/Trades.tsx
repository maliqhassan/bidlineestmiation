"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Magnetic, Reveal, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "@/components/ui/motion";
import { trades } from "@/lib/content";

/** Interactive tabbed explorer of trade groups. */
export function TradesExplorer() {
  const [active, setActive] = useState(0);
  const t = trades[active];

  return (
    <section className="bg-blueprint relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Trades & CSI Divisions"
          title="Every Trade, Every CSI Division — Under One Roof"
          highlight={["Every"]}
          text="Whether you need a single-trade takeoff or a full multi-division bid, our estimators cover the complete CSI MasterFormat — from earthwork and concrete to MEP — with quantities and RSMeans zip-code pricing."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div role="tablist" aria-label="Trade groups" className="flex flex-col gap-2">
            {trades.map((tr, i) => (
              <button
                key={tr.title}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="relative flex items-center justify-between rounded-2xl px-5 py-4 text-left transition-colors"
              >
                {i === active && (
                  <motion.span
                    layoutId="trade-active"
                    className="absolute inset-0 rounded-2xl border border-signal/40 bg-signal/10"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <span className="relative">
                  <span className={`font-display block text-lg font-semibold ${i === active ? "text-white" : "text-white/60"}`}>
                    {tr.title}
                  </span>
                  <span className="text-xs font-medium text-signal">{tr.divisions}</span>
                </span>
                <ArrowRight className={`relative h-5 w-5 transition ${i === active ? "translate-x-0 text-signal" : "-translate-x-2 opacity-0"}`} />
              </button>
            ))}
          </div>

          <div className="relative min-h-[26rem] overflow-hidden rounded-3xl border border-white/10 bg-ink-2/80 p-8 backdrop-blur sm:p-10">
            <DivisionRing active={active} />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-flare">{t.divisions}</p>
                <h3 className="font-display mt-2 text-3xl font-bold">{t.title}</h3>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {t.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-signal" /> {item}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Magnetic href="/contact" variant="primary">
                    Get a {t.title} Quote <ArrowRight className="h-4 w-4" />
                  </Magnetic>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function DivisionRing({ active }: { active: number }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      aria-hidden
      className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 opacity-40"
      animate={{ rotate: active * 60 }}
      transition={{ type: "spring", stiffness: 60, damping: 14 }}
    >
      {trades.map((_, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={i === active ? "#14e0c4" : "rgba(255,255,255,0.15)"}
          strokeWidth={i === active ? 10 : 6}
          strokeDasharray="76 427"
          strokeDashoffset={-i * 84}
        />
      ))}
      <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(255,107,53,0.4)" strokeDasharray="2 6" />
    </motion.svg>
  );
}

/** Static card grid of every trade — shown under the explorer on /trades. */
export function TradesGrid() {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-center text-3xl font-bold text-ink sm:text-4xl">The full trade list at a glance</h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((t) => (
            <StaggerItem key={t.title}>
              <SpotlightCard className="h-full rounded-3xl border border-line bg-white p-7" glow="rgba(255,107,53,0.14)">
                <p className="text-xs font-semibold uppercase tracking-widest text-flare">{t.divisions}</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-ink">{t.title}</h3>
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {t.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {i}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
