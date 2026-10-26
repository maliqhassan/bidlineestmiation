const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const images = {
  hero: img("1541888946425-d81bb19240f5", 1800),
  about: "/images/about.jpg",
  walkthrough: img("1541888946425-d81bb19240f5"),
};

export const heroStats = [
  { value: "50", label: "CSI divisions covered" },
  { value: "24–48h", label: "Turnaround time" },
  { value: "RSMeans", label: "Zip-code pricing" },
  { value: "NDA", label: "Free on every project" },
];

export const estimateRows = [
  { label: "Concrete", division: "Division 03", amount: 286400 },
  { label: "Lumber & Framing", division: "Division 06", amount: 412900 },
  { label: "Electrical", division: "Division 26", amount: 198700 },
  { label: "All Other Divisions", division: "01–33", amount: 386500 },
];

export const software = ["PlanSwift", "Bluebeam Revu", "RSMeans Data", "OST", "Trimble", "AutoCAD"];

export const industries = [
  "Residential",
  "Commercial",
  "Industrial",
  "Civil & Sitework",
  "Healthcare",
  "Education",
  "Retail",
  "Hospitality",
  "Warehouses",
  "Renovations",
];

export const aboutFeatures = [
  {
    title: "RSMeans Zip-Code Pricing",
    text: "Material and labor costs localized to your exact project location in the US — no national averages.",
  },
  {
    title: "All 50 CSI MasterFormat Divisions",
    text: "From Division 03 concrete to Division 33 utilities — one team, every trade covered.",
  },
  {
    title: "100% Confidential — NDA on Request",
    text: "Your plans, numbers and bid strategy stay private. We sign NDAs for every project, free.",
  },
  {
    title: "24–48h Guaranteed Turnaround",
    text: "Rush same-day options for small trades. You meet every bid deadline, every time.",
  },
];

export const services = [
  {
    slug: "quantity-takeoff",
    title: "Quantity Takeoff Services",
    text: "Digitized quantities for every CSI division — concrete (CY), rebar (tons), lumber (BF), drywall (SF), pipe (LF) and more. PlanSwift & Bluebeam markups included so you can verify every count.",
    image: img("1504307651254-35680f356dfd", 900),
    alt: "Structural steel takeoff for commercial construction",
    tags: ["CY · Tons · BF · SF · LF", "Markup files"],
  },
  {
    slug: "material-takeoff",
    title: "Material Takeoff & Cost Estimating",
    text: "Complete material lists with RSMeans zip-code pricing, waste factors and vendor quotes. Bid-ready Excel & PDF deliverables within 24–48 hours of receiving your plans.",
    image: img("1454165804606-c3d57bc86b40", 900),
    alt: "Material takeoff and cost estimate spreadsheets for construction bidding",
    tags: ["Waste factors", "Vendor quotes"],
  },
  {
    slug: "mep",
    title: "MEP Estimating (Div 21–28)",
    text: "Fire suppression, plumbing, HVAC ductwork & piping, electrical lighting, power and low-voltage takeoffs — fixture counts, duct linear footage and branch wiring, fully itemized.",
    image: img("1621905251189-08b45d6a269e", 900),
    alt: "MEP estimating for electrical, plumbing and HVAC systems",
    tags: ["Fixture counts", "Duct LF"],
  },
  {
    slug: "bid-preparation",
    title: "Bid Preparation & Estimates",
    text: "Full bid packages for GCs and subs: labor, equipment, overhead, profit margin and a professional bid summary — everything you need to submit a competitive, profitable bid.",
    image: img("1554224155-6726b3ff858f", 900),
    alt: "Construction bid preparation with cost calculator",
    tags: ["Labor & equipment", "Bid summary"],
  },
  {
    slug: "preconstruction",
    title: "Preconstruction & Design Estimates",
    text: "Conceptual budgets from as low as 10% complete drawings. Square-foot and assembly-based estimates to help owners and developers make go/no-go decisions early.",
    image: img("1503387762-592deb58ef4e", 900),
    alt: "Preconstruction conceptual estimate on architectural blueprints",
    tags: ["From 10% drawings", "SF & assembly"],
  },
  {
    slug: "bid-review",
    title: "Change Orders & Bid Reviews",
    text: "Audit subcontractor quotes line-by-line, price change orders with backup documentation, and catch scope gaps before they eat your profit margin.",
    image: img("1517048676732-d65bc937f952", 900),
    alt: "Contractor bid review and change order analysis meeting",
    tags: ["Line-by-line audit", "Scope gaps"],
  },
];

