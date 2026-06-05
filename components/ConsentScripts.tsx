"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// ── Analytics IDs ─────────────────────────────────────────────────────────
const FB_PIXEL_ID = "1618064772761145";
const GA4_ID = "GTM-MJ6723JD";

// CookieYes stores granted categories in the `cookieyes-consent` cookie,
// e.g. "...,analytics:yes,advertisement:no,...". It also fires a
// `cookieyes_consent_update` event when the visitor changes their choice.
function readConsent() {
  if (typeof document === "undefined") return { analytics: false, advertisement: false };
  const match = document.cookie.match(/cookieyes-consent=([^;]+)/);
  if (!match) return { analytics: false, advertisement: false };
  const value = decodeURIComponent(match[1]);
  return {
    analytics: /(?:^|,)analytics:yes/.test(value),
    advertisement: /(?:^|,)advertisement:yes/.test(value),
  };
}

export default function ConsentScripts() {
  const [analytics, setAnalytics] = useState(false);
  const [advertisement, setAdvertisement] = useState(false);

  useEffect(() => {
    const apply = () => {
      const c = readConsent();
      // Only ever flip on — once a script has loaded this session it stays loaded
      // until the next reload, which is when CookieYes re-enforces blocking.
      if (c.analytics) setAnalytics(true);
      if (c.advertisement) setAdvertisement(true);
    };

    apply();

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { accepted?: string[] } | undefined;
      const accepted = detail?.accepted ?? [];
      if (accepted.includes("analytics")) setAnalytics(true);
      if (accepted.includes("advertisement")) setAdvertisement(true);
      apply();
    };

    document.addEventListener("cookieyes_consent_update", handler);
    return () => document.removeEventListener("cookieyes_consent_update", handler);
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
