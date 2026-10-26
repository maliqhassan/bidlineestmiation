"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { BadgeDollarSign, Ruler, Trophy, Upload } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/motion";
import { processSteps } from "@/lib/content";

const icons = [BadgeDollarSign, Upload, Ruler, Trophy];

/** Vertical timeline whose rail fills as you scroll; each step lights up when reached. */
export function ProcessTimeline({ heading = true }: { heading?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section className="bg-grid-light relative overflow-hidden bg-paper py-20 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <SectionHeading
            eyebrow="How It Works"
            title="From Plans to Winning Bid in 4 Simple Steps"
            highlight={["Winning", "Bid"]}
            text="No contracts, no monthly fees. Upload your plans and get a flat quote in 1 hour — that's how simple outsourcing your estimating should be."
          />
        )}

        <div ref={ref} className={`relative ${heading ? "mt-16 sm:mt-20" : ""}`}>
          <div className="absolute bottom-0 left-6 top-0 w-[3px] -translate-x-1/2 rounded-full bg-line md:left-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-6 top-0 w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-signal via-signal-2 to-flare md:left-1/2"
          />

          <ol className="space-y-10 md:space-y-24">
            {processSteps.map((step, i) => (
              <Step key={step.title} index={i} progress={progress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const step = processSteps[index];
  const Icon = icons[index];
  const at = index / (processSteps.length - 1);
  const lit = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.8, 1]);
  const bg = useTransform(lit, [0, 1], ["#ffffff", "#14e0c4"]);
  const opacity = useTransform(lit, [0, 1], [0.35, 1]);
  // vertical slide: a horizontal one pushes cards off-screen on phones
  const y = useTransform(lit, [0, 1], [32, 0]);
  const right = index % 2 === 1;

  return (
    <li className="relative grid items-center gap-6 pl-16 md:grid-cols-2 md:gap-20 md:pl-0">
      <motion.span
        style={{ scale, backgroundColor: bg }}
        className="absolute left-6 top-0 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-2xl border border-line text-ink shadow-lg md:left-1/2 md:top-1/2 md:-translate-y-1/2"
      >
        <Icon className="h-5 w-5" />
      </motion.span>

      <motion.div
        style={{ opacity, y }}
        className={`rounded-3xl border border-line bg-white p-5 shadow-xl shadow-ink/5 sm:p-7 ${right ? "md:col-start-2" : "md:text-right"}`}
      >
        <span className="font-display text-sm font-bold tracking-widest text-flare">STEP {String(index + 1).padStart(2, "0")}</span>
        <h3 className="font-display mt-2 text-xl font-bold text-ink sm:text-2xl">{step.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
      </motion.div>

      <motion.span
        style={{ opacity }}
        aria-hidden
        className={`font-display hidden text-[8rem] font-bold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-line)] md:block ${
          right ? "md:col-start-1 md:row-start-1 md:text-right" : ""
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
    </li>
  );
}
