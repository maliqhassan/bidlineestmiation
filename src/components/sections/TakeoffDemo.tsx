"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { MousePointer2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Counter, SectionHeading } from "@/components/ui/motion";

const PHASE_MS = 3800;

const phases = [
  { title: "Measure walls", tool: "Linear", qty: 282, unit: "LF", label: "Wall framing" },
  { title: "Area takeoff", tool: "Area", qty: 1664, unit: "SF", label: "Drywall & flooring" },
  { title: "Count fixtures", tool: "Count", qty: 15, unit: "EA", label: "Lights & devices" },
  { title: "Apply RSMeans pricing", tool: "Price", qty: 184250, unit: "USD", label: "Zip-code priced total" },
];

const walls = [
  "M40 40 H560 V360 H40 Z",
  "M260 40 V230",
  "M260 140 H560",
  "M40 230 H560",
  "M400 230 V360",
];

const rooms = [
  { x: 40, y: 40, w: 220, h: 190, name: "Open Office", sf: "594 SF", price: "$61.2K", color: "rgba(20,224,196,0.18)" },
  { x: 260, y: 40, w: 300, h: 100, name: "Conference", sf: "300 SF", price: "$34.8K", color: "rgba(124,245,227,0.16)" },
  { x: 260, y: 140, w: 300, h: 90, name: "Break Room", sf: "270 SF", price: "$29.5K", color: "rgba(255,154,107,0.18)" },
  { x: 40, y: 230, w: 360, h: 130, name: "Lobby", sf: "364 SF", price: "$38.9K", color: "rgba(255,107,53,0.16)" },
  { x: 400, y: 230, w: 160, h: 130, name: "Restrooms", sf: "136 SF", price: "$19.85K", color: "rgba(20,224,196,0.12)" },
];

const fixtures = [
  [95, 90], [205, 90], [95, 180], [205, 180], [330, 90], [490, 90], [330, 185], [490, 185],
  [110, 295], [220, 295], [330, 295], [450, 270], [510, 270], [450, 325], [510, 325],
];

// cursor path per phase, in % of the plan box
const cursorPath = [
  { left: ["6%", "94%", "94%", "6%", "44%"], top: ["10%", "10%", "90%", "90%", "57%"] },
  { left: ["25%", "68%", "68%", "37%", "80%"], top: ["35%", "22%", "46%", "74%", "74%"] },
  { left: ["16%", "34%", "55%", "82%", "86%"], top: ["22%", "45%", "22%", "46%", "80%"] },
  { left: ["50%", "50%"], top: ["50%", "50%"] },
];

