"use client";

import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/motion";
import { projects } from "@/lib/content";

export function ProjectsGallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % projects.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + projects.length) % projects.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Experience"
          title="Estimates Delivered Across Every Sector"
          highlight={["Every", "Sector"]}
          text="A snapshot of the project types and trades we estimate for GCs and subcontractors across all 50 states & Canada. Click any project to view larger."
        />

        <div className="mt-16 grid auto-rows-[16rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <motion.button
              key={p.title}
              layoutId={`project-${i}`}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl text-left ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : i === 3 ? "lg:col-span-2" : ""
              }`}
            >
              <Image
                src={p.image}
                alt={`${p.title} — ${p.meta}`}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition group-hover:opacity-95" />
              <span className="absolute left-4 top-4 rounded-full bg-signal px-3 py-1 text-xs font-bold text-ink">{p.tag}</span>
              <span className="absolute right-4 top-4 grid h-9 w-9 scale-0 place-items-center rounded-full bg-white text-ink transition duration-300 group-hover:scale-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition duration-500 group-hover:translate-y-0">
                <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-signal-2">{p.meta}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={projects[open].title}
          >
            <motion.div
              layoutId={`project-${open}`}
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={projects[open].image} alt={projects[open].title} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
              <div className="absolute bottom-0 p-6 sm:p-10">
                <span className="rounded-full bg-signal px-3 py-1 text-xs font-bold text-ink">{projects[open].tag}</span>
                <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">{projects[open].title}</h3>
                <p className="mt-1 text-signal-2">{projects[open].meta}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ink"
                aria-label="Close"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
