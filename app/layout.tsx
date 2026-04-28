import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const switzer = localFont({
  src: [
    { path: "../public/fonts/Switzer-Variable.woff2", style: "normal", weight: "100 900" },
    { path: "../public/fonts/Switzer-VariableItalic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

// ── Analytics IDs — replace placeholders before going live ────────────────
const FB_PIXEL_ID = "1618064772761145";   // e.g. "1234567890123456"
const GA4_ID      = "GTM-MJ6723JD";  // e.g. "G-XXXXXXXXXX"

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/assets/favicon96px.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/assets/favicon96px.png",
  },
  title: "Publikacija — Tattoo & Linocut Studio",
  description:
    "Custom tattoo artistry, linocuts and creative workshops in Vilnius, Lithuania.",
  keywords: ["tattoo studio", "linocuts", "creative workshops", "Vilnius", "fine line tattoo"],
  openGraph: {
    title: "Publikacija — Tattoo & Linocut Studio",
    description: "Custom tattoo artistry, linocuts and creative workshops in Vilnius, Lithuania.",
    locale: "lt_LT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt" className={switzer.variable}>
      <body className="antialiased">
        {children}

        {/* ── Google Analytics 4 ──────────────────────────────────────── */}
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

        {/* ── Meta Pixel ──────────────────────────────────────────────── */}
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
      </body>
    </html>
  );
}
