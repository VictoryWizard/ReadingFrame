"use client";

import Script from "next/script";
import { getSiteConfig } from "@/lib/site";

export function Analytics() {
  const domain = getSiteConfig().analytics.plausibleDomain;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
