import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { MobileActionBar, MotionProvider, ScrollProgress } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Construction Estimating Services & Quantity Takeoffs | ${site.legalName}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Construction Estimating Services That Win More Bids | ${site.name}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f14",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-[70] rounded-lg bg-signal px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}
