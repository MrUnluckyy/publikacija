import type { Metadata } from "next";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
