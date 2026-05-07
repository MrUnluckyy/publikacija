"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen,   setMenuOpen]   = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [localeOpen, setLocaleOpen] = useState(false);
  const localeRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { label: t("booking"),      href: "/book" },
    { label: t("ourWork"),      href: "/our-work" },
    { label: t("giftVouchers"), href: "/gift-vouchers" },
    { label: t("about"),        href: "/apie-mus" },
  ];

  const otherLocale = locale === "lt" ? "en" : "lt";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close locale dropdown on outside click
  useEffect(() => {
    if (!localeOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (localeRef.current && !localeRef.current.contains(e.target as Node)) {
        setLocaleOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [localeOpen]);

  function switchLocale(nextLocale: string) {
    router.push(pathname, { locale: nextLocale });
    setLocaleOpen(false);
  }

  // Nav link opacity: active/hovered = 1, rest = dimmed
  function navOpacity(href: string) {
    const isActive  = pathname === href;
    const isHovered = hoveredNav === href;
    if (isActive || isHovered) return 1;
    if (hoveredNav !== null) return 0.22;  // something else is hovered → very dim
    return 0.42;                            // idle → softly dimmed
  }

  return (
    <>
      <header
        className="fixed left-0 right-0 z-50 border-b-2 border-[#221c14]"
        style={{ top: "var(--bar-h, 0px)", height: 72, backgroundColor: "#e5e4d2" }}
      >
        <div className="h-full flex justify-between">

          {/* Left: logo */}
          <div className="flex items-center px-5 md:px-10">
            <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Publikacija – home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/publikacija_iskaba-web.svg"
                alt="Publikacija"
                style={{ height: 46, width: "auto" }}
              />
            </Link>
          </div>

          {/* Right: nav links + locale — desktop */}
          <div className="hidden md:flex items-center gap-8 px-10">
            <nav
              className="flex items-center gap-6"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => setHoveredNav(l.href)}
                  className="text-[#221c14] text-4xl font-bold whitespace-nowrap"
                  style={{
                    opacity: navOpacity(l.href),
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Locale dropdown */}
            <div ref={localeRef} className="relative flex-shrink-0">
              <button
                onClick={() => setLocaleOpen((v) => !v)}
                className="flex items-center gap-2 text-4xl font-bold uppercase text-[#221c14] cursor-pointer hover:opacity-60 transition-opacity duration-150"
              >
                {locale.toUpperCase()}
                <svg
                  width="12" height="8" viewBox="0 0 8 5" fill="none"
                  style={{
                    transform: localeOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path d="M1 1L4 4L7 1" stroke="#221c14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {localeOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 border-2 border-[#221c14] overflow-hidden"
                    style={{ backgroundColor: "#e5e4d2", minWidth: 80 }}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    {["lt", "en"].map((loc) => (
                      <button
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={`w-full px-5 py-3 text-left text-2xl font-bold uppercase cursor-pointer transition-colors duration-100 hover:bg-[#221c14] hover:text-[#e5e4d2] ${
                          locale === loc ? "text-[#221c14]" : "text-[#221c14]/35"
                        }`}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: hamburger — mobile */}
          <div className="flex md:hidden items-center justify-end px-5">
            <button
              className="flex flex-col justify-center gap-[5px] w-[35px] h-[35px] cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span className="block w-full h-[2px] bg-[#221c14] origin-center"
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
              <motion.span className="block w-full h-[2px] bg-[#221c14]"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
              <motion.span className="block w-full h-[2px] bg-[#221c14] origin-center"
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end pb-14 px-6"
            style={{ backgroundColor: "#211c15" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <div key={l.label} className="overflow-hidden border-b-2 border-white/10">
                  <motion.div
                    initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      className="flex items-center justify-between py-5 text-white text-4xl font-extrabold uppercase hover:opacity-60 transition-opacity"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                      <span className="text-white/30 text-2xl">→</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="flex items-center justify-between gap-4 mt-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.3 }}
            >
              <a
                href="mailto:info@publikacija.lt"
                className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors"
              >
                info@publikacija.lt
              </a>
              <div className="flex items-center gap-2 text-[14px] font-bold tracking-[2px]">
                {["lt", "en"].map((loc, i) => (
                  <>
                    {i > 0 && <span key="sep" className="text-white/20">/</span>}
                    <button
                      key={loc}
                      onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                      className={`cursor-pointer pb-0.5 transition-colors border-b-2 ${
                        locale === loc
                          ? "text-white border-white"
                          : "text-white/40 border-transparent hover:text-white"
                      }`}
                    >
                      {loc.toUpperCase()}
                    </button>
                  </>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
