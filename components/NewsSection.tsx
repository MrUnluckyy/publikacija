"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import MuxPlayer from "@mux/mux-player-react";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/i18n/navigation";
import type { NewsPostData } from "@/sanity/types";
import ArrowIcon from "./ui/ArrowIcon";

interface Props {
  items?: NewsPostData[] | null;
  eyebrow?: string | null;
  heading?: string | null;
  // When true, render a single featured post with no carousel chrome
  // (no prev/next arrows, no "View all" link) — same card UI otherwise.
  featured?: boolean;
}

function formatDate(dateStr: string | null, locale: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale === "lt" ? "lt-LT" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsSection({ items, eyebrow, heading, featured = false }: Props) {
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const posts = items ?? [];
  if (posts.length === 0) return null;

  const post = posts[index];

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex((i) => (i + dir + posts.length) % posts.length);
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <section className="border-b-2 border-[#221c14]">
      {/* Compact header: single label + plain chevrons */}
      <div className="flex items-center justify-between border-b-2 border-[#221c14] px-5 md:px-10 py-4">
        <p className="text-[#221c14] font-bold text-[16px]">
          {heading ??
            eyebrow ??
            (featured
              ? locale === "lt"
                ? "Rekomenduojame"
                : "Featured"
              : locale === "lt"
                ? "Naujienos"
                : "News")}
        </p>

        <div className="flex items-center gap-6">
          {!featured && (
            <Link
              href="/blog"
              className="text-[#221c14]/50 font-bold text-[12px] tracking-[2px] uppercase hover:text-[#221c14] transition-colors"
            >
              {locale === "lt" ? "Visos naujienos" : "View all"}
            </Link>
          )}

          {!featured && posts.length > 1 && (
            <div className="flex items-center gap-5">
              <button
                onClick={() => go(-1)}
                aria-label="Previous post"
                className="text-[#221c14] hover:opacity-50 transition-opacity cursor-pointer"
              >
                <ArrowIcon direction="left" size={22} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next post"
                className="text-[#221c14] hover:opacity-50 transition-opacity cursor-pointer"
              >
                <ArrowIcon direction="right" size={22} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide area */}
      <div className="grid md:grid-cols-2">
        {/* Cover — video takes priority over image */}
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] overflow-hidden relative aspect-[4/3] md:aspect-auto md:min-h-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            {post.coverVideo?.playbackId ? (
              <motion.div
                key={post._id + "-video"}
                className="absolute inset-0 w-full h-full"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <MuxPlayer
                  playbackId={post.coverVideo.playbackId}
                  streamType="on-demand"
                  autoPlay="muted"
                  muted
                  loop
                  playsInline
                  nohotkeys
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    "--controls": "none",
                    "--media-object-fit": "cover",
                    "--media-object-position": "center",
                  } as React.CSSProperties & Record<`--${string}`, string>}
                />
              </motion.div>
            ) : post.coverImage ? (
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
            ) : null}
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
                  {formatDate(post.date, locale)}
                </p>
              )}
              <h3 className="text-subtitle text-[#221c14] mb-6">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-body text-[#221c14] opacity-70 mb-8">
                  {post.excerpt}
                </p>
              )}
            </div>

            {post.slug && (
              <Link
                href={`/blog/${post.slug}`}
                className="self-start inline-flex items-center gap-2 border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              >
                {locale === "lt" ? "Skaityti daugiau" : "Read more"}
                <ArrowIcon direction="right" size={14} />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
