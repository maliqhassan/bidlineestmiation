# Bid Line Estimating Solutions — website

Next.js 16 (App Router) + Tailwind CSS v4 + Motion. All pages are statically prerendered; the quote form posts to `/api/contact`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Company name, phone, emails, address, socials, **logo** | `src/lib/site.ts` |
| All page copy (services, trades, FAQ, projects…) | `src/lib/content.ts` |
| Colors, fonts, keyframes | `src/app/globals.css` (`@theme` block) |
| Pages | `src/app/<route>/page.tsx` — `/`, `/about`, `/services`, `/trades`, `/process`, `/faq`, `/contact`, `/privacy`, `/terms` |
| Reusable motion primitives (Reveal, SplitText, Counter, Magnetic, SpotlightCard, Marquee) | `src/components/ui/motion.tsx` |
| Quote form / email API | `src/components/QuoteForm.tsx`, `src/app/api/contact/route.ts` |

### Adding the logo

Put the file in `public/` (e.g. `public/logo.png`) and set `logo: "/logo.png"` in `src/lib/site.ts`. Replace `src/app/favicon.ico` too.

### Quote form email

Copy `.env.example` to `.env.local` and fill in SMTP credentials. Without them, submissions are logged to the console in dev; in production the form shows an error pointing visitors to your phone/email.

Note: serverless hosts cap request bodies (Vercel: ~4.5 MB), so large plan uploads will fail there — visitors can paste a Dropbox/Drive link instead, or lower `MAX_TOTAL_MB` in the form.

All animations respect the visitor's "reduce motion" OS setting.
