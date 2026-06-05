"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AboutData } from "@/sanity/types";

export default function AboutFaq({ data }: { data?: AboutData | null }) {
  const items = (data?.faqItems ?? []).filter((i) => i?.question);
  const [open, setOpen] = useState<number | null>(null);

  if (!items.length) return null;

  const eyebrow = data?.faqEyebrow;
  const heading = data?.faqHeading;

  return (
    <section className="border-b-2 border-[#221c14]">
      {(eyebrow || heading) && (
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
          {eyebrow && (
            <p className="text-[#221c14]/50 font-bold text-[14px] tracking-[3px] uppercase mb-2">
              {eyebrow}
            </p>
          )}
          {heading && <h2 className="text-title text-[#221c14]">{heading}</h2>}
        </div>
      )}

      <div>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`px-5 md:px-10 ${i < items.length - 1 ? "border-b-2 border-[#221c14]" : ""}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="text-[#221c14] font-bold text-[18px] md:text-[22px] leading-snug group-hover:opacity-60 transition-opacity">
                  {item.question}
                </span>
                <span className="shrink-0 text-[#221c14] text-3xl leading-none w-8 flex justify-center">
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block"
                  >
                    +
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && item.answer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-body text-[#221c14]/80 max-w-[700px] pb-7 whitespace-pre-line">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