export const trades = [
  {
    title: "Sitework & Concrete",
    divisions: "Divisions 02–03",
    items: ["Earthwork Takeoff", "Demolition Estimating", "Site Utilities", "Concrete Takeoff", "Rebar Estimating", "Foundations & Slabs"],
  },
  {
    title: "Masonry & Metals",
    divisions: "Divisions 04–05",
    items: ["Masonry Estimating", "Brick & Block", "Structural Steel Estimating", "Miscellaneous Metals", "Steel Detailing"],
  },
  {
    title: "Wood & Framing",
    divisions: "Division 06",
    items: ["Lumber Takeoff", "Wood Framing", "Rough Carpentry", "Finish Carpentry", "Millwork Estimating", "Cabinetry"],
  },
  {
    title: "Thermal & Roofing",
    divisions: "Division 07",
    items: ["Roofing Estimating", "Insulation Estimating", "Waterproofing", "Fireproofing", "Siding & Cladding"],
  },
  {
    title: "Openings & Finishes",
    divisions: "Divisions 08–09",
    items: ["Doors, Windows & Glazing", "Drywall Takeoff", "Framing & Gypsum", "Painting Estimating", "Flooring Estimating", "Acoustic Ceilings"],
  },
  {
    title: "MEP & Fire Protection",
    divisions: "Divisions 21–28",
    items: ["Fire Suppression", "Plumbing Estimating", "HVAC Estimating", "Duct Takeoff", "Piping", "Electrical Estimating", "Low-Voltage"],
  },
];

export const processSteps = [
  {
    title: "Upload Your Plans",
    text: "Send PDF, DWG, DXF or IFC files — or share a Procore, PlanGrid, Dropbox or Google Drive link. Addenda and specs welcome.",
  },
  {
    title: "Get a Flat Quote in 1 Hour",
    text: "We review scope and send a fixed price with turnaround time and invoice. No hidden fees — ever.",
  },
  {
    title: "Takeoff & Estimate Built",
    text: "Your dedicated estimator performs the quantity takeoff, applies RSMeans zip-code pricing, and QA-checks every line item.",
  },
  {
    title: "Review, Adjust & Win",
    text: "Receive Excel & PDF deliverables with markups. Request free revisions, then submit your bid with confidence.",
  },
];

export const whyUs = [
  {
    title: "Win More Bids, Waste Less Time",
    text: "Bid more projects in parallel while we handle the numbers. Our clients report bidding far more jobs per month.",
  },
  {
    title: "QA-Checked Twice Before Delivery",
    text: "Every estimate passes a second-review QA process before delivery. If we miss a quantity, we fix it free.",
  },
  {
    title: "Dedicated Estimator for Your Account",
    text: "Work with the same person every time — they learn your scope templates, subcontractors and margin targets.",
  },
  {
    title: "Flat, Transparent Pricing",
    text: "Per-project quotes with zero hidden fees. No retainers, no monthly minimums — pay only when you bid.",
  },
];

export const stats = [
  { value: 2500, suffix: "+", label: "Projects completed" },
  { value: 50, suffix: "", label: "CSI divisions covered" },
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 48, prefix: "24–", suffix: "h", label: "Typical turnaround" },
];

export const projects = [
  { tag: "Commercial", title: "Office Build-Out", meta: "Full bid · Div 01–33", image: img("1487958449943-2429e8be8625", 1000) },
  { tag: "Mixed-Use", title: "Mixed-Use Development", meta: "Concrete & sitework", image: img("1486406146926-c627a92ad1ab", 1000) },
  { tag: "MEP", title: "High-Rise Residential", meta: "Complete MEP estimate", image: img("1449824913935-59a10b8d2000", 1000) },
  { tag: "Residential", title: "Custom Home", meta: "Lumber & framing takeoff", image: img("1479839672679-a46483c0e7c8", 1000) },
  { tag: "Industrial", title: "Industrial Warehouse", meta: "Preconstruction estimate", image: img("1581094794329-c8112a89af12", 1000) },
  { tag: "Bid Review", title: "School Renovation", meta: "Subcontractor bid review", image: img("1503387762-592deb58ef4e", 1000) },
];

