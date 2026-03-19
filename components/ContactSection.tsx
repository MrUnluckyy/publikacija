"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactSection({ instagramUrl }: { instagramUrl?: string | null }) {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>

      {/* Section header */}
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
        <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">{t("eyebrow")}</p>
        <h2
          className="text-[#221c14] font-extrabold leading-[1.1em]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          {t("heading")}
        </h2>
      </div>

      <div className="grid md:grid-cols-2">

        {/* Left: booking */}
        <motion.div
          className="px-5 md:px-10 py-12 md:py-16 border-b-2 md:border-b-0 md:border-r-2 border-[#221c14]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h3
            className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
          >
            {t("bookHeading")}
          </h3>
          <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] mb-8 max-w-[400px]">
            {t("bookBody")}
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/book"
              className="inline-block w-fit border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-7 py-3.5 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
            >
              {t("sendMessage")}
            </a>
            <p className="text-[#221c14]/60 font-bold text-[13px]">
              {t("replyTime")}
            </p>
          </div>
        </motion.div>

        {/* Right: studio details */}
        <motion.div
          className="px-5 md:px-10 py-12 md:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <h3
            className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
          >
            {t("findUs")}
          </h3>
          <div className="space-y-6 text-[#221c14]">
            <div>
              <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-1">{t("studioLabel")}</p>
              <p className="font-bold text-[18px] leading-[1.65em]">{t("studioName")}</p>
              <p className="font-bold text-[18px] leading-[1.65em]">{t("studioAddress")}</p>
            </div>
            <div>
              <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-1">{t("hoursLabel")}</p>
              <p className="font-bold text-[18px] leading-[1.65em]">{t("hoursValue")}</p>
            </div>
            <div>
              <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-1">{t("socialLabel")}</p>
              <a
                href={instagramUrl ?? "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[18px] border-b-2 border-[#221c14]/30 hover:border-[#221c14] transition-colors pb-0.5"
              >
                {t("instagram")}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 aspect-[16/9] border-2 border-[#221c14] relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2307.1753200667595!2d25.268067699999996!3d54.6713424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd950175861039%3A0x80d1e9296f32bf3e!2sPublikacija%20Tattoo!5e0!3m2!1sen!2slt!4v1773904662318!5m2!1sen!2slt"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) contrast(1.1) brightness(0.95)",
                display: "block",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
