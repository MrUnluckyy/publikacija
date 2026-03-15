"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PortfolioItemData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

// ─── Placeholder gradient set — warm earth tones ──────────────────────────────

const PLACEHOLDER_COLORS = [
  "#c9c5b0", "#b8b4a0", "#d2cfc0", "#c0bca8",
  "#bab6a3", "#cbc7b4", "#b2ae9c", "#c6c2af",
];

// Each row has different aspect ratios to match the reference gallery
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

function SanityCard({ item }: { item: PortfolioItemData }) {

  console.log("item", item)
  return (
    <div className="flex-none w-[200px] md:w-[240px] aspect-[2/3] relative overflow-hidden">
      {item.image && (
        <Image
          src={urlFor(item.image).width(480).height(720).auto("format").url()}
          alt={item.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
          sizes="240px"
        />
      )}
    </div>
  );
}

// Build rows: use CMS items or fallback to placeholders
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
  const { row1, row2, useCms } = buildRows(items ?? null);

  // Doubled placeholder arrays for seamless loop
  const ph1 = [...ROW_1_ASPECTS, ...ROW_1_ASPECTS];
  const ph2 = [...ROW_2_ASPECTS, ...ROW_2_ASPECTS];

  return (
    <section id="gallery" style={{ backgroundColor: "#e5e4d2" }} className="border-b-2 border-[#221c14] overflow-hidden">
      {/* Section header */}
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">Selected Work</p>
          <h2
            className="text-[#221c14] font-extrabold leading-[1.1em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Mūsų darbai
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex gap-3 gallery-left w-max mb-3 pl-3 pt-8">
        {useCms && row1
          ? row1.map((item, i) => <SanityCard key={`r1-${item._id}-${i}`} item={item} />)
          : ph1.map((aspect, i) => (
              <PlaceholderCard
                key={i}
                aspect={aspect}
                color={PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]}
                label={i % 2 === 0 ? "Tattoo" : "Linocut"}
              />
            ))}
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex gap-3 gallery-right w-max pl-3">
        {useCms && row2
          ? row2.map((item, i) => <SanityCard key={`r2-${item._id}-${i}`} item={item} />)
          : ph2.map((aspect, i) => (
              <PlaceholderCard
                key={i}
                aspect={aspect}
                color={PLACEHOLDER_COLORS[(i + 4) % PLACEHOLDER_COLORS.length]}
                label={i % 2 === 0 ? "Linocut" : "Tattoo"}
              />
            ))}
      </div>

      {/* View all link */}
      <div className="px-5 md:px-10 mt-8 mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/our-work"
            className="inline-flex items-center gap-3 text-[#221c14] text-[15px] tracking-[2px] uppercase border-b border-[#221c14] pb-1 hover:opacity-60 transition-opacity"
          >
            View all work <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
