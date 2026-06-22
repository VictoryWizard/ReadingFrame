import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import { SearchProvider } from "@/components/SearchProvider";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink } from "@/components/SkipLink";
import { FadeInObserver } from "@/components/FadeInObserver";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  display: "swap",
});

const { brandLine, seoDescription, analytics } = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL("https://reading-frame.com"),
  title: {
    default: `ReadingFrame | ${brandLine}`,
    template: "%s | ReadingFrame",
  },
  description: seoDescription,
  openGraph: {
    siteName: "ReadingFrame",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Note: no site-wide `alternates.canonical` here on purpose — a default
  // canonical in the root layout propagates to every child page that doesn't
  // override it (e.g. /about/, /search/), making them claim the homepage as
  // canonical. Each route sets its own canonical instead.
  ...(analytics.googleSiteVerification
    ? { verification: { google: analytics.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${sourceSans.variable} flex min-h-screen flex-col antialiased`}
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ThemeProvider>
          <AccessibilityProvider>
            <SearchProvider>
              <SkipLink />
              <SiteNav />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <SiteFooter />
              <FadeInObserver />
              <AccessibilityToolbar />
              <Analytics />
            </SearchProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
