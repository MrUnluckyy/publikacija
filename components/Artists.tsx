"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Artists() {
  const t = useTranslations("artists");

  const ARTISTS = [
    {
      name: "Lukas",
      title: "Tattoo Artist & Printmaker",
      bio: t("lukasBio"),
      instagram: "https://instagram.com",
      handle: "@lukastattoo",
    },
    {
      name: "Artiomas",
      title: "Tattoo Artist",
      bio: t("artiomasBio"),
      instagram: "https://instagram.com",
      handle: "@scarycatboo",
    },
  ];

  return (
    <section id="about" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>

      {/* Section header */}
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
        <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">
          {t("eyebrow")}
        </p>
          <h2
            className="text-[#221c14] font-extrabold leading-[1.1em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {t("heading")}
          </h2>
      </div>

      {/* Artist rows */}
      <div>
        {ARTISTS.map((artist, i) => (
          <motion.div
            key={artist.name}
            className="grid grid-cols-2 border-b-2 border-[#221c14] last:border-b-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            {/* Left: name + title */}
            <div className="border-r-2 border-[#221c14] px-5 md:px-10 py-12 md:py-16 flex flex-col justify-center">
              <h3
                className="text-[#221c14] font-extrabold leading-[1.05em] mb-2"
                style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
              >
                {artist.name}
              </h3>
              <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mt-3">
                {artist.title}
              </p>
            </div>

            {/* Right: bio + instagram */}
            <div className="px-5 md:px-10 py-12 md:py-16 flex flex-col justify-between">
              <p className="text-[#221c14] font-bold text-[17px] leading-[1.65em] mb-8 max-w-[480px]">
                {artist.bio}
              </p>
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase border-b-2 border-[#221c14] pb-1 w-fit hover:opacity-50 transition-opacity"
              >
                Instagram <span className="text-[#221c14]/50">{artist.handle}</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
