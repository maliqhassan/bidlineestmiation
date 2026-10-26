// Single source of truth for brand + contact details.
// Swap these values (and drop your logo into /public/logo.png) to rebrand the site.

export const site = {
  name: "Bid Line Estimating Solutions",
  // Wordmark is split over two lines in the header/footer logo
  wordmark: { top: "Bid Line", bottom: "Estimating Solutions" },
  legalName: "Bid Line Estimating Solutions",
  tagline: "Precise takeoffs. Winning bids.",
  // TODO: replace with the real domain
  url: "https://www.bidlineestimating.com",
  description:
    "Accurate quantity takeoffs, material takeoffs & cost estimates organized by all 50 CSI MasterFormat divisions — priced with RSMeans zip-code data and delivered in 24–48 hours.",
  // TODO: replace placeholder contact details with the real ones
  phone: "(555) 000-0000",
  phoneHref: "tel:+15550000000",
  emails: ["info@bidlineestimating.com"],
  address: "Your office address, City, ST 00000",
  hours: "Mon–Fri · 8 AM – 6 PM",
  support: "24/7 customer support — rush estimates welcome round the clock.",
  // Set to e.g. "/logo.png" once the logo file is in /public. Leave null to use the built-in wordmark.
  logo: null as string | null,
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
