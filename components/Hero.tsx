"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { HeroData } from "@/sanity/types";

const NAV_H = 72;

export default function Hero({ data }: { data?: HeroData | null }) {
  const t = useTranslations("hero");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloader:shown")) {
      setReady(true);
      return;
    }
    const handler = () => setReady(true);
    window.addEventListener("preloader:done", handler);
    return () => window.removeEventListener("preloader:done", handler);
  }, []);

  const title1 = data?.title1 ?? t("title1");
  const title2 = data?.title2 ?? t("title2");
  const body   = data?.body   ?? t("body");

  const SERVICES = [
    { label: data?.service1 ?? t("service1"), href: "/our-work" },
    { label: data?.service2 ?? t("service2"), href: "/our-work" },
    { label: data?.service3 ?? t("service3"), href: "/book" },
  ];

  return (
    // No paddingTop on the section — columns start at y=0 so border-r spans
    // the full height including the area behind the fixed nav bar.
    <section
      className="border-b-2 border-[#221c14]"
      style={{ backgroundColor: "#e5e4d2" }}
    >
      <div className="grid md:grid-cols-2 min-h-screen">

        {/* ── Left ──────────────────────────────────────────────────────────── */}
        {/* border-r starts at section y=0, always aligned with the nav divider */}
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14]">
          <motion.div
            className="flex flex-col justify-between px-5 md:px-10 pb-12 md:pb-16 h-full"
            style={{ paddingTop: NAV_H + 48 }} // nav height + content breathing room
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <motion.h1
                className="text-[#221c14] font-extrabold leading-[1.1em] mb-10"
                style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: ready ? 0 : 30, opacity: ready ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              >
                {title1}<br />{title2}
              </motion.h1>

              <motion.p
                className="text-[#221c14] font-bold leading-[1.65em] max-w-[540px]"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {body}
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* ── Right: service links ──────────────────────────────────────────── */}
        {/* paddingTop pushes visible content below the nav bar */}
        <div className="flex flex-col md:pt-[72px]">
          {SERVICES.map((svc, i) => (
            <div key={svc.label} className="flex-1 border-b-2 border-[#221c14] last:border-b-0">
              <motion.a
                href={svc.href}
                className="w-full h-full flex items-center px-5 md:px-10 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200 group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              >
                <span
                  className="font-extrabold leading-none"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
                >
                  {svc.label}
                </span>
                <span className="ml-auto text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </motion.a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
