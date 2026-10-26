import { PageHero } from "./PageHero";
import { site } from "@/lib/site";

export type LegalSection = { title: string; body: (string | string[])[] };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero crumb={title} eyebrow="Legal" title={title} text="Last updated: January 2026" />
      <section className="bg-white py-20">
        <article className="mx-auto max-w-3xl px-4 text-muted sm:px-6">
          <p className="text-lg leading-relaxed">{intro}</p>
          {sections.map((s) => (
            <div key={s.title} className="mt-10">
              <h2 className="font-display text-2xl font-bold text-ink">{s.title}</h2>
              {s.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i} className="mt-4 list-disc space-y-2 pl-5 leading-relaxed marker:text-signal-deep">
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="mt-4 leading-relaxed">
                    {b}
                  </p>
                ),
              )}
            </div>
          ))}
          <div className="mt-12 rounded-2xl border border-line bg-paper p-6 text-sm">
            <h2 className="font-display text-lg font-bold text-ink">Contact</h2>
            <p className="mt-2">
              {site.legalName} · {site.address} ·{" "}
              {site.emails.map((e, i) => (
                <span key={e}>
                  {i > 0 && " / "}
                  <a href={`mailto:${e}`} className="text-signal-deep hover:underline">
                    {e}
                  </a>
                </span>
              ))}{" "}
              · <a href={site.phoneHref}>{site.phone}</a>
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
