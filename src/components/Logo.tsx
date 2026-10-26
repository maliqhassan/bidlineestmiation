import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Logo mark + wordmark. The mark comes from `site.logo` (an image in /public);
 * set it to null in src/lib/site.ts to fall back to the built-in SVG mark.
 */
export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {site.logo ? (
        <Image src={site.logo} alt="" width={211} height={120} className="h-10 w-auto" priority />
      ) : (
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#14e0c4" />
              <stop offset="1" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="17" fill="none" stroke="url(#logo-g)" strokeWidth="3" strokeDasharray="88 20" strokeLinecap="round" className="origin-center animate-spin-slow" />
          {/* rising "bid line" */}
          <path d="M11 26 L17 20 L21 23 L29 13" fill="none" stroke={dark ? "#fff" : "#0b0f14"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 13 H29 V18" fill="none" stroke="#14e0c4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="leading-none">
        <span className={`font-display block text-lg font-bold ${dark ? "text-white" : "text-ink"}`}>{site.wordmark.top}</span>
        <span className="mt-0.5 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">{site.wordmark.bottom}</span>
      </span>
    </span>
  );
}
