"use client";

import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Magnetic, Reveal, SplitText } from "@/components/ui/motion";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center text-white sm:px-16 sm:py-24">
        <div className="bg-blueprint absolute inset-0 opacity-70" />
        <motion.div
          aria-hidden
          className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-signal/30 blur-[100px]"
          animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-flare/25 blur-[100px]"
          animate={{ x: [0, -140, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative">
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            <SplitText text="Ready to Win Your Next Bid?" highlight={["Win", "Next", "Bid?"]} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-mist">
            Join the GCs and subs who stopped losing weekends to takeoffs. Your first quote is free — and it arrives in 1
            hour.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic href="/contact" variant="flare">
              Get Free Quote <ArrowRight className="h-4 w-4" />
            </Magnetic>
            <Magnetic href={site.phoneHref} variant="ghost">
              <Phone className="h-4 w-4" /> Call {site.phone}
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
