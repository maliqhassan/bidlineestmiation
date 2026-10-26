import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BlueprintBackground } from "./Blueprint";
import { Eyebrow, Reveal, SplitText } from "./ui/motion";

export function PageHero({
  eyebrow,
  title,
  text,
  crumb,
  highlight,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  crumb: string;
  highlight?: string[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-40 text-white sm:pb-28 sm:pt-44">
      <BlueprintBackground intensity={0.7} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-mist">
            <Link href="/" className="hover:text-signal">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{crumb}</span>
          </nav>
        </Reveal>
        <Reveal delay={0.05}>
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="font-display mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          <SplitText text={title} highlight={highlight} delay={0.1} />
        </h1>
        {text && (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{text}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.45}>{children}</Reveal>}
      </div>
    </section>
  );
}
