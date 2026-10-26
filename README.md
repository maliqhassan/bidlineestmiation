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

Put the file in `public/` (e.g. `public/logo.png`) and set `logo: "/logo.png"` in `src/lib/site.ts`. Browser-tab icons are `src/app/icon.png` and `src/app/apple-icon.png`.

### Quote form email

Every form submission is emailed to `CONTACT_TO` (default: the first email in `src/lib/site.ts`), sent through the Hostinger mailbox via SMTP. Replying to the email replies to the visitor.

**On Vercel**, add these under Project → Settings → Environment Variables, then redeploy:

| Name | Value |
| --- | --- |
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@bidlineestimatingsolutions.com` |
| `SMTP_PASS` | the mailbox password |
| `CONTACT_TO` | `info@bidlineestimatingsolutions.com` |

Locally, copy `.env.example` to `.env.local` instead. Without these settings, submissions are logged to the console in dev; in production the form shows an error pointing visitors to your phone/email.

Uploads are capped at 4 MB total because Vercel rejects larger requests — visitors can paste a Dropbox/Drive link for bigger plan sets.

All animations respect the visitor's "reduce motion" OS setting.
