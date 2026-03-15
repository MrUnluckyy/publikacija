"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioItemData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

const FILTERS = ["All", "Tattoo", "Print"] as const;
type Filter = typeof FILTERS[number];

const PLACEHOLDER_COLORS = [
  "#c9c5b0", "#b8b4a0", "#d2cfc0", "#c0bca8",
  "#bab6a3", "#cbc7b4", "#b2ae9c", "#c6c2af",
  "#c4c0ad", "#b6b2a0", "#cecab8", "#beba a8",
];

export default function WorkGallery({ items }: { items: PortfolioItemData[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-[13px] tracking-[2px] uppercase px-5 py-2.5 border transition-colors duration-200 ${
              active === f
                ? "border-[#221c14] bg-[#221c14] text-[#e5e4d2]"
                : "border-[#221c14]/25 text-[#221c14] hover:border-[#221c14]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.length > 0
            ? filtered.map((item, i) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="aspect-[2/3] relative overflow-hidden group"
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
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#221c14]/0 group-hover:bg-[#221c14]/30 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-[12px] tracking-[2px] uppercase">{item.title}</p>
                  </div>
                </motion.div>
              ))
            : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-[#585858] text-[15px] py-10"
                >
                  No items yet — check back soon.
                </motion.p>
              )
          }
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
