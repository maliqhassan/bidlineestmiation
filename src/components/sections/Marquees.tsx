import { Sparkle } from "lucide-react";
import { industries, software } from "@/lib/content";
import { Marquee } from "@/components/ui/motion";

export function SoftwareMarquee() {
  return (
    <div className="border-y border-white/10 bg-ink-2 py-6">
      <Marquee duration={30}>
        {[...software, ...software].map((s, i) => (
          <span key={i} className="font-display mx-8 flex items-center gap-8 text-xl font-semibold text-white/40 sm:text-2xl">
            {s}
            <Sparkle className="h-4 w-4 text-signal" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function IndustriesMarquee() {
  return (
    <section className="overflow-hidden bg-paper py-14">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted">Industries We Serve</p>
      <div className="-rotate-1 space-y-3">
        <Marquee duration={45}>
          {industries.map((s) => (
            <span key={s} className="mx-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm">
              {s}
            </span>
          ))}
        </Marquee>
        <Marquee duration={50} reverse>
          {[...industries].reverse().map((s) => (
            <span key={s} className="font-display mx-6 text-3xl font-bold text-transparent [-webkit-text-stroke:1px_var(--color-mist)] sm:text-5xl">
              {s}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
