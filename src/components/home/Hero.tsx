"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, BadgeCheck, Clock3, PlayCircle } from "lucide-react";
import { BlueprintBackground } from "@/components/Blueprint";
import { Counter, Eyebrow, Magnetic, SplitText } from "@/components/ui/motion";
import { estimateRows, heroStats } from "@/lib/content";

const total = estimateRows.reduce((s, r) => s + r.amount, 0);
const max = Math.max(...estimateRows.map((r) => r.amount));

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-20 pt-36 text-white sm:pt-40 lg:min-h-[100svh] lg:pb-28">
      <BlueprintBackground />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow dark>CSI-Organized Estimators · All 50 States + Canada</Eyebrow>
          </motion.div>

          <h1 className="font-display mt-7 text-[2.6rem] font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            <SplitText text="Construction Estimating That Wins More Bids" highlight={["Wins", "More", "Bids"]} delay={0.15} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-mist"
          >
            Accurate quantity takeoffs, material takeoffs & cost estimates organized by all 50 CSI MasterFormat divisions —
            priced with RSMeans zip-code data and delivered in <span className="font-semibold text-white">24–48 hours</span>{" "}
            for GCs and subcontractors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic href="/contact">
              Get a Free Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Magnetic>
            <Magnetic href="/process" variant="ghost">
              <PlayCircle className="h-4 w-4" /> See How It Works
            </Magnetic>
          </motion.div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {heroStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <dt className="font-display text-2xl font-bold text-white">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-mist">{s.label}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <EstimateCard />
      </div>
    </section>
  );
}

function EstimateCard() {
  const reduce = useReducedMotion();
  const rx = useSpring(6, { stiffness: 120, damping: 18 });
  const ry = useSpring(-10, { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };

  return (
    <div className="relative mx-auto w-full max-w-md [perspective:1200px] lg:max-w-none" onPointerMove={onMove} onPointerLeave={() => { rx.set(6); ry.set(-10); }}>
      {/* rotating 360° orbit */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 400 400" className="h-full w-full animate-spin-slow" aria-hidden>
          <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(26, 140, 255,0.25)" strokeDasharray="2 10" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(47, 107, 255,0.2)" strokeDasharray="60 30" />
          <circle cx="200" cy="10" r="5" fill="#1a8cff" />
          <circle cx="40" cy="200" r="4" fill="#2f6bff" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative rounded-3xl border border-white/10 bg-ink-2/80 p-6 shadow-[0_40px_120px_-30px_rgba(26, 140, 255,0.35)] backdrop-blur-xl sm:p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-mist">Estimate #2481</p>
              <p className="font-display mt-1 text-lg font-semibold">Office Build-Out</p>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3, type: "spring", stiffness: 300 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-3 py-1 text-xs font-semibold text-signal"
            >
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </motion.span>
          </div>

          <ul className="mt-6 space-y-4">
            {estimateRows.map((row, i) => (
              <motion.li
                key={row.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.35, duration: 0.6 }}
              >
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span>
                    <span className="font-medium text-white">{row.label}</span>
                    <span className="ml-2 text-xs text-mist">{row.division}</span>
                  </span>
                  <span className="font-mono font-semibold tabular-nums text-white">
                    <Counter value={row.amount} prefix="$" duration={1.6} delay={1.1 + i * 0.35} />
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-signal to-signal-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.amount / max) * 100}%` }}
                    transition={{ delay: 1.1 + i * 0.35, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex items-end justify-between border-t border-dashed border-white/15 pt-5">
            <span className="text-sm text-mist">Estimate Total</span>
            <span className="font-display text-3xl font-bold text-gradient tabular-nums">
              <Counter value={total} prefix="$" duration={2.2} delay={1.4} />
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="absolute -left-6 -top-6 hidden sm:block"
          >
            <div className="flex animate-float items-center gap-2 rounded-2xl border border-white/10 bg-ink-3 px-4 py-3 text-xs font-semibold shadow-xl">
              <BadgeCheck className="h-4 w-4 text-signal" /> QA-Checked Twice
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7 }}
            className="absolute -bottom-6 -right-4 hidden sm:block"
          >
            <div className="flex animate-float items-center gap-2 rounded-2xl bg-flare px-4 py-3 text-xs font-semibold text-white shadow-xl shadow-flare/30 [animation-delay:-2s]">
              <Clock3 className="h-4 w-4" /> Delivered in 24–48h
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
