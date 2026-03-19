"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ReviewData } from "@/sanity/types";

const TRUNCATE_AT = 120; // characters before "Read more" appears

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[3px] mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z"
            fill={i < rating ? "#221c14" : "none"}
            stroke="#221c14"
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewData }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = review.body.length > TRUNCATE_AT;
  const preview = needsTruncation ? review.body.slice(0, TRUNCATE_AT).trimEnd() + "…" : review.body;

  return (
    <div className="flex-none w-[300px] md:w-[360px] p-8 flex flex-col">
      <Stars rating={review.rating} />

      <div className="flex-1 mb-6">
        <AnimatePresence initial={false} mode="wait">
          {expanded ? (
            <motion.p
              key="full"
              className="text-[#221c14] font-bold text-[16px] leading-[1.65em]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              &ldquo;{review.body}&rdquo;
            </motion.p>
          ) : (
            <motion.p
              key="preview"
              className="text-[#221c14] font-bold text-[16px] leading-[1.65em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              &ldquo;{preview}&rdquo;
            </motion.p>
          )}
        </AnimatePresence>

        {needsTruncation && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 text-[#221c14]/50 font-bold text-[12px] tracking-[2px] uppercase hover:text-[#221c14] transition-colors cursor-pointer"
          >
            {expanded ? "Show less ↑" : "Read more ↓"}
          </button>
        )}
      </div>

      <p className="text-[#221c14]/50 font-bold text-[12px] tracking-[2px] uppercase">
        {review.author}
      </p>
    </div>
  );
}

const PLACEHOLDER_REVIEWS: ReviewData[] = [
  { _id: "p1", author: "Marta K.", body: "Absolutely incredible experience. Lukas understood exactly what I wanted and the result exceeded all expectations. The studio has such a warm, creative atmosphere.", rating: 5, date: null },
  { _id: "p2", author: "Jonas B.", body: "Got a linocut print made here — the detail and craftsmanship is unreal. Will definitely be back for more pieces.", rating: 5, date: null },
  { _id: "p3", author: "Emilija V.", body: "Booked a tattoo consultation and felt completely at ease. Very professional, hygienic, and the artist took time to really refine the design.", rating: 5, date: null },
  { _id: "p4", author: "Tomas A.", body: "Attended a printmaking workshop — one of the best afternoons I've had in Vilnius. Small group, great teacher, and I left with something I made myself.", rating: 5, date: null },
  { _id: "p5", author: "Aistė R.", body: "The gift voucher was the perfect present. My partner used it for a custom tattoo and the whole process from booking to the final piece was seamless.", rating: 5, date: null },
];

export default function Reviews({ items }: { items?: ReviewData[] | null }) {
  const t = useTranslations("reviews");
  const reviews = items && items.length > 0 ? items : PLACEHOLDER_REVIEWS;

  return (
    <section style={{ backgroundColor: "#e5e4d2" }} className="border-b-2 border-[#221c14]">
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

      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex w-max divide-x-2 divide-[#221c14]">
          {reviews.map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
