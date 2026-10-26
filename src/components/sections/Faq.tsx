"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui/motion";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export function FaqList({
  searchable = false,
  limit,
  heading = true,
}: {
  searchable?: boolean;
  limit?: number;
  heading?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(faqs[0].q);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const list = limit ? faqs.slice(0, limit) : faqs;
    const q = query.trim().toLowerCase();
    return q ? list.filter((f) => (f.q + f.a).toLowerCase().includes(q)) : list;
  }, [limit, query]);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions About Our Estimating Services"
            highlight={["Questions"]}
            text="Everything contractors ask before outsourcing their first takeoff. Still unsure? Call us — a real estimator answers."
          />
        )}

        {searchable && (
          <Reveal className="relative mx-auto mt-10 max-w-xl">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions — e.g. turnaround, MEP, NDA…"
              aria-label="Search FAQs"
              className="w-full rounded-full border border-line bg-paper py-4 pl-13 pr-5 text-ink outline-none transition focus:border-signal focus:ring-4 focus:ring-signal/20"
            />
          </Reveal>
        )}

        <motion.ul layout className="mt-12 space-y-3">
          <AnimatePresence initial={false}>
            {items.map((f, i) => {
              const isOpen = open === f.q;
              return (
                <motion.li
                  layout
                  key={f.q}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, delay: query ? 0 : Math.min(i, 6) * 0.04 }}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen ? "border-signal/60 bg-signal/[0.06]" : "border-line bg-white hover:border-ink/20"
                  }`}
                >
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : f.q)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    >
                      <span className="font-display font-semibold text-ink sm:text-lg">{f.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${isOpen ? "bg-signal text-ink" : "bg-paper text-ink"}`}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {items.length === 0 && (
          <p className="mt-10 text-center text-muted">
            No matches. Call us at{" "}
            <a href={site.phoneHref} className="font-semibold text-signal-deep">
              {site.phone}
            </a>{" "}
            — a real estimator answers.
          </p>
        )}
      </div>
    </section>
  );
}