export const deliverables = [
  {
    title: "Color-Coded Excel Takeoff",
    sub: "Native .xlsx deliverable",
    text: "A color-coded Excel takeoff organized by CSI division — quantities, waste factors and RSMeans zip-code pricing for material, labor and equipment, ready to drop straight into your bid.",
  },
  {
    title: "PDF Executive Summary",
    sub: "Share-ready proposal",
    text: "A clean, client-ready PDF executive summary broken out by division, labor, material and equipment — perfect for owners, lenders and internal bid reviews.",
  },
  {
    title: "PlanSwift & Bluebeam Markups",
    sub: "Auditable source files",
    text: "Native PlanSwift & Bluebeam markup files so your team can verify every measurement against the plans — nothing is a black box, and free revisions are included.",
  },
];

export const faqs = [
  {
    q: "How fast is turnaround for quantity takeoffs?",
    a: "Standard turnaround is 24–48 hours from plan receipt. Emergency same-day delivery is available for small trades — just mark your deadline when requesting a quote. RSMeans zip-code pricing is included at no extra cost.",
  },
  {
    q: "Do you provide CSI MasterFormat organized estimates?",
    a: "Yes. Every estimate is organized by all 50 CSI MasterFormat divisions with detailed material, labor, equipment and vendor pricing lines — formatted exactly how procurement teams and banks expect to see them.",
  },
  {
    q: "Which construction trades and CSI divisions do you estimate?",
    a: "All of them. From Division 02–03 earthwork, demolition, concrete and rebar, through masonry, structural steel, lumber & framing, drywall, painting and flooring, roofing and insulation, all the way to Division 21–28 MEP — plumbing, HVAC, duct and electrical. Need a single trade or the whole building? We do both.",
  },
  {
    q: "Do you work with general contractors and subcontractors?",
    a: "Yes — we support general contractors, subcontractors, home builders, developers, architects and owners on residential, commercial, industrial and civil projects across all 50 states. GCs get full multi-division bids; subs get fast single-trade takeoffs priced to their zip code.",
  },
  {
    q: "What software do you use for takeoffs?",
    a: "Our estimators work in PlanSwift, Bluebeam Revu, OST and Trimble, with pricing from RSMeans Data Online for zip-code verification. We deliver native markup files plus Excel and PDF so you can audit every measurement.",
  },
  {
    q: "Can you handle MEP takeoffs?",
    a: "Absolutely — Divisions 21–28 are a core specialty: fire suppression, plumbing, HVAC ductwork and piping, electrical lighting, power distribution and low-voltage systems, all itemized with fixture counts and linear footage.",
  },
  {
    q: "How much do your estimating services cost?",
    a: "Pricing depends on project size, trade count and turnaround. Takeoffs start at $199 per trade and complete bid estimates at $499. You receive a flat, transparent quote with no hidden fees within one hour of uploading your plans.",
  },
  {
    q: "What file formats do you accept for estimates?",
    a: "We work from PDF, DWG, DXF, DWF, IFC and image plan sets — or simply share links from Procore, PlanGrid, Dropbox or Google Drive. Addenda and spec books are welcome and included in scope.",
  },
  {
    q: "What exactly is included in the deliverables?",
    a: "Every order includes a color-coded Excel takeoff organized by CSI division with quantities and pricing, a PDF executive summary, and native PlanSwift / Bluebeam markup files so your team can audit every measurement.",
  },
  {
    q: "Do you sign NDAs? Are my bids confidential?",
    a: "Yes — confidentiality is default on every project. We sign your NDA free of charge before starting, your plans are never shared, and files are deleted from our servers 30 days after delivery on request.",
  },
];

export const serviceOptions = [
  "Quantity / Material Takeoff",
  "Complete Bid Estimate",
  "MEP Estimating (Div 21–28)",
  "Preconstruction Estimate",
  "Change Order / Bid Review",
  "Other",
];

export const deadlineOptions = ["Same-Day (Rush)", "24 Hours", "48 Hours", "This Week", "Flexible"];

export const serviceAreas = [
  "New York", "Texas", "California", "Florida", "Utah",
  "Colorado", "Arizona", "Georgia", "Illinois", "Washington", "Pennsylvania", "Ohio", "North Carolina",
];

