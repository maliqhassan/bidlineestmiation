"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

const draw = (delay: number, duration = 2.4) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] as const }, opacity: { delay, duration: 0.3 } },
});

/** Animated blueprint: grid, self-drawing floor plan, dimension lines, scan beam, drifting glow orbs. */
export function BlueprintBackground({ intensity = 1 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const planY = useTransform(scrollY, [0, 800], [0, 160]);
  const px = useSpring(0, { stiffness: 40, damping: 20 });
  const py = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 60);
      py.set((e.clientY / window.innerHeight - 0.5) * 60);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-blueprint absolute inset-0" />

      <motion.div style={{ x: px, y: py }} className="absolute inset-0">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] animate-float rounded-full bg-signal/20 blur-[120px]" style={{ opacity: 0.8 * intensity }} />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] animate-float rounded-full bg-flare/15 blur-[120px] [animation-delay:-3s]" style={{ opacity: intensity }} />
      </motion.div>

      <motion.svg
        style={{ y: planY }}
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
        strokeLinecap="round"
      >
        <g stroke="rgba(26, 140, 255,0.35)" strokeWidth="1.5">
          {/* outer walls */}
          <motion.path d="M720 120 H1120 V560 H720 Z" {...draw(0.2)} />
          {/* interior walls */}
          <motion.path d="M720 300 H920 M920 120 V420 M920 420 H1120 M1010 420 V560" {...draw(0.9, 2)} />
          {/* door swings */}
          <motion.path d="M860 300 A 60 60 0 0 1 920 360" {...draw(1.8, 1.2)} strokeDasharray="4 6" />
          <motion.path d="M1010 480 A 50 50 0 0 1 1060 430" {...draw(2.1, 1.2)} strokeDasharray="4 6" />
          {/* left elevation sketch */}
          <motion.path d="M60 600 V420 L200 330 L340 420 V600" {...draw(0.6, 2.2)} stroke="rgba(255,255,255,0.12)" />
          <motion.path d="M120 600 V500 H180 V600 M250 470 H300 V520 H250 Z" {...draw(1.6, 1.6)} stroke="rgba(255,255,255,0.12)" />
        </g>

        {/* dimension lines */}
        <g stroke="rgba(47, 107, 255,0.6)" strokeWidth="1">
          <motion.path d="M720 90 H1120 M720 82 V98 M1120 82 V98" {...draw(2.4, 1)} />
          <motion.path d="M1150 120 V560 M1142 120 H1158 M1142 560 H1158" {...draw(2.7, 1)} />
        </g>
        <motion.text
          x="920" y="80" textAnchor="middle" fill="rgba(47, 107, 255,0.85)" fontSize="13" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
        >
          40&apos;-0&quot;
        </motion.text>
        <motion.text
          x="1170" y="345" fill="rgba(47, 107, 255,0.85)" fontSize="13" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }}
        >
          44&apos;-0&quot;
        </motion.text>

        {/* area highlight that pulses once the plan has drawn */}
        <motion.rect
          x="722" y="122" width="196" height="176" fill="rgba(26, 140, 255,0.08)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ delay: 3, duration: 2.4, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* corner nodes */}
        {[
          [720, 120], [1120, 120], [1120, 560], [720, 560], [920, 300], [920, 420],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r="4" fill="#1a8cff"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.2, type: "spring" }}
          />
        ))}
      </motion.svg>

      {/* scanning beam */}
      {!reduce && (
        <motion.div
          className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-signal/10 to-transparent"
          initial={{ x: "-20vw" }}
          animate={{ x: "120vw" }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
