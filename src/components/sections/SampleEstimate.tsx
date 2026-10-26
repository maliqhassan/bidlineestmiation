"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BarChart3, ChevronDown, Download, ShieldCheck, Table2 } from "lucide-react";
import { useState } from "react";
import { Counter, Magnetic, Reveal } from "@/components/ui/motion";
import { sampleEstimate as est } from "@/lib/content";
import { site } from "@/lib/site";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const share = (n: number) => ((n / est.tradeCost) * 100).toFixed(1) + "%";

// Bar chart scale: clean ticks every $30K up to $120K (max division is $108K)
const AXIS_MAX = 120000;
const TICKS = [0, 30000, 60000, 90000, 120000];
const byCost = [...est.divisions].sort((a, b) => b.cost - a.cost);
// Direct-label only the three largest bars; the rest live in the tooltip + table view
const LABELED = new Set(byCost.slice(0, 3).map((d) => d.code));
const INITIAL_ROWS = 5;

export function SampleEstimate() {
  return (
    <div id="sample-estimate" className="mt-20 scroll-mt-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">See a real sample estimate</h3>
        <p className="mt-3 text-muted">
          A recent retail interior build-out, shared with the client&apos;s details removed — the same structure,
          detail and pricing logic you&apos;ll receive.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[2rem] bg-ink text-white shadow-2xl shadow-ink/20">
        {/* header */}
        <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-3 py-1 text-xs font-semibold text-signal">
              <ShieldCheck className="h-3.5 w-3.5" /> Anonymized sample
            </span>
            <h4 className="font-display mt-3 text-xl font-bold sm:text-2xl">{est.project}</h4>
            <p className="mt-1 text-sm text-mist">
              {est.location} · {est.scope}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {site.samplePdf && (
              <a
                href={site.samplePdf}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:border-signal hover:text-signal"
              >
                <Download className="h-4 w-4" /> Download full sample (PDF)
              </a>
            )}
          </div>
        </div>

        {/* headline figures */}
        <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 bg-ink p-6 sm:col-span-4 lg:col-span-1 lg:p-7">
            <p className="text-xs font-medium text-mist">Total base bid</p>
            <p className="mt-2 whitespace-nowrap text-4xl font-semibold sm:text-5xl">
              <Counter value={est.baseBid} prefix="$" />
            </p>
          </div>
          {[
            { label: "Building area", value: est.gsf, suffix: " SF" },
            { label: "Cost per SF", value: est.costPerSf, prefix: "$" },
            { label: "Labor hours", value: est.laborHours },
            { label: "Line items", value: est.lineItems },
          ].map((k) => (
            <div key={k.label} className="bg-ink p-5 lg:p-7">
              <p className="text-xs font-medium text-mist">{k.label}</p>
              <p className="mt-2 whitespace-nowrap text-2xl font-semibold sm:text-3xl lg:text-2xl xl:text-3xl">
                <Counter value={k.value} prefix={k.prefix} suffix={k.suffix} />
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-[1.35fr_1fr]">
          <DivisionChart />
          <MarkupLadder />
        </div>

        <LineItems />

        <div className="flex flex-col gap-5 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-xs leading-relaxed text-mist">
            Labor priced at prevailing wage (Davis-Bacon); material at current market rates. Actual costs vary with
            site conditions and market changes. Client name and address removed for confidentiality.
          </p>
          <Magnetic href="/contact" className="shrink-0">
            Get an estimate like this <ArrowRight className="h-4 w-4" />
          </Magnetic>
        </div>
      </Reveal>
    </div>
  );
}

function DivisionChart() {
  const [view, setView] = useState<"chart" | "table">("chart");
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="bg-ink p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h5 className="font-semibold">Cost by CSI division</h5>
          <p className="mt-0.5 text-xs text-mist">Trade cost {usd(est.tradeCost)} · largest first</p>
        </div>
        <div className="flex rounded-full border border-white/10 p-0.5 text-xs font-medium" role="group" aria-label="View as">
          {(["chart", "table"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 capitalize transition ${
                view === v ? "bg-white/10 text-white" : "text-mist hover:text-white"
              }`}
            >
              {v === "chart" ? <BarChart3 className="h-3.5 w-3.5" /> : <Table2 className="h-3.5 w-3.5" />} {v}
            </button>
          ))}
        </div>
      </div>

      {view === "chart" ? (
        <div className="mt-6">
          <ul className="space-y-2">
            {byCost.map((d, i) => {
              const pct = (d.cost / AXIS_MAX) * 100;
              const on = active === d.code;
              return (
                <li key={d.code} className="grid grid-cols-1 gap-1 sm:grid-cols-[13rem_1fr] sm:items-center sm:gap-3">
                  <span className={`truncate text-xs sm:text-right ${on ? "text-white" : "text-mist"}`}>
                    <span className="tabular-nums text-white/40">{d.code}</span> {d.name}
                  </span>
                  {/* plot row: hairline grid every tick; the whole row is the hover/focus target */}
                  <div className="relative h-6 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:25%_100%]">
                    <button
                      type="button"
                      className="absolute inset-0 z-10 rounded outline-none focus-visible:ring-2 focus-visible:ring-signal/60"
                      aria-label={`Division ${d.code} ${d.name}: ${usd(d.cost)}, ${share(d.cost)} of trade cost`}
                      onPointerEnter={() => setActive(d.code)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={() => setActive(d.code)}
                      onBlur={() => setActive(null)}
                    />
                    <motion.span
                      className={`absolute left-0 top-1/2 h-3.5 -translate-y-1/2 origin-left rounded-r transition-colors ${
                        on ? "bg-signal" : "bg-signal-deep"
                      }`}
                      style={{ width: `${pct}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {LABELED.has(d.code) && !on && (
                      // value at the bar tip; a near-full bar has no room outside, so its label sits inside the end
                      <span
                        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-xs font-semibold tabular-nums ${
                          pct > 75 ? "text-ink" : ""
                        }`}
                        style={pct > 75 ? { right: `calc(${100 - pct}% + 6px)` } : { left: `calc(${pct}% + 8px)` }}
                      >
                        {usd(d.cost)}
                      </span>
                    )}
                    <AnimatePresence>
                      {on && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="pointer-events-none absolute bottom-full z-20 mb-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-ink-3 px-3 py-2 shadow-xl"
                          style={{ left: `min(${pct}%, calc(100% - 11rem))` }}
                        >
                          <p className="text-sm font-semibold tabular-nums">{usd(d.cost)}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mist">
                            <span className="h-0.5 w-3 rounded bg-signal-deep" />
                            {d.name} · {share(d.cost)} of trade
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* x-axis */}
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-[13rem_1fr] sm:gap-3">
            <span className="hidden sm:block" />
            <div className="relative h-4 text-[11px] tabular-nums text-mist">
              {TICKS.map((t, i) => (
                <span
                  key={t}
                  className="absolute top-0"
                  style={{
                    left: `${(t / AXIS_MAX) * 100}%`,
                    transform: i === 0 ? "none" : i === TICKS.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
                  }}
                >
                  {t === 0 ? "$0" : `$${t / 1000}K`}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-mist">
                <th className="py-2 pr-3 font-medium">Division</th>
                <th className="py-2 pr-3 text-right font-medium">Cost</th>
                <th className="py-2 text-right font-medium">Share</th>
              </tr>
            </thead>
            <tbody>
              {byCost.map((d) => (
                <tr key={d.code} className="border-b border-white/5">
                  <td className="py-1.5 pr-3">
                    <span className="tabular-nums text-white/40">{d.code}</span> {d.name}
                  </td>
                  <td className="py-1.5 pr-3 text-right tabular-nums">{usd(d.cost)}</td>
                  <td className="py-1.5 text-right tabular-nums text-mist">{share(d.cost)}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="pt-2.5">Trade cost</td>
                <td className="pt-2.5 pr-3 text-right tabular-nums">{usd(est.tradeCost)}</td>
                <td className="pt-2.5 text-right tabular-nums text-mist">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function MarkupLadder() {
  return (
    <div className="bg-ink p-6 sm:p-8">
      <h5 className="font-semibold">From trade cost to base bid</h5>
      <p className="mt-0.5 text-xs text-mist">Every markup shown — nothing hidden in a lump sum</p>
      <motion.ul
        className="mt-6 text-sm"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {[
          { label: "Trade cost", rate: "", amount: est.tradeCost, strong: true },
          ...est.markups.map((m) => ({ label: `+ ${m.label}`, rate: m.rate, amount: m.amount, strong: false })),
        ].map((r) => (
          <motion.li
            key={r.label}
            variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
            className="flex items-baseline justify-between gap-3 border-b border-white/5 py-2.5"
          >
            <span className={r.strong ? "font-semibold" : "text-mist"}>
              {r.label} {r.rate && <span className="ml-1 text-xs text-white/40">{r.rate}</span>}
            </span>
            <span className={`tabular-nums ${r.strong ? "font-semibold" : ""}`}>{usd(r.amount)}</span>
          </motion.li>
        ))}
        <motion.li
          variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
          className="mt-3 flex items-baseline justify-between gap-3 rounded-xl bg-signal/10 px-4 py-3"
        >
          <span className="font-semibold">Total base bid</span>
          <span className="text-lg font-semibold tabular-nums">{usd(est.baseBid)}</span>
        </motion.li>
      </motion.ul>
      <p className="mt-5 text-xs leading-relaxed text-mist">
        Trade cost = labor {usd(est.laborCost)} ({est.laborHours.toLocaleString("en-US")} hrs @ ${est.laborRate.toFixed(2)}/hr)
        + material {usd(est.materialCost)} + general requirements {usd(est.lumpSum)}.
      </p>
    </div>
  );
}

function LineItems() {
  const [all, setAll] = useState(false);
  const rows = all ? est.rows : est.rows.slice(0, INITIAL_ROWS);
  const num = "py-2.5 pr-4 text-right tabular-nums";

  return (
    <div className="border-t border-white/10 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h5 className="font-semibold">Line-item detail</h5>
        <p className="text-xs text-mist">
          Excerpt — {est.rows.length} of {est.lineItems} line items
        </p>
      </div>
      <p className="mt-2 text-xs text-mist md:hidden">Swipe the table sideways to see all columns →</p>
      <div className="-mx-6 mt-4 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs text-mist">
              <th className="py-2 pr-4 font-medium">Div</th>
              <th className="py-2 pr-4 font-medium">Description</th>
              <th className="py-2 pr-4 text-right font-medium">Qty</th>
              <th className="py-2 pr-4 text-right font-medium">Waste</th>
              <th className="py-2 pr-4 text-right font-medium">Qty w/ waste</th>
              <th className="py-2 pr-4 font-medium">Unit</th>
              <th className="py-2 pr-4 text-right font-medium">Labor hrs</th>
              <th className="py-2 pr-4 text-right font-medium">Labor</th>
              <th className="py-2 pr-4 text-right font-medium">Material</th>
              <th className="py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.desc}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i >= INITIAL_ROWS ? (i - INITIAL_ROWS) * 0.04 : 0 }}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                >
                  <td className="py-2.5 pr-4 tabular-nums text-white/50">{r.div}</td>
                  <td className="max-w-[18rem] py-2.5 pr-4">{r.desc}</td>
                  <td className={num}>{r.qty.toLocaleString("en-US")}</td>
                  <td className={`${num} text-mist`}>{r.waste}</td>
                  <td className={num}>{r.qtyW.toLocaleString("en-US")}</td>
                  <td className="py-2.5 pr-4 text-mist">{r.unit}</td>
                  <td className={num}>{r.hrs.toFixed(1)}</td>
                  <td className={num}>{usd(r.labor)}</td>
                  <td className={num}>{r.material ? usd(r.material) : "—"}</td>
                  <td className="py-2.5 text-right font-semibold tabular-nums">{usd(r.total)}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setAll((a) => !a)}
        aria-expanded={all}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full px-1 py-2 text-sm font-semibold text-signal hover:text-signal-2"
      >
        {all ? "Show fewer rows" : `Show all ${est.rows.length} sample rows`}
        <ChevronDown className={`h-4 w-4 transition-transform ${all ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
