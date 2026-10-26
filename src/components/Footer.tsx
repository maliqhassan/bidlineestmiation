import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";
import { serviceAreas } from "@/lib/content";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { Year } from "./Year";

const serviceLinks = [
  "Quantity Takeoff Services",
  "Concrete & Rebar Estimating",
  "Drywall & Framing Takeoff",
  "MEP Estimating (Div 21–28)",
  "Structural Steel Estimating",
  "Lumber & Framing Takeoff",
  "Roofing & Insulation",
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/services", label: "Services" },
  { href: "/trades", label: "Trades & Divisions" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  {
    href: site.social.facebook,
    label: "Facebook",
    path: "M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z",
  },
  {
    href: site.social.linkedin,
    label: "LinkedIn",
    path: "M5 9h3.5v12H5V9Zm1.7-5.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM10.5 9h3.4v1.7c.5-.9 1.7-2 3.6-2 3.7 0 4.4 2.4 4.4 5.6V21h-3.5v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6h-3.5V9Z",
  },
  {
    href: site.social.x,
    label: "X (Twitter)",
    path: "M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.6 3h6.4l4.4 5.8L17.5 3Zm-1.1 16.2h1.7L7.2 4.7H5.4l11 14.5Z",
  },
];

export function Footer() {
  return (
    <footer className="bg-blueprint relative overflow-hidden bg-ink pb-28 pt-20 text-white sm:pb-10">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              North America&apos;s trusted construction estimating partner — RSMeans zip-code verified cost estimates
              and quantity takeoffs across all 50 CSI MasterFormat divisions, delivered in 24–48 hours.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.filter((s) => s.href).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist transition hover:-translate-y-0.5 hover:border-signal hover:text-signal"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-signal">Services & Trades</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-mist">
              {serviceLinks.map((l) => (
                <li key={l}>
                  <Link href="/services" className="transition hover:pl-1 hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-signal">Company</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-mist">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:pl-1 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-signal">Contact</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-mist">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flare" /> {site.address}, USA
              </li>
              <li>
                <a href={site.phoneHref} className="flex gap-3 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-flare" /> {site.phone}
                </a>
              </li>
              {site.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="flex gap-3 break-all hover:text-white">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-flare" /> {e}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-flare" /> {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-8 text-xs leading-relaxed text-mist/70">
          Serving all 50 states & Canada: {serviceAreas.join(" · ")} · and everywhere in between. Residential,
          commercial, industrial & civil estimating for GCs and subcontractors.
        </p>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-mist sm:flex-row sm:items-center">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
          </p>
          <div className="-my-2 flex gap-5">
            <Link href="/privacy" className="py-2 hover:text-signal">
              Privacy Policy
            </Link>
            <Link href="/terms" className="py-2 hover:text-signal">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
