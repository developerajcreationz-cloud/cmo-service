import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: `${site.name} | ${site.role}`, description: site.description },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%237430F7'/%3E%3Ctext x='16' y='23' font-family='Helvetica,Arial' font-size='20' font-weight='700' fill='white' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{`.intro{display:none!important}`}</style>
        </noscript>
        <div className="progress" aria-hidden="true">
          <span data-progress />
        </div>
        <div className="cursor" aria-hidden="true" data-cursor>
          <span className="cursor__ring" data-cursor-ring />
          <span className="cursor__dot" data-cursor-dot />
          <span className="cursor__label" data-cursor-label>View</span>
        </div>
        <div className="grain" aria-hidden="true" />
        <a className="skip sr-only" href="#main">Skip to content</a>
        <Nav />
        {children}
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
