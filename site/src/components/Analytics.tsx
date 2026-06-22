"use client";

import Script from "next/script";
import { getSiteConfig } from "@/lib/site";

/**
 * Loads analytics only when configured in content/site.json. Supports either:
 *  - Plausible  → set analytics.plausibleDomain to "reading-frame.com"
 *  - Google GA4 → set analytics.ga4Id to your "G-XXXXXXX" measurement ID
 * Both can be left blank (the default), in which case nothing is injected.
 */
export function Analytics() {
  const { plausibleDomain, ga4Id } = getSiteConfig().analytics;

  return (
    <>
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}');`}
          </Script>
        </>
      )}
    </>
  );
}
