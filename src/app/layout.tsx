import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

/**
 * Self-hosted via next/font so there's no render-blocking request to a font
 * CDN and no layout shift once it swaps in.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — We Help Sales Reps Build Their Own Business`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Build a business designed to run`,
    description: site.description,
    images: [{ url: "/brand/elysium-landscape.jpeg", width: 1685, height: 937, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Build a business designed to run`,
    description: site.description,
    images: ["/brand/elysium-landscape.jpeg"],
  },
  icons: { icon: "/brand/elysium-mark.jpeg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-200 focus:rounded-br-lg focus:bg-accent focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
