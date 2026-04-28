"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PortfolioItemData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Lightbox from "./Lightbox";

interface Props {
  items?: PortfolioItemData[] | null;
  eyebrow?: string | null;
  heading?: string | null;
}

const PLACEHOLDER_COLORS = [
  "#c9c5b0", "#b8b4a0", "#d2cfc0", "#c0bca8",
  "#bab6a3", "#cbc7b4", "#b2ae9c", "#c6c2af",
];

const ROW_1_ASPECTS = ["aspect-[2/3]","aspect-[2/3]","aspect-square","aspect-[2/3]","aspect-[3/4]","aspect-[2/3]","aspect-square","aspect-[2/3]"];
const ROW_2_ASPECTS = ["aspect-square","aspect-[2/3]","aspect-[3/4]","aspect-[2/3]","aspect-square","aspect-[2/3]","aspect-[3/4]","aspect-square"];

function PlaceholderCard({ color, aspect }: { color: string; aspect: string }) {
  return (
    <div className={`flex-none w-[180px] md:w-[220px] ${aspect} relative overflow-hidden`} style={{ backgroundColor: color }} />
  );
}

function SanityCard({
  item,
  onClick,
}: {
  item: PortfolioItemData;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-none w-[180px] md:w-[220px] aspect-[2/3] relative overflow-hidden cursor-pointer group focus:outline-none"
    >
      {item.image && (
        <Image
          src={urlFor(item.image).width(440).height(660).auto("format").url()}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="220px"
        />
      )}
      <div className="absolute inset-0 bg-[#221c14]/0 group-hover:bg-[#221c14]/50 transition-colors duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
        {item.artistName && (
          <p className="text-white font-bold text-[11px] tracking-[2px] uppercase leading-none">
            {item.artistName}
          </p>
        )}
      </div>
    </button>
  );
}

export default function Gallery({ items, eyebrow, heading }: Props) {
  const t = useTranslations("gallery");

  const displayEyebrow = eyebrow ?? t("eyebrow");
  const displayHeading = heading ?? t("heading");

  // Group items by artist when artist data exists
  const artistGroups = useMemo(() => {
    if (!items || items.length === 0) return null;
    const map = new Map<string, PortfolioItemData[]>();
    const untagged: PortfolioItemData[] = [];
    for (const item of items) {
      if (item.artistName) {
        const arr = map.get(item.artistName) ?? [];
        arr.push(item);
        map.set(item.artistName, arr);
      } else {
        untagged.push(item);
      }
    }
    // Only use artist split if we have at least one tagged item
    if (map.size === 0) return null;
    // Add untagged items to first artist group for completeness
    const groups = Array.from(map.entries()).map(([name, artItems]) => ({ name, items: artItems }));
    if (untagged.length > 0) groups[0].items = [...groups[0].items, ...untagged];
    return groups;
  }, [items]);

  // Lightbox state — track by (groupIndex, itemIndex) via flat index
  const allItems = useMemo(() => {
    if (artistGroups) return artistGroups.flatMap((g) => g.items);
    return items ?? [];
  }, [artistGroups, items]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = allItems
    .filter((i) => i.image)
    .map((i) => ({
      src: urlFor(i.image!).width(1600).height(2000).auto("format").url(),
      alt: i.title,
    }));

  const openLightbox = useCallback(
    (item: PortfolioItemData) => {
      const idx = allItems.findIndex((i) => i._id === item._id);
      if (idx !== -1) setLightboxIndex(idx);
    },
    [allItems]
  );
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % lightboxImages.length)),
    [lightboxImages.length]
  );
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + lightboxImages.length) % lightboxImages.length)),
    [lightboxImages.length]
  );

  const ph1 = [...ROW_1_ASPECTS, ...ROW_1_ASPECTS];
  const ph2 = [...ROW_2_ASPECTS, ...ROW_2_ASPECTS];

  return (
    <>
      <section id="gallery" style={{ backgroundColor: "#e5e4d2" }} className="border-b-2 border-[#221c14] overflow-hidden">

        {/* Header */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
          <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">{displayEyebrow}</p>
          <h2
            className="text-[#221c14] font-extrabold leading-[1.1em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {displayHeading}
          </h2>
        </div>

        {artistGroups ? (
          // ── Two artist galleries ──────────────────────────────────────────────
          artistGroups.map((group, gi) => {
            const doubled = [...group.items, ...group.items];
            const animClass = gi % 2 === 0 ? "gallery-left" : "gallery-right";
            return (
              <div key={group.name} className={gi > 0 ? "border-t-2 border-[#221c14]" : ""}>
                {/* Artist label */}
                <div className="px-5 md:px-10 pt-6 pb-2">
                  <span className="text-[#221c14]/40 font-bold text-[12px] tracking-[3px] uppercase">
                    {group.name}
                  </span>
                </div>
                <div className={`flex gap-3 ${animClass} w-max pb-6 pl-3`}>
                  {doubled.map((item, i) => (
                    <SanityCard
                      key={`g${gi}-${item._id}-${i}`}
                      item={item}
                      onClick={() => openLightbox(item)}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // ── Fallback: mixed two rows ──────────────────────────────────────────
          <>
            {items && items.length > 0 ? (
              <>
                <div className="flex gap-3 gallery-left w-max mb-3 pl-3 pt-8">
                  {[...items, ...items].slice(0, 16).map((item, i) => (
                    <SanityCard key={`r1-${item._id}-${i}`} item={item} onClick={() => openLightbox(item)} />
                  ))}
                </div>
                <div className="flex gap-3 gallery-right w-max pl-3">
                  {[...items, ...items].slice(0, 16).reverse().map((item, i) => (
                    <SanityCard key={`r2-${item._id}-${i}`} item={item} onClick={() => openLightbox(item)} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-3 gallery-left w-max mb-3 pl-3 pt-8">
                  {ph1.map((aspect, i) => (
                    <PlaceholderCard key={i} aspect={aspect} color={PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]} />
                  ))}
                </div>
                <div className="flex gap-3 gallery-right w-max pl-3">
                  {ph2.map((aspect, i) => (
                    <PlaceholderCard key={i} aspect={aspect} color={PLACEHOLDER_COLORS[(i + 4) % PLACEHOLDER_COLORS.length]} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* View all */}
        <div className="px-5 md:px-10 mt-6 mb-10">
          <a
            href="/our-work"
            className="inline-flex items-center gap-3 text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase border-b-2 border-[#221c14] pb-1 hover:opacity-60 transition-opacity"
          >
            {t("viewAll")} <span>→</span>
          </a>
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
