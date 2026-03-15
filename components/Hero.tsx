"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import type { HeroData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

const SERVICES = [
  { label: "Tattoos",        href: "/our-work" },
  { label: "Linocut prints", href: "/our-work" },
  { label: "Workshops",      href: "/book" },
];

export default function Hero({ data }: { data?: HeroData | null }) {
  const video = data?.backgroundVideo?.playbackId ? data.backgroundVideo : null;
  const image = data?.heroImage ?? null;

  return (
    <section
      className="border-b-2 border-[#221c14]"
      style={{ paddingTop: 72, backgroundColor: "#e5e4d2" }}
    >
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-72px)]">

        {/* ── Left: heading + body ─────────────────────────── */}
        <motion.div
          className="flex flex-col justify-between px-5 md:px-10 py-12 md:py-16 border-b-2 md:border-b-0 md:border-r-2 border-[#221c14]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          <div>
            <motion.h1
              className="text-[#221c14] font-extrabold leading-[1.1em] mb-10"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 2.05 }}
            >
              Publikacija<br />Tattoo
            </motion.h1>

            <motion.p
              className="text-[#221c14] font-bold leading-[1.65em] max-w-[540px]"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              Publikacija Tattoo is not only a tattoo studio but a creative space
              where different media and visions meet. We enjoy combining contemporary
              ideas with traditions that carry their own history. From this fusion
              emerge works that reveal the distinctive tone of our creative approach.
            </motion.p>
          </div>

          {/* Bottom: optional media (video / image) */}
          {(video || image) && (
            <motion.div
              className="mt-10 aspect-video relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.35 }}
            >
              {video ? (
                <MuxPlayer
                  playbackId={video.playbackId}
                  streamType="on-demand"
                  autoPlay="muted"
                  loop muted playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : image ? (
                <Image
                  src={urlFor(image).width(900).height(500).auto("format").url()}
                  alt="Publikacija Studio"
                  fill className="object-cover" priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : null}
            </motion.div>
          )}
        </motion.div>

        {/* ── Right: services list ─────────────────────────── */}
        <div className="flex flex-col">
          {SERVICES.map((svc, i) => (
            <motion.a
              key={svc.label}
              href={svc.href}
              className="flex-1 flex items-center px-5 md:px-10 border-b-2 border-[#221c14] last:border-b-0 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200 group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 2.1 + i * 0.08 }}
            >
              <span
                className="font-extrabold leading-none"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              >
                {svc.label}
              </span>
              <span className="ml-auto text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
