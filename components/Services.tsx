"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("services");

  const SERVICES = [
    { id: "tattoo",     heading: t("title1"), body: t("body1") },
    { id: "linocuts",   heading: t("title2"), body: t("body2") },
    { id: "workshops",  heading: t("title3"), body: t("body3") },
  ];

  return (
    <section id="services" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>
      {SERVICES.map((svc, i) => (
        <motion.div
          key={svc.id}
          className="grid grid-cols-2 border-b-2 border-[#221c14] last:border-b-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.05 }}
        >
          {/* Left: heading — matches nav logo column */}
          <div className="border-r-2 border-[#221c14] px-5 md:px-10 py-12 md:py-16 flex items-center">
            <h2
              className="text-[#221c14] font-extrabold leading-[1.1em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {svc.heading}
            </h2>
          </div>

          {/* Right: body + CTA — matches nav links column */}
          <div className="px-5 md:px-10 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] max-w-[480px]">
              {svc.body}
            </p>
            <a
              href="/book"
              className="flex-shrink-0 self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
            >
              {t("cta")}
            </a>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