export function TakeoffDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? 3 : 0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const t = setTimeout(() => {
      if (phase === phases.length - 1) {
        setPhase(0);
        setCycle((c) => c + 1);
      } else setPhase((p) => p + 1);
    }, phase === phases.length - 1 ? PHASE_MS + 1500 : PHASE_MS);
    return () => clearTimeout(t);
  }, [phase, inView, paused, reduce]);

  const jump = (i: number) => {
    setPhase(i);
    setCycle((c) => c + 1);
  };

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Inside the Process"
          title="See Our Estimating Process in Action"
          highlight={["Action"]}
          text="A live look at how we measure, quantify, count and price every takeoff — the same workflow your dedicated estimator runs on your plans."
        />

        <div ref={ref} className="mt-16 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* "screen" */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-2 shadow-[0_40px_100px_-30px_rgba(20,224,196,0.3)]">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-flare/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-signal/80" />
              </span>
              <span className="truncate font-mono text-xs text-mist">Takeoff — Office Build-Out — A-101 Floor Plan.pdf</span>
              <span className="ml-auto hidden items-center gap-1 rounded-md bg-white/5 p-1 text-[11px] font-semibold sm:flex">
                {phases.map((p, i) => (
                  <span key={p.tool} className={`rounded px-2 py-0.5 transition ${i === phase ? "bg-signal text-ink" : "text-mist"}`}>
                    {p.tool}
                  </span>
                ))}
              </span>
            </div>

            <div className="bg-blueprint relative aspect-[3/2] w-full">
              <svg key={cycle} viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" fill="none" aria-label="Animated floor plan takeoff">
                {/* rooms (area takeoff) */}
                {rooms.map((r, i) => (
                  <motion.rect
                    key={r.name}
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    fill={r.color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0 }}
                    transition={{ delay: phase === 1 ? i * 0.5 : 0, duration: 0.5 }}
                  />
                ))}

                {/* walls (linear) */}
                {walls.map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    stroke={phase === 0 ? "#14e0c4" : "rgba(255,255,255,0.75)"}
                    strokeWidth={i === 0 ? 5 : 3.5}
                    strokeLinecap="square"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i === 0 ? 0.2 : 1.6 + i * 0.35, duration: i === 0 ? 1.8 : 0.5, ease: "easeInOut" }}
                  />
                ))}

                {/* dimensions */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} stroke="#ff6b35" strokeWidth="1">
                  <path d="M40 22 H560 M40 16 V28 M560 16 V28" />
                  <path d="M580 40 V360 M574 40 H586 M574 360 H586" />
                  <text x="300" y="15" fill="#ff9a6b" stroke="none" fontSize="12" textAnchor="middle" fontFamily="monospace">
                    52&apos;-0&quot;
                  </text>
                  <text x="590" y="205" fill="#ff9a6b" stroke="none" fontSize="12" fontFamily="monospace" transform="rotate(90 590 205)" textAnchor="middle">
                    32&apos;-0&quot;
                  </text>
                </motion.g>

                {/* room labels */}
                {rooms.map((r, i) => (
                  <motion.g
                    key={r.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 6 }}
                    transition={{ delay: phase === 1 ? 0.3 + i * 0.5 : 0 }}
                  >
                    <text x={r.x + r.w / 2} y={r.y + r.h / 2 - 4} fill="#fff" fontSize="12" fontWeight="600" textAnchor="middle">
                      {r.name}
                    </text>
                    <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 12} fill="#7cf5e3" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      {phase >= 3 ? r.price : r.sf}
                    </text>
                  </motion.g>
                ))}

                {/* fixtures (count) */}
                {fixtures.map(([cx, cy], i) => (
                  <motion.g
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: phase >= 2 ? 1 : 0, opacity: phase >= 2 ? 1 : 0 }}
                    transition={{ delay: phase === 2 ? i * 0.15 : 0, type: "spring", stiffness: 400, damping: 15 }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  >
                    <circle cx={cx} cy={cy} r="9" fill="rgba(255,107,53,0.25)" stroke="#ff6b35" strokeWidth="1.5" />
                    <path d={`M${cx - 4} ${cy} H${cx + 4} M${cx} ${cy - 4} V${cy + 4}`} stroke="#fff" strokeWidth="1.5" />
                  </motion.g>
                ))}

                {/* pricing pulse */}
                {phase === 3 && (
                  <motion.rect
                    x="40" y="40" width="520" height="320" stroke="#14e0c4" strokeWidth="2" rx="4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.3, 1] }}
                    transition={{ duration: 1.6 }}
                  />
                )}
              </svg>

              {/* animated cursor */}
              {!reduce && (
                <motion.div
                  key={`${cycle}-${phase}`}
                  className="pointer-events-none absolute z-10 -translate-x-1 -translate-y-1"
                  initial={{ left: cursorPath[phase].left[0], top: cursorPath[phase].top[0] }}
                  animate={{ left: cursorPath[phase].left, top: cursorPath[phase].top }}
                  transition={{ duration: PHASE_MS / 1000 - 0.4, ease: "easeInOut" }}
                >
                  <MousePointer2 className="h-6 w-6 fill-white text-ink drop-shadow-lg" />
                  <span className="ml-5 mt-0.5 inline-block whitespace-nowrap rounded-md bg-signal px-2 py-0.5 text-[10px] font-bold text-ink">
                    {phases[phase].tool}
                  </span>
                </motion.div>
              )}

              <AnimatePresence>
                {phase === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border border-signal/40 bg-ink/90 px-5 py-3 text-center backdrop-blur"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-mist">Bid-ready total</p>
                    <p className="font-display text-2xl font-bold text-gradient">$184,250</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* timeline scrubber */}
            <div className="flex items-center gap-4 border-t border-white/10 px-5 py-3">
              <button
                onClick={() => setPaused((p) => !p)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-signal hover:text-ink"
                aria-label={paused ? "Play demo" : "Pause demo"}
              >
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
              <div className="grid flex-1 grid-cols-4 gap-1.5">
                {phases.map((p, i) => (
                  <button key={p.title} onClick={() => jump(i)} className="h-1.5 overflow-hidden rounded-full bg-white/10" aria-label={`Jump to ${p.title}`}>
                    <motion.span
                      key={`${cycle}-${phase}-${i}`}
                      className="block h-full bg-signal"
                      initial={{ width: i < phase ? "100%" : "0%" }}
                      animate={{ width: i < phase ? "100%" : i === phase ? "100%" : "0%" }}
                      transition={{ duration: i === phase && !paused ? PHASE_MS / 1000 : 0, ease: "linear" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* quantity panel */}
          <div className="flex flex-col gap-3">
            {phases.map((p, i) => {
              const done = i <= phase;
              return (
                <button
                  key={p.title}
                  onClick={() => jump(i)}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-500 ${
                    i === phase ? "border-signal/50 bg-signal/10" : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-mist">
                      {String(i + 1).padStart(2, "0")} · {p.title}
                    </span>
                    {i === phase && <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />}
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <span className="text-sm text-white/80">{p.label}</span>
                    <span className="font-display text-2xl font-bold tabular-nums">
                      {done ? (
                        <Counter
                          key={`${cycle}-${i}-${phase === i}`}
                          value={p.qty}
                          prefix={p.unit === "USD" ? "$" : ""}
                          suffix={p.unit === "USD" ? "" : ` ${p.unit}`}
                          duration={i === phase ? 2.4 : 0.01}
                        />
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
            <p className="mt-2 text-xs leading-relaxed text-mist">
              Illustrative demo. Real deliverables include native PlanSwift / Bluebeam markups so you can audit every measurement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
