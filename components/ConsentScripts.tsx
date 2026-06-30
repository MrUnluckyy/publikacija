"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent, CONSENT_EVENT, type ConsentState } from "@/lib/consent";

// ── Analytics IDs ─────────────────────────────────────────────────────────
const FB_PIXEL_ID = "1618064772761145";
const GA4_ID = "GTM-MJ6723JD";

export default function ConsentScripts() {
  const [analytics, setAnalytics] = useState(false);
  const [advertisement, setAdvertisement] = useState(false);

  useEffect(() => {
    // Only ever flip on — once a script has loaded this session it stays loaded
    // until the next reload, when blocking is re-enforced from the cookie.
    const apply = (c: ConsentState | null) => {
      if (c?.analytics) setAnalytics(true);
      if (c?.marketing) setAdvertisement(true);
    };

    apply(readConsent());

    const handler = (e: Event) => apply((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  return (
    <>
      {/* ── Google Analytics 4 (analytics consent) ─────────────────────── */}
      {analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}
          </Script>
        </>
      )}

      {/* ── Meta Pixel (advertisement consent) ─────────────────────────── */}
      {advertisement && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
