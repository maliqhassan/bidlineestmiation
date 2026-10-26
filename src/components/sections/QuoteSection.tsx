import { Clock, Headphones, Mail, MapPin, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/ui/motion";
import { site } from "@/lib/site";

const cards = [
  { icon: Phone, title: "Call Us", lines: [site.phone, "Available 24/7"], href: site.phoneHref },
  { icon: Mail, title: "Email Plans", lines: site.emails, href: `mailto:${site.emails[0]}` },
  { icon: MapPin, title: "Office", lines: [site.address, "Serving all 50 states + Canada"] },
  { icon: Headphones, title: "Support", lines: [site.support] },
];

export function QuoteSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="quote" className="bg-grid-light relative scroll-mt-24 overflow-hidden bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Get Started"
            title="Get Your Free Quote Within 1 Hour"
            highlight={["Free", "Quote"]}
            text="Upload your plans or just tell us about the project — a senior estimator will reply with a flat price and turnaround, usually in under 60 minutes during business hours."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((c) => {
              const body = (
                <div className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-signal hover:shadow-lg hover:shadow-signal/10">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-signal transition group-hover:bg-signal group-hover:text-ink">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-ink">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="mt-0.5 break-words text-sm text-muted">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              );
              return (
                <StaggerItem key={c.title}>
                  {c.href ? <a href={c.href} className="block h-full">{body}</a> : body}
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal delay={0.2}>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Clock className="h-4 w-4 text-signal-deep" /> Office hours: {site.hours}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-[2rem] border border-line bg-white p-6 shadow-2xl shadow-ink/10 sm:p-10">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-signal/30 blur-2xl" />
            <h3 className="font-display text-2xl font-bold text-ink">Request a Free Quote</h3>
            <p className="mt-1.5 mb-8 text-sm text-muted">No obligation. No spam. Just a flat number and a deadline.</p>
            <QuoteForm compact={compact} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
