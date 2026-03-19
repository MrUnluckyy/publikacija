"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MuxPlayer from "@mux/mux-player-react";
import type { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import type { MuxVideoAsset } from "@/sanity/types";

interface Props {
  video: MuxVideoAsset | null | undefined;
  label?: string | null;
}

export default function VideoSection({ video, label }: Props) {
  const t = useTranslations("videoSection");
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  if (!video?.playbackId) return null;

  function togglePlay() {
    const el = playerRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play(); setPlaying(true); }
  }

  function toggleMute() {
    const el = playerRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  return (
    <section className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>
      <div className="grid md:grid-cols-2">

        {/* Left: video */}
        <motion.div
          className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] flex flex-col"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Player */}
          <div className="relative aspect-[4/3] bg-[#221c14] overflow-hidden">
            <MuxPlayer
              ref={playerRef}
              playbackId={video.playbackId}
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
              } as React.CSSProperties}
            />
          </div>

          {/* Controls bar */}
          <div className="border-t-2 border-[#221c14] px-5 md:px-8 py-4 flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14] hover:opacity-50 transition-opacity cursor-pointer flex items-center gap-2"
            >
              {playing ? (
                <>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <rect x="0" y="0" width="3" height="12" /><rect x="7" y="0" width="3" height="12" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,3 20,12 6,21" />
                  </svg>
                  Play
                </>
              )}
            </button>
            <div className="flex items-center gap-5">
              {label && (
                <span className="text-[#221c14]/40 font-bold text-[12px] tracking-[1px] hidden md:block truncate max-w-[180px]">
                  {label}
                </span>
              )}
              <button
                onClick={toggleMute}
                className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14] hover:opacity-50 transition-opacity cursor-pointer"
              >
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          className="px-5 md:px-10 py-12 md:py-16 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div>
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h2
              className="text-[#221c14] font-extrabold leading-[1.1em] mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              {t("heading")}
            </h2>
            <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] max-w-[480px]">
              {t("body")}
            </p>
          </div>

          <div className="mt-10">
            <a
              href="/book"
              className="inline-block border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
            >
              {t("cta")}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
