"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { PortfolioItemData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

// ─── Fallback gradient items ───────────────────────────────────────────────────

type FallbackItem = {
  id: number;
  title: string;
  category: "Tattoo" | "Print";
  aspect: "portrait" | "square" | "landscape";
  bg: string;
};

const FALLBACK_ITEMS: FallbackItem[] = [
  { id: 1,  title: "Botanical Sleeve",    category: "Tattoo", aspect: "portrait",  bg: "from-[#1a1510] to-[#0d0c0a]" },
  { id: 2,  title: "Zine — Vol. 03",       category: "Print",  aspect: "portrait",  bg: "from-[#2d2520] to-[#1a1814]" },
  { id: 3,  title: "Fine Line Portrait",   category: "Tattoo", aspect: "square",    bg: "from-[#141210] to-[#0a0908]" },
  { id: 4,  title: "Riso Poster Series",   category: "Print",  aspect: "portrait",  bg: "from-[#1e1b15] to-[#131109]" },
  { id: 5,  title: "Geometric Mandala",    category: "Tattoo", aspect: "square",    bg: "from-[#231f18] to-[#16140f]" },
  { id: 6,  title: "Brand Identity Kit",   category: "Print",  aspect: "landscape", bg: "from-[#1a1814] to-[#0f0e0c]" },
  { id: 7,  title: "Blackwork Floral",     category: "Tattoo", aspect: "portrait",  bg: "from-[#12100e] to-[#080706]" },
  { id: 8,  title: "Art Print Edition",    category: "Print",  aspect: "square",    bg: "from-[#201d17] to-[#141210]" },
];

const aspectClass: Record<FallbackItem["aspect"], string> = {
  portrait:  "aspect-[3/4]",
  square:    "aspect-square",
  landscape: "aspect-[4/3]",
};

function TattooPattern() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="white" strokeWidth="0.7">
      <circle cx="50" cy="50" r="38" />
      <path d="M50 12 Q65 35 50 50 Q35 35 50 12" />
      <path d="M50 88 Q65 65 50 50 Q35 65 50 88" />
      <line x1="50" y1="12" x2="50" y2="88" />
      <line x1="12" y1="50" x2="88" y2="50" />
    </svg>
  );
}

function PrintPattern() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="white" strokeWidth="0.7">
      <rect x="12" y="12" width="76" height="76" />
      <line x1="12" y1="40" x2="88" y2="40" />
      <line x1="12" y1="60" x2="88" y2="60" />
      <line x1="40" y1="12" x2="40" y2="88" />
    </svg>
  );
}

// ─── Cards ─────────────────────────────────────────────────────────────────────

function FallbackCard({ item }: { item: FallbackItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex-none ${item.aspect === "landscape" ? "w-[280px] md:w-[340px]" : "w-[200px] md:w-[250px]"} group cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`${aspectClass[item.aspect]} relative overflow-hidden bg-gradient-to-br ${item.bg}`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          {item.category === "Tattoo" ? <TattooPattern /> : <PrintPattern />}
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="text-[#c8b89a] text-[9px] tracking-[0.35em] uppercase mb-1">{item.category}</p>
          <p className="text-white text-sm font-medium">{item.title}</p>
        </motion.div>
      </div>
    </div>
  );
}

function SanityCard({ item }: { item: PortfolioItemData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-none w-[200px] md:w-[250px] group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-[#1a1510]">
        {item.image && (
          <Image
            src={urlFor(item.image).width(500).height(667).auto("format").url()}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="250px"
          />
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="text-[#c8b89a] text-[9px] tracking-[0.35em] uppercase mb-1">{item.category}</p>
          <p className="text-white text-sm font-medium">{item.title}</p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function Portfolio({ items }: { items?: PortfolioItemData[] | null }) {
  const hasCmsData = items && items.length > 0;

  // Duplicate for seamless loop
  const sanityItems = hasCmsData ? [...items, ...items] : [];
  const fallbackItems = !hasCmsData
    ? [...FALLBACK_ITEMS, ...FALLBACK_ITEMS]
    : [];

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-[#f4f3ea] overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-10 mb-12">
        <div className="flex items-end justify-between max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a7060] mb-3">Selected Work</p>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#0f0e0c] leading-[0.88]">
              Portfolio
            </h2>
          </motion.div>

          <motion.a
            href="#"
            className="hidden md:inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#7a7060] hover:text-[#0f0e0c] transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            View All <span className="w-7 h-[1px] bg-current inline-block" />
          </motion.a>
        </div>
      </div>

      {/* Marquee */}
      <div className="flex gap-3 animate-marquee w-max pl-3">
        {hasCmsData
          ? sanityItems.map((item, i) => (
              <SanityCard key={`${item._id}-${i}`} item={item} />
            ))
          : fallbackItems.map((item, i) => (
              <FallbackCard key={`${item.id}-${i}`} item={item} />
            ))}
      </div>

      {/* Mobile CTA */}
      <div className="px-6 mt-8 md:hidden">
        <a href="#" className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#7a7060]">
          View All Work <span className="w-7 h-[1px] bg-current inline-block" />
        </a>
      </div>
    </section>
  );
}
