"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Footer({ instagramUrl }: { instagramUrl?: string | null }) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const year = new Date().getFullYear();

  const LINKS = [
    { label: nav("booking"),      href: "/book" },
    { label: nav("ourWork"),      href: "/our-work" },
    { label: nav("giftVouchers"), href: "/gift-vouchers" },
    { label: nav("about"),        href: "/apie-mus" },
  ];

  function switchLocale(nextLocale: string) {
    router.push(pathname, { locale: nextLocale });
  }

  return (
    <footer style={{ backgroundColor: "#e5e4d2" }}>

      {/* ── Desktop ── */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 items-center px-10 py-6 border-b-2 border-[#221c14]">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Curves.svg" alt="Publikacija" style={{ height: 24, width: "auto" }} />

          {/* Nav */}
          <nav className="flex items-center justify-center gap-8">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href}
                className="text-[#221c14] font-bold text-[14px] hover:opacity-50 transition-opacity">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center justify-end gap-5">
            <a href={instagramUrl ?? "https://instagram.com"} target="_blank" rel="noopener noreferrer"
              className="text-[#221c14] font-bold text-[14px] hover:opacity-50 transition-opacity">
              Instagram
            </a>
            <Link href="/terms" className="text-[#221c14] font-bold text-[14px] hover:opacity-50 transition-opacity">
              Terms
            </Link>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="px-10 py-4 flex items-center justify-between">
          <p className="text-[#221c14]/50 font-bold text-[12px] tracking-[1px]">
            © {year} Publikacija. {t("rights")}
          </p>
          <div className="flex items-center gap-1 text-[14px] font-bold tracking-[2px]">
            <button
              onClick={() => switchLocale("lt")}
              className={`pb-0.5 transition-colors ${locale === "lt" ? "text-[#221c14] border-b-2 border-[#221c14]" : "text-[#221c14]/40 border-b-2 border-transparent hover:text-[#221c14]"}`}
            >
              LT
            </button>
            <span className="text-[#221c14]/20 mx-1.5">/</span>
            <button
              onClick={() => switchLocale("en")}
              className={`pb-0.5 transition-colors ${locale === "en" ? "text-[#221c14] border-b-2 border-[#221c14]" : "text-[#221c14]/40 border-b-2 border-transparent hover:text-[#221c14]"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden" style={{ backgroundColor: "#211c15" }}>

        {/* Logo row */}
        <div className="border-b-2 border-white/10 px-5 py-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/publikacija_iskaba-web.svg"
            alt="Publikacija"
            style={{ height: 52, width: "auto", filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className="border-b-2 border-white/10 px-5 py-5 text-white font-bold text-[18px] hover:opacity-60 transition-opacity flex items-center justify-between">
              {l.label}
              <span className="text-white/30">→</span>
            </a>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-5 py-6 flex items-center justify-between">
          <p className="text-white/30 font-bold text-[12px]">
            © {year} Publikacija
          </p>
          <div className="flex gap-3 text-[13px] font-bold tracking-[2px]">
            <button
              onClick={() => switchLocale("lt")}
              className={`pb-0.5 transition-colors ${locale === "lt" ? "text-white border-b-2 border-white" : "text-white/40 border-b-2 border-transparent hover:text-white"}`}
            >
              LT
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => switchLocale("en")}
              className={`pb-0.5 transition-colors ${locale === "en" ? "text-white border-b-2 border-white" : "text-white/40 border-b-2 border-transparent hover:text-white"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
