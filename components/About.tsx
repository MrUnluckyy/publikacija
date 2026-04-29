"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "next-sanity";
import type { AboutData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_STATS = [
  { value: "500+", label: "Tattoos" },
  { value: "200+", label: "Print Projects" },
  { value: "5 ★", label: "Average Rating" },
];

const DEFAULT_BODY = [
  "We are Publikacija — a Vilnius-based studio where tattoo artistry meets print craftsmanship. Founded on the belief that every mark matters, whether it's permanent ink on skin or ink on paper.",
  "Our small team of dedicated artists shares a passion for detail, precision, and intentional design. We work closely with every client to create pieces that feel personal, considered, and enduring.",
  "Walk-ins are welcome, but consultations ensure the best results. Reach us any time to start a conversation.",
];

// ─── Portrait ─────────────────────────────────────────────────────────────────

function StudioPortrait({ portrait }: { portrait: AboutData["portrait"] }) {
  if (portrait) {
    return (
      <div className="aspect-[4/5] relative overflow-hidden">
        <Image
          src={urlFor(portrait).width(800).height(1000).auto("format").url()}
          alt="Publikacija Studio"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
    );
  }

  // Placeholder
  return (
    <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-[#1c1810] to-[#2d2520]">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg viewBox="0 0 200 250" className="w-3/4 h-3/4" fill="none" stroke="white" strokeWidth="0.4">
          <rect x="40" y="20" width="120" height="210" />
          <circle cx="100" cy="80" r="35" />
          <line x1="40" y1="140" x2="160" y2="140" />
          {[60, 80, 100, 120, 140].map((x) => (
            <line key={x} x1={x} y1="140" x2={x} y2="230" />
          ))}
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-5">
        <p className="text-white/30 text-[11px] tracking-[0.3em] uppercase">Studio · Vilnius</p>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function About({ data }: { data?: AboutData | null }) {
  const heading = data?.heading ?? "Art in";
  const accentWord = data?.accentWord ?? "every";
  const stats = data?.stats?.length ? data.stats : DEFAULT_STATS;
  const established = data?.established ?? "2019";

  return (
    <section id="about" className="bg-[#e5e4d2] border-b-2 border-[#221c14] py-20 md:py-32 overflow-hidden">
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Text */}
          <div>
            <motion.p
              className="text-[12px] tracking-[0.4em] uppercase text-[#7a7060] mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About the Studio
            </motion.p>

            <div className="overflow-hidden mb-8">
              <motion.h2
                className="text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#0f0e0c] leading-[0.88]"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              >
                {heading}
                <br />
                <span className="italic text-[#a09888]">
                  {accentWord}
                </span>
                <br />
                detail.
              </motion.h2>
            </div>

            <motion.div
              className="space-y-4 text-[#0f0e0c]/65 text-[17px] leading-relaxed mb-10"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              {data?.body ? (
                <PortableText value={data.body} />
              ) : (
                DEFAULT_BODY.map((p, i) => <p key={i}>{p}</p>)
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8 border-t border-[#0f0e0c]/10"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.25 }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold text-[#0f0e0c] leading-none mb-1">
                    {s.value}
                  </div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-[#7a7060]">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          >
            <StudioPortrait portrait={data?.portrait ?? null} />

            <div className="absolute -bottom-5 -left-5 w-28 h-28 border border-[#c8b89a]/30 bg-[#c8b89a]/8 pointer-events-none" />

            <div className="absolute -top-4 -right-4 md:top-8 md:-right-8 bg-[#0f0e0c] text-white px-4 py-3">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#c8b89a]">Est.</p>
              <p className="text-lg font-bold leading-none">{established}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