// Sample estimate shown in the "What You Get" section. Client name and address
// are deliberately anonymized — the site promises confidentiality.
export const sampleEstimate = {
  project: "Luxury Retail Temporary Store",
  location: "Honolulu, HI",
  scope: "Interior build-out · everything as per scope",
  gsf: 2102,
  costPerSf: 159,
  lineItems: 165,
  laborHours: 1167,
  laborRate: 112.5,
  laborCost: 131308,
  materialCost: 159300,
  lumpSum: 43000,
  tradeCost: 333608,
  baseBid: 437027,
  divisions: [
    { code: "01", name: "General Requirements", cost: 43000 },
    { code: "02", name: "Existing Conditions", cost: 20741 },
    { code: "05", name: "Metals", cost: 14885 },
    { code: "06", name: "Wood, Plastics & Composites", cost: 2475 },
    { code: "08", name: "Openings", cost: 6657 },
    { code: "09", name: "Finishes", cost: 108231 },
    { code: "10", name: "Specialties", cost: 5625 },
    { code: "11", name: "Equipment", cost: 14754 },
    { code: "12", name: "Furnishings", cost: 59957 },
    { code: "22", name: "Plumbing", cost: 2034 },
    { code: "26", name: "Electrical", cost: 55249 },
  ],
  markups: [
    { label: "Contingency", rate: "5%", amount: 16680 },
    { label: "Overhead", rate: "10%", amount: 33361 },
    { label: "Profit", rate: "10%", amount: 33361 },
    { label: "Tax", rate: "4.5%", amount: 15012 },
    { label: "Performance & payment bonds", rate: "1.5%", amount: 5004 },
  ],
  // Excerpt of real line items from the estimate
  rows: [
    { div: "09", desc: "WC3 — Wall covering, Desert Dunes 8042 Sunbaked (Phillip Jeffries)", qty: 429, waste: "5%", qtyW: 451, unit: "SF", hrs: 99.1, labor: 11150.7, material: 12502.3, total: 23653 },
    { div: "26", desc: "L2 — Spot light, Solais LCS-1, 11W, 3500K, 95 CRI", qty: 45, waste: "0%", qtyW: 45, unit: "EA", hrs: 33.8, labor: 3796.9, material: 6412.5, total: 10209 },
    { div: "05", desc: "(2) 1 5/8\" x 3 5/8\" metal stud wall @ 16\" O.C. (12'-0\"H)", qty: 162, waste: "5%", qtyW: 171, unit: "LF", hrs: 9.5, labor: 1074.3, material: 1296.0, total: 2370 },
    { div: "09", desc: "5/8\" gypsum wall board", qty: 872, waste: "5%", qtyW: 916, unit: "SF", hrs: 16.5, labor: 1854.1, material: 1602.3, total: 3456 },
    { div: "02", desc: "Existing cove light to be removed", qty: 180, waste: "0%", qtyW: 180, unit: "LF", hrs: 26.9, labor: 3031.1, material: 0, total: 3031 },
    { div: "05", desc: "5x5x3/8 HSS steel column (12'-0\"H)", qty: 535, waste: "5%", qtyW: 562, unit: "LBS", hrs: 8.4, labor: 948.3, material: 1011.5, total: 1960 },
    { div: "09", desc: "PT1 — Wall paint, Benjamin Moore OC-69 (flat)", qty: 1127, waste: "5%", qtyW: 1183, unit: "SF", hrs: 33.1, labor: 3726.4, material: 1685.8, total: 5412 },
    { div: "12", desc: "LAM-1 — White laminate work station counter", qty: 32, waste: "5%", qtyW: 33, unit: "SF", hrs: 6.6, labor: 744.4, material: 4218.4, total: 4963 },
    { div: "22", desc: "2\" dia. sanitary waste pipe", qty: 9, waste: "5%", qtyW: 10, unit: "LF", hrs: 2.0, labor: 223.5, material: 192.2, total: 416 },
    { div: "26", desc: "Mini dome camera provision", qty: 20, waste: "0%", qtyW: 20, unit: "EA", hrs: 24.0, labor: 2700.0, material: 3300.0, total: 6000 },
    { div: "26", desc: "Double gang tel/data outlet", qty: 30, waste: "0%", qtyW: 30, unit: "EA", hrs: 21.0, labor: 2362.5, material: 1260.0, total: 3623 },
  ],
};
