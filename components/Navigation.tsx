"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Booking",        href: "/book" },
  { label: "Our Works",      href: "/our-work" },
  { label: "Gift Vouchers",  href: "/gift-vouchers" },
  { label: "About",          href: "#about" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b-2 border-[#221c14]"
        style={{ height: 72, backgroundColor: "#e5e4d2" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-full flex items-center justify-between px-5 md:px-10">

          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Publikacija – home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/publikacija_iskaba-web.svg"
              alt="Publikacija"
              style={{ height: 46, width: "auto" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[#221c14] text-[17px] font-bold hover:opacity-50 transition-opacity duration-150"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-1 ml-4 text-[17px] font-bold">
              <button className="text-[#221c14]">LT</button>
              <span className="text-[#221c14]/30 mx-1">/</span>
              <button className="text-[#221c14]/40 hover:text-[#221c14] transition-colors">EN</button>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden flex-col justify-center gap-[5px] w-[35px] h-[35px] cursor-pointer"
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
      </motion.header>

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
            <motion.div className="flex items-center gap-4 mt-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.3 }}>
              <a href="mailto:info@publikacija.lt"
                className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors">
                info@publikacija.lt
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
