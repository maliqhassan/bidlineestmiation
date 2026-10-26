"use client";

import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
import { FileText, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-signal via-signal-2 to-flare"
    />
  );
}

/** Sticky call / quote bar on small screens. */
export function MobileActionBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 24 }}
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-ink/90 p-2 backdrop-blur-xl sm:hidden"
    >
      <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white">
        <Phone className="h-4 w-4 text-signal" /> Call Now
      </a>
      <Link href="/contact" className="flex items-center justify-center gap-2 rounded-xl bg-flare py-3 text-sm font-semibold text-white">
        <FileText className="h-4 w-4" /> Free Quote
      </Link>
    </motion.div>
  );
}
