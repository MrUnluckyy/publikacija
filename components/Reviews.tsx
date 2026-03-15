"use client";

import { motion } from "framer-motion";
import type { ReviewData } from "@/sanity/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[3px] mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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

const PLACEHOLDER_REVIEWS: ReviewData[] = [
  { _id: "p1", author: "Marta K.", body: "Absolutely incredible experience. Lukas understood exactly what I wanted and the result exceeded all expectations. The studio has such a warm, creative atmosphere.", rating: 5, date: null },
  { _id: "p2", author: "Jonas B.", body: "Got a linocut print made here — the detail and craftsmanship is unreal. Will definitely be back for more pieces.", rating: 5, date: null },
  { _id: "p3", author: "Emilija V.", body: "Booked a tattoo consultation and felt completely at ease. Very professional, hygienic, and the artist took time to really refine the design.", rating: 5, date: null },
  { _id: "p4", author: "Tomas A.", body: "Attended a printmaking workshop — one of the best afternoons I've had in Vilnius. Small group, great teacher, and I left with something I made myself.", rating: 5, date: null },
  { _id: "p5", author: "Aistė R.", body: "The gift voucher was the perfect present. My partner used it for a custom tattoo and the whole process from booking to the final piece was seamless.", rating: 5, date: null },
];

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <div className="flex-none w-[300px] md:w-[360px] p-8 flex flex-col">
      <Stars rating={review.rating} />
      <p className="text-[#221c14] font-bold text-[16px] leading-[1.65em] flex-1 mb-6">
        &ldquo;{review.body}&rdquo;
      </p>
      <p className="text-[#221c14]/50 font-bold text-[12px] tracking-[2px] uppercase">
        {review.author}
      </p>
    </div>
  );
}

export default function Reviews({ items }: { items?: ReviewData[] | null }) {
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
          <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">What clients say</p>
          <h2
            className="text-[#221c14] font-extrabold leading-[1.1em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Reviews
          </h2>
        </motion.div>
      </div>

      <motion.div
        className="overflow-x-auto pb-0"
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
