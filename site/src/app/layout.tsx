import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeInObserver } from "@/components/FadeInObserver";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Analytics } from "@/components/Analytics";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://reading-frame.com"),
  title: {
    default: "ReadingFrame | Bio/AI Breakdowns",
    template: "%s | ReadingFrame",
  },
  description:
    "Monthly, hype-free breakdowns of biotech and AI research by a student researcher in Bentonville, Arkansas.",
  openGraph: {
    siteName: "ReadingFrame",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://reading-frame.com" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${sourceSans.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider>
          <AccessibilityProvider>
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <FadeInObserver />
            <AccessibilityToolbar />
            <Analytics />
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
