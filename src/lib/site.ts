// Single source of truth for brand + contact details.
// Swap these values (and drop your logo into /public/logo.png) to rebrand the site.

export const site = {
  name: "Bid Line Estimating Solutions",
  // Wordmark is split over two lines in the header/footer logo
  wordmark: { top: "Bid Line", bottom: "Estimating Solutions" },
  legalName: "Bid Line Estimating Solutions",
  tagline: "Precise takeoffs. Winning bids.",
  url: "https://www.bidlineestimatingsolutions.com",
  description:
    "Accurate quantity takeoffs, material takeoffs & cost estimates organized by all 50 CSI MasterFormat divisions — priced with RSMeans zip-code data and delivered in 24–48 hours.",
  phone: "+1 (787) 437-9119",
  phoneHref: "tel:+17874379119",
  emails: ["info@bidlineestimatingsolutions.com"],
  // Footer appends ", USA"
  address: "220 E. Las Colinas Blvd., Irving, TX 75039",
  hours: "Mon–Fri · 8 AM – 6 PM",
  support: "24/7 customer support — rush estimates welcome round the clock.",
  // Downloadable sample estimate (PDF in /public, e.g. "/sample-estimate.pdf").
  // Leave null until an ANONYMIZED copy (no client name/address) is added — the button stays hidden.
  samplePdf: null as string | null,
  // Logo mark in /public. Set to null to fall back to the built-in SVG mark.
  logo: "/logo.png" as string | null,
  // Leave a link empty to hide that icon in the footer
  social: {
    facebook: "",
    linkedin: "",
    x: "",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/trades", label: "Trades" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
