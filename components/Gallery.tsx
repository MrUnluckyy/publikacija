"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PortfolioItemData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Lightbox from "./Lightbox";

const PLACEHOLDER_COLORS = [
  "#c9c5b0", "#b8b4a0", "#d2cfc0", "#c0bca8",
  "#bab6a3", "#cbc7b4", "#b2ae9c", "#c6c2af",
];

const ROW_1_ASPECTS = ["aspect-[2/3]","aspect-[2/3]","aspect-square","aspect-[2/3]","aspect-[3/4]","aspect-[2/3]","aspect-square","aspect-[2/3]"];
const ROW_2_ASPECTS = ["aspect-square","aspect-[2/3]","aspect-[3/4]","aspect-[2/3]","aspect-square","aspect-[2/3]","aspect-[3/4]","aspect-square"];

function PlaceholderCard({ color, aspect, label }: { color: string; aspect: string; label: string }) {
  return (
    <div className={`flex-none w-[200px] md:w-[240px] ${aspect} relative overflow-hidden`} style={{ backgroundColor: color }}>
      <div className="absolute bottom-2 left-2">
        <span className="text-[#221c14]/30 text-[9px] tracking-widest uppercase">{label}</span>
      </div>
    </div>
  );
}

function SanityCard({ item, onClick }: { item: PortfolioItemData; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-none w-[200px] md:w-[240px] aspect-[2/3] relative overflow-hidden cursor-pointer group focus:outline-none"
    >
      {item.image && (
        <>
          <Image
            src={urlFor(item.image).width(480).height(720).auto("format").url()}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="240px"
          />
          <div className="absolute inset-0 bg-[#221c14]/0 group-hover:bg-[#221c14]/20 transition-colors duration-300" />
        </>
      )}
    </button>
  );
}

function buildRows(items: PortfolioItemData[] | null) {
  if (items && items.length >= 1) {
    const doubled = [...items, ...items];
    const row1 = doubled.slice(0, Math.min(16, doubled.length));
    const row2 = doubled.slice(0, Math.min(16, doubled.length)).reverse();
    return { row1, row2, useCms: true };
  }
  return { row1: null, row2: null, useCms: false };
}

export default function Gallery({ items }: { items?: PortfolioItemData[] | null }) {
  const t = useTranslations("gallery");
  const { row1, row2, useCms } = buildRows(items ?? null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = (items ?? [])
    .filter((item) => item.image)
    .map((item) => ({
      src: urlFor(item.image!).width(1600).height(2000).auto("format").url(),
      alt: item.title,
    }));

  const openLightbox = useCallback((itemId: string) => {
    const idx = (items ?? []).findIndex((i) => i._id === itemId);
    if (idx !== -1) setLightboxIndex(idx);
  }, [items]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % lightboxImages.length)),
    [lightboxImages.length]);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + lightboxImages.length) % lightboxImages.length)),
    [lightboxImages.length]);

  const ph1 = [...ROW_1_ASPECTS, ...ROW_1_ASPECTS];
  const ph2 = [...ROW_2_ASPECTS, ...ROW_2_ASPECTS];

  return (
    <>
      <section id="gallery" style={{ backgroundColor: "#e5e4d2" }} className="border-b-2 border-[#221c14] overflow-hidden">
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">{t("eyebrow")}</p>
            <h2
              className="text-[#221c14] font-extrabold leading-[1.1em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {t("heading")}
            </h2>
          </motion.div>
        </div>

        <div className="flex gap-3 gallery-left w-max mb-3 pl-3 pt-8">
          {useCms && row1
            ? row1.map((item, i) => (
                <SanityCard key={`r1-${item._id}-${i}`} item={item} onClick={() => openLightbox(item._id)} />
              ))
            : ph1.map((aspect, i) => (
                <PlaceholderCard key={i} aspect={aspect} color={PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]} label={i % 2 === 0 ? "Tattoo" : "Linocut"} />
              ))}
        </div>

        <div className="flex gap-3 gallery-right w-max pl-3">
          {useCms && row2
            ? row2.map((item, i) => (
                <SanityCard key={`r2-${item._id}-${i}`} item={item} onClick={() => openLightbox(item._id)} />
              ))
            : ph2.map((aspect, i) => (
                <PlaceholderCard key={i} aspect={aspect} color={PLACEHOLDER_COLORS[(i + 4) % PLACEHOLDER_COLORS.length]} label={i % 2 === 0 ? "Linocut" : "Tattoo"} />
              ))}
        </div>

        <div className="px-5 md:px-10 mt-8 mb-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <a
              href="/our-work"
              className="inline-flex items-center gap-3 text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase border-b-2 border-[#221c14] pb-1 hover:opacity-60 transition-opacity"
            >
              {t("viewAll")} <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
