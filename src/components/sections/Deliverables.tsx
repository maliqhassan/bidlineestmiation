"use client";

import { motion } from "motion/react";
import { FileSpreadsheet, FileText, PenTool } from "lucide-react";
import { SectionHeading, SpotlightCard, Stagger, StaggerItem } from "@/components/ui/motion";
import { deliverables } from "@/lib/content";

const icons = [FileSpreadsheet, FileText, PenTool];
const inView = { initial: "hidden", whileInView: "show", viewport: { once: true } } as const;

function SheetMock() {
  const colors = ["bg-signal/70", "bg-flare/70", "bg-signal-2/70", "bg-yellow-300/70"];
  return (
    <motion.div {...inView} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-1.5">
      {Array.from({ length: 7 }).map((_, r) => (
        <motion.div
          key={r}
          variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
          className="grid grid-cols-[0.5rem_2fr_1fr_1fr] items-center gap-1.5"
        >
          <span className={`h-3 rounded-sm ${colors[r % 4]}`} />
          <span className="h-3 rounded-sm bg-white/15" />
          <span className="h-3 rounded-sm bg-white/10" />
          <span className={`h-3 rounded-sm ${r === 6 ? "bg-signal" : "bg-white/20"}`} />
        </motion.div>
      ))}
    </motion.div>
  );
}

const segs = [
  { v: 0.38, c: "#14e0c4" },
  { v: 0.27, c: "#ff6b35" },
  { v: 0.2, c: "#7cf5e3" },
  { v: 0.15, c: "#ffffff55" },
].map((s, i, all) => ({ ...s, offset: all.slice(0, i).reduce((sum, x) => sum + x.v, 0) }));

function PdfMock() {
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 42 42" className="h-28 w-28 -rotate-90">
        {segs.map((s, i) => {
          const offset = s.offset;
          return (
            // r = 15.9155 makes the circumference 100, so dash values are percentages
            <motion.circle
              key={i}
              cx="21" cy="21" r="15.9155" fill="none" stroke={s.c} strokeWidth="6"
              strokeDashoffset={-offset * 100}
              initial={{ strokeDasharray: "0 100", opacity: 0 }}
              whileInView={{ strokeDasharray: `${s.v * 100} 100`, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
            />
          );
        })}
      </svg>
      <div className="flex-1 space-y-2">
        {["Material", "Labor", "Equipment", "Overhead"].map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="flex items-center gap-2 text-xs text-mist"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: segs[i].c }} /> {l}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MarkupMock() {
  return (
    <svg viewBox="0 0 220 120" className="h-28 w-full" fill="none">
      <rect x="10" y="10" width="200" height="100" stroke="rgba(255,255,255,0.25)" />
      <motion.path
        d="M10 60 H130 V10 M130 60 V110"
        stroke="rgba(255,255,255,0.35)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.rect
        x="14" y="14" width="112" height="42" fill="rgba(20,224,196,0.25)" stroke="#14e0c4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      />
      <motion.path
        d="M140 100 L200 20"
        stroke="#ff6b35"
        strokeWidth="2"
        strokeDasharray="5 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3, duration: 0.8 }}
      />
      <motion.text x="60" y="40" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }}>
        420 SF
      </motion.text>
      <motion.text x="186" y="70" fill="#ff9a6b" fontSize="10" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2 }}>
        18 LF
      </motion.text>
    </svg>
  );
}

const mocks = [SheetMock, PdfMock, MarkupMock];

export function Deliverables() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What You Get"
          title="What's in Every Deliverable"
          highlight={["Every"]}
          text="Every takeoff and estimate arrives bid-ready and fully auditable — organized exactly how procurement teams, GCs and lenders expect to see it."
        />
        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
          {deliverables.map((d, i) => {
            const Icon = icons[i];
            const Mock = mocks[i];
            return (
              <StaggerItem key={d.title}>
                <SpotlightCard className="h-full rounded-3xl border border-line bg-white">
                  <div className="m-3 rounded-2xl bg-ink p-6">
                    <Mock />
                  </div>
                  <div className="p-6 pt-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal/15 text-signal-deep">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-ink">{d.title}</h3>
                        <p className="text-xs font-medium text-flare">{d.sub}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{d.text}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
