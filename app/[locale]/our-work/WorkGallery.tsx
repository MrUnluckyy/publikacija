"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import type { PortfolioItemData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Lightbox from "@/components/Lightbox";

const PLACEHOLDER_COLORS = [
  "#c9c5b0", "#b8b4a0", "#d2cfc0", "#c0bca8",
  "#bab6a3", "#cbc7b4", "#b2ae9c", "#c6c2af",
];

export default function WorkGallery({ items }: { items: PortfolioItemData[] }) {
  const t = useTranslations("ourWork");

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeArtist, setActiveArtist] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const CATEGORY_FILTERS = [
    { key: "all",    label: t("filterAll") },
    { key: "tattoo", label: t("filterTattoo") },
    { key: "print",  label: t("filterPrint") },
  ];

  // Derive unique artists from items, preserving order of first appearance
  const artists = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const item of items) {
      if (item.artistName && !seen.has(item.artistName)) {
        seen.add(item.artistName);
        result.push(item.artistName);
      }
    }
    return result;
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch =
        activeCategory === "all" || item.category?.toLowerCase() === activeCategory;
      const artistMatch =
        activeArtist === "all" || item.artistName === activeArtist;
      return categoryMatch && artistMatch;
    });
  }, [items, activeCategory, activeArtist]);

  const lightboxImages = filtered
    .filter((item) => item.image)
    .map((item) => ({
      src: urlFor(item.image!).width(1600).height(2000).auto("format").url(),
      alt: item.title,
    }));

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % lightboxImages.length)),
    [lightboxImages.length]);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + lightboxImages.length) % lightboxImages.length)),
    [lightboxImages.length]);

  return (
    <>
      {/* Category filters */}
      <div className="flex border-b-2 border-[#221c14]">
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveCategory(f.key)}
            className={`font-bold text-[13px] tracking-[2px] uppercase px-6 md:px-10 py-5 border-r-2 border-[#221c14] last:border-r-0 transition-colors duration-200 cursor-pointer ${
              activeCategory === f.key
                ? "bg-[#221c14] text-[#e5e4d2]"
                : "text-[#221c14] hover:bg-[#221c14] hover:text-[#e5e4d2]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Artist filters — secondary, lightweight row */}
      {artists.length > 1 && (
        <div className="flex items-center gap-6 border-b-2 border-[#221c14] px-5 md:px-10 py-3">
          {[{ key: "all", label: t("filterAll") }, ...artists.map((a) => ({ key: a, label: a }))].map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveArtist(f.key)}
              className={`font-bold text-[11px] tracking-[3px] uppercase transition-colors duration-200 cursor-pointer pb-0.5 ${
                activeArtist === f.key
                  ? "text-[#221c14] border-b-2 border-[#221c14]"
                  : "text-[#221c14]/35 border-b-2 border-transparent hover:text-[#221c14]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0
            ? filtered.map((item, i) => (
                <motion.button
                  key={item._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  onClick={() => openLightbox(i)}
                  className="aspect-[2/3] relative overflow-hidden group border-b-2 border-r-2 border-[#221c14] [&:nth-child(2n)]:md:border-r-2 [&:nth-child(3n)]:md:border-r-0 [&:nth-child(4n)]:lg:border-r-0 [&:nth-child(3n)]:lg:border-r-2 cursor-pointer focus:outline-none"
                >
                  {item.image ? (
                    <Image
                      src={urlFor(item.image).width(600).height(900).auto("format").url()}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length] }}
                    />
                  )}
                  <div className="absolute inset-0 bg-[#221c14]/0 group-hover:bg-[#221c14]/30 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <p className="text-white font-bold text-[12px] tracking-[2px] uppercase">
                      {item.artistName ?? item.title}
                    </p>
                  </div>
                </motion.button>
              ))
            : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-[#221c14]/50 font-bold text-[15px] px-5 md:px-10 py-16"
                >
                  {t("empty")}
                </motion.p>
              )
          }
        </AnimatePresence>
      </motion.div>

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
