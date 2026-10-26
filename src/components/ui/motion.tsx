"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts its children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children marked with <StaggerItem>. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked reveal for headlines. */
export function SplitText({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  /** words (exact match) rendered with the gradient treatment */
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(word) ? "text-gradient" : ""}`}
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Animated number that counts up when scrolled into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  format = true,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  format?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, delay, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format ? (reduce ? value : display).toLocaleString("en-US") : reduce ? value : display}
      {suffix}
    </span>
  );
}

/** Button/link that leans toward the cursor. */
export function Magnetic({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "dark" | "flare";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    primary: "bg-signal text-ink hover:shadow-[0_0_40px_-6px_var(--color-signal)]",
    flare: "bg-flare text-white hover:shadow-[0_0_40px_-6px_var(--color-flare)]",
    dark: "bg-ink text-white hover:bg-ink-3",
    ghost: "border border-white/20 text-white hover:border-signal hover:text-signal",
  }[variant];

  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-[box-shadow,background-color,color,border-color] duration-300 disabled:opacity-60 ${styles} ${className}`;
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md animate-shine" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {href ? (
        href.startsWith("/") ? (
          <Link href={href} className={cls}>
            {inner}
          </Link>
        ) : (
          <a href={href} className={cls}>
            {inner}
          </a>
        )
      ) : (
        <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

/** Card with a cursor-following glow + subtle 3D tilt. */
export function SpotlightCard({
  children,
  className = "",
  tilt = true,
  glow = "rgba(20,224,196,0.18)",
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${glow}, transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    mx.set(px);
    my.set(py);
    if (tilt && !reduce) {
      ry.set((px / r.width - 0.5) * 8);
      rx.set(-(py / r.height - 0.5) * 8);
    }
  };
  const onLeave = () => {
    mx.set(-400);
    my.set(-400);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background }} />
      {children}
    </motion.div>
  );
}

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
        dark ? "border-signal/30 bg-signal/10 text-signal" : "border-signal-deep/25 bg-signal/10 text-signal-deep"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-current animate-pulse-ring" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  align = "center",
  highlight,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
  align?: "center" | "left";
  highlight?: string[];
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </Reveal>
      <h2
        className={`font-display mt-5 text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        <SplitText text={title} highlight={highlight} />
      </h2>
      {text && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-mist" : "text-muted"}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
