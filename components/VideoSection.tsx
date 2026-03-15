"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";
import Image from "next/image";
import type { VideoData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

// ─── Placeholder fallback labels ───────────────────────────────────────────────

const FALLBACK_VIDEOS: { label: string; featured: boolean }[] = [
  { label: "Studio Tour — Publikacija 2024", featured: true },
  { label: "The Tattooing Process", featured: false },
  { label: "From Design to Print", featured: false },
];

// ─── Single video tile ─────────────────────────────────────────────────────────

function VideoTile({
  label,
  playbackId,
  poster,
  large = false,
}: {
  label: string;
  playbackId: string | null;
  poster: VideoData["poster"];
  large?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const aspectClass = large ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-video";

  if (playbackId) {
    return (
      <div
        className={`relative overflow-hidden cursor-pointer group bg-[#0d0c0a] ${aspectClass}`}
        onClick={() => setPlaying(true)}
      >
        {/* Poster image */}
        {!playing && poster && (
          <Image
            src={urlFor(poster).width(1200).auto("format").url()}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        )}

        {playing ? (
          <MuxPlayer
            playbackId={playbackId}
            autoPlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        ) : (
          <>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: hovered ? 1.08 : 1 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/15"
                  animate={{ scale: hovered ? [1, 1.5] : 1, opacity: hovered ? [0.5, 0] : 0.5 }}
                  transition={{ duration: 1.2, repeat: hovered ? Infinity : 0 }}
                />
                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="ml-1">
                    <polygon points="6,3 20,12 6,21" />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between">
              <div>
                <p className="text-[#c8b89a] text-[9px] tracking-[0.4em] uppercase mb-1">Watch</p>
                <p className="text-white text-sm md:text-base font-medium">{label}</p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Placeholder — no Mux video uploaded yet
  return (
    <PlaceholderTile label={label} large={large} />
  );
}

function PlaceholderTile({ label, large }: { label: string; large: boolean }) {
  const [hovered, setHovered] = useState(false);
  const aspectClass = large ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-video";

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group bg-[#0d0c0a] ${aspectClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f1b14] via-[#0f0e0c] to-[#1a1510]" />

      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(200,184,154,0.1) 0%, transparent 60%)" }}
        animate={{ opacity: hovered ? 1 : 0.25 }}
        transition={{ duration: 0.6 }}
      />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute w-20 h-20 rounded-full border border-white/15"
            animate={{ scale: hovered ? [1, 1.5] : 1, opacity: hovered ? [0.5, 0] : 0.5 }}
            transition={{ duration: 1.2, repeat: hovered ? Infinity : 0 }}
          />
          <div className="w-16 h-16 rounded-full border border-white/25 flex items-center justify-center backdrop-blur-sm bg-white/5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent">
        <div>
          <p className="text-[#c8b89a] text-[9px] tracking-[0.4em] uppercase mb-1">Watch</p>
          <p className="text-white text-sm md:text-base font-medium">{label}</p>
        </div>
        <span className="text-white/20 text-[9px] tracking-[0.25em] uppercase hidden sm:block">
          Video · Placeholder
        </span>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function VideoSection({ videos }: { videos?: VideoData[] | null }) {
  const hasCmsData = videos && videos.length > 0;

  const featured = hasCmsData ? videos.find((v) => v.featured) ?? videos[0] : null;
  const secondary = hasCmsData ? videos.filter((v) => v !== featured).slice(0, 2) : [];

  return (
    <section className="bg-[#0f0e0c] py-20 md:py-32">
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto space-y-4">
          {/* Heading */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c8b89a] mb-3">Studio Life</p>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.88]">
              Behind
              <br />
              The Work.
            </h2>
          </motion.div>

          {/* Hero video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          >
            {featured ? (
              <VideoTile
                label={featured.label}
                playbackId={featured.video?.playbackId ?? null}
                poster={featured.poster}
                large
              />
            ) : (
              <PlaceholderTile label={FALLBACK_VIDEOS[0].label} large />
            )}
          </motion.div>

          {/* Secondary videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hasCmsData
              ? secondary.map((v, i) => (
                  <motion.div
                    key={v._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 + i * 0.1 }}
                  >
                    <VideoTile
                      label={v.label}
                      playbackId={v.video?.playbackId ?? null}
                      poster={v.poster}
                    />
                  </motion.div>
                ))
              : FALLBACK_VIDEOS.slice(1).map((v, i) => (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 + i * 0.1 }}
                  >
                    <PlaceholderTile label={v.label} large={false} />
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
