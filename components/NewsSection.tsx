"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import type { NewsPostData } from "@/sanity/types";

interface Props {
  items?: NewsPostData[] | null;
  eyebrow?: string | null;
  heading?: string | null;
}

function formatDate(dateStr: string | null, locale: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale === "lt" ? "lt-LT" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsSection({ items, eyebrow, heading }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const posts = items ?? [];
  if (posts.length === 0) return null;

  const post = posts[index];

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((i) => (i + dir + posts.length) % posts.length);
    },
    [posts.length]
  );

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <section className="border-b-2 border-[#221c14]">
      {/* Header row */}
      <div className="flex items-center justify-between border-b-2 border-[#221c14] px-5 md:px-10 py-6">
        <div>
          {eyebrow && (
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-1">
              {eyebrow}
            </p>
          )}
          <h2
            className="text-[#221c14] font-extrabold leading-none"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            {heading ?? "Naujienos"}
          </h2>
        </div>

        {posts.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 border-2 border-[#221c14] flex items-center justify-center font-bold text-[#221c14] hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              aria-label="Previous post"
            >
              ←
            </button>
            <span className="font-bold text-[13px] text-[#221c14]/40 tabular-nums">
              {index + 1} / {posts.length}
            </span>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 border-2 border-[#221c14] flex items-center justify-center font-bold text-[#221c14] hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              aria-label="Next post"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Slide area */}
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] overflow-hidden relative aspect-[4/3] md:aspect-auto md:min-h-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            {post.coverImage && (
              <motion.img
                key={post._id + "-img"}
                src={urlFor(post.coverImage).width(900).height(700).url()}
                alt={post.title ?? ""}
                className="absolute inset-0 w-full h-full object-cover"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Text */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={post._id + "-text"}
            className="px-5 md:px-10 py-10 md:py-16 flex flex-col justify-between"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div>
              {post.date && (
                <p className="text-[#221c14]/40 font-bold text-[13px] tracking-[3px] uppercase mb-4">
                  {formatDate(post.date, "lt")}
                </p>
              )}
              <h3
                className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] opacity-70">
                  {post.excerpt}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
