"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Magnetic, Reveal, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "@/components/ui/motion";
import { trades } from "@/lib/content";

/** Interactive tabbed explorer of trade groups. */
export function TradesExplorer({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState(0);
  const t = trades[active];

  return (
    <section className="bg-blueprint relative overflow-hidden bg-ink py-20 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <SectionHeading
            dark
            eyebrow="Trades & CSI Divisions"
            title="Every Trade, Every CSI Division — Under One Roof"
            highlight={["Every"]}
            text="Whether you need a single-trade takeoff or a full multi-division bid, our estimators cover the complete CSI MasterFormat — from earthwork and concrete to MEP — with quantities and RSMeans zip-code pricing."
          />
        )}

        <div className={`grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 ${heading ? "mt-12 sm:mt-16" : ""}`}>
          {/* swipeable pill row on phones, vertical list on desktop */}
          <div
            role="tablist"
            aria-label="Trade groups"
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {trades.map((tr, i) => (
              <button
                key={tr.title}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`relative flex shrink-0 snap-start items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors lg:border-0 lg:px-5 lg:py-4 ${
                  i === active ? "border-transparent" : "border-white/10"
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="trade-active"
                    className="absolute inset-0 rounded-2xl border border-signal/40 bg-signal/10"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <span className="relative">
                  <span className={`font-display block whitespace-nowrap text-sm font-semibold lg:text-lg ${i === active ? "text-white" : "text-white/60"}`}>
                    {tr.title}
                  </span>
                  <span className="whitespace-nowrap text-xs font-medium text-signal">{tr.divisions}</span>
                </span>
                <ArrowRight className={`relative hidden h-5 w-5 transition lg:block ${i === active ? "translate-x-0 text-signal" : "-translate-x-2 opacity-0"}`} />
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur sm:p-10 lg:min-h-[26rem]">
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
                <h3 className="font-display mt-2 text-2xl font-bold sm:text-3xl">{t.title}</h3>
                <ul className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
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
                <div className="mt-8 sm:mt-10">
                  <Magnetic href="/contact" variant="primary">
                    Get a Quote <span className="hidden sm:inline">for {t.title}</span> <ArrowRight className="h-4 w-4" />
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
          stroke={i === active ? "#1a8cff" : "rgba(255,255,255,0.15)"}
          strokeWidth={i === active ? 10 : 6}
          strokeDasharray="76 427"
          strokeDashoffset={-i * 84}
        />
      ))}
      <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(47, 107, 255,0.4)" strokeDasharray="2 6" />
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
              <SpotlightCard className="h-full rounded-3xl border border-line bg-white p-7" glow="rgba(47, 107, 255,0.14)">
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
