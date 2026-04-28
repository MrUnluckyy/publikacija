"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Link } from "@/i18n/navigation";

// The 6 PNGs stack together layer by layer as you scroll.
// The JPG is the final result — it fades in over the accumulated layers.
const LAYERS = [
  { src: "/parallax/IMG_0690.PNG", label: "The Sketch",    step: "01" },
  { src: "/parallax/IMG_0691.PNG", label: "The Transfer",  step: "02" },
  { src: "/parallax/IMG_0692.PNG", label: "The Outline",   step: "03" },
  { src: "/parallax/IMG_0693.PNG", label: "The Shading",   step: "04" },
  { src: "/parallax/IMG_0694.PNG", label: "The Detail",    step: "05" },
  { src: "/parallax/IMG_0695.PNG", label: "The Depth",     step: "06" },
];
const RESULT = { src: "/parallax/IMG_9043.jpg", label: "The Result", step: "07" };

// Each PNG fades in at this scroll progress and stays visible
const FADE_POINTS = [0.02, 0.14, 0.26, 0.38, 0.50, 0.62];
// JPG fades in at this point
const RESULT_IN  = 0.77;
const RESULT_PEAK = 0.91;

// ─── Single stacked layer (PNG) ───────────────────────────────────────────────
function PngLayer({
  scrollYProgress,
  src,
  fadeIn,
  parallaxFactor, // 0 = no movement, 1 = most movement
}: {
  scrollYProgress: MotionValue<number>;
  src: string;
  fadeIn: number;
  parallaxFactor: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, fadeIn + 0.1],
    [0, 1]
  );
  // Subtle parallax: each layer drifts at a slightly different speed
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallaxFactor * 6}%`, `${-parallaxFactor * 6}%`]
  );

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
}

// ─── Step label (slides in when its layer appears) ────────────────────────────
function StepLabel({
  scrollYProgress,
  step,
  label,
  fadeIn,
  fadeOut,
}: {
  scrollYProgress: MotionValue<number>;
  step: string;
  label: string;
  fadeIn: number;
  fadeOut: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, fadeIn + 0.08, fadeOut - 0.06, fadeOut],
    [0, 1, 1, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [fadeIn, fadeIn + 0.08],
    ["16px", "0px"]
  );
  return (
    <motion.div
      style={{ opacity, x }}
      className="pointer-events-none"
    >
      <p className="text-[#e5e4d2]/35 font-bold text-[11px] tracking-[5px] uppercase mb-1">
        {step} / 07
      </p>
      <p className="text-[#e5e4d2] font-extrabold text-[15px] tracking-[3px] uppercase">
        {label}
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef     = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: introScroll } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });

  // Intro fades out as you scroll into the sticky section
  const introOpacity = useTransform(introScroll, [0, 0.7], [1, 0]);
  const introY       = useTransform(introScroll, [0, 1], ["0%", "-12%"]);

  // Progress bar
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Result JPG
  const resultOpacity = useTransform(
    scrollYProgress,
    [RESULT_IN, RESULT_PEAK],
    [0, 1]
  );
  const resultScale = useTransform(
    scrollYProgress,
    [RESULT_IN, RESULT_PEAK],
    [1.06, 1.0]
  );

  // Result label
  const resultLabelOpacity = useTransform(
    scrollYProgress,
    [RESULT_IN + 0.06, RESULT_PEAK],
    [0, 1]
  );
  const resultLabelX = useTransform(
    scrollYProgress,
    [RESULT_IN + 0.06, RESULT_PEAK],
    ["16px", "0px"]
  );

  // Backdrop behind PNG layers (fades in at start, fades out during result reveal to show the JPG clean)
  const backdropOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, RESULT_IN, RESULT_PEAK],
    [0, 1, 1, 0]
  );

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#221c14" }}>

        {/* ── Intro ── */}
        <motion.section
          ref={introRef}
          style={{ opacity: introOpacity, y: introY, height: "100vh" }}
          className="relative flex flex-col justify-end px-6 md:px-16"
        >
          <div style={{ paddingTop: 88, paddingBottom: 72 }}>
            <p className="text-[#e5e4d2]/35 font-bold text-[11px] tracking-[5px] uppercase mb-5">
              Publikacija · Vilnius
            </p>
            <h1
              className="text-[#e5e4d2] font-extrabold leading-[1.0em] mb-8"
              style={{ fontSize: "clamp(4rem, 11vw, 9rem)" }}
            >
              The<br />Process
            </h1>
            <p className="text-[#e5e4d2]/45 font-bold text-[17px] leading-[1.65em] mb-14 max-w-[440px]">
              Watch a tattoo come to life, layer by layer.
            </p>
            <div className="flex items-center gap-4 text-[#e5e4d2]/30">
              <div
                className="relative w-px h-14 overflow-hidden"
                style={{ background: "rgba(229,228,210,0.1)" }}
              >
                <motion.div
                  className="absolute left-0 w-full"
                  style={{ background: "rgba(229,228,210,0.45)", height: "50%" }}
                  animate={{ top: ["-50%", "150%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <span className="font-bold text-[11px] tracking-[4px] uppercase">Scroll</span>
            </div>
          </div>
        </motion.section>

        {/* ── Sticky section ── */}
        {/* 700vh: comfortable scroll pace, ~1 PNG per 100vh, result at ~540vh */}
        <div ref={containerRef} style={{ height: "700vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

            {/* ── Image composition (all layers stacked) ── */}
            <div className="relative w-full h-full">

              {/* Dark skin-tone backdrop that disappears for the result photo */}
              <motion.div
                style={{ opacity: backdropOpacity }}
                className="absolute inset-0"
                // neutral warm dark bg so PNG layers read well
              />

              {/* PNG layers — stack on top of each other, each fades in and stays */}
              {LAYERS.map((layer, i) => (
                <PngLayer
                  key={layer.step}
                  scrollYProgress={scrollYProgress}
                  src={layer.src}
                  fadeIn={FADE_POINTS[i]}
                  parallaxFactor={(i + 1) * 0.25}
                />
              ))}

              {/* Result JPG — fades in over everything */}
              <motion.div
                style={{ opacity: resultOpacity, scale: resultScale }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={RESULT.src}
                  alt="The Result"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Subtle vignette on the result photo */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(34,28,20,0.5) 100%)",
                  }}
                />
              </motion.div>

            </div>

            {/* ── Step labels (bottom-left) ── */}
            <div className="absolute bottom-10 md:bottom-14 left-6 md:left-12 flex flex-col gap-1">
              {LAYERS.map((layer, i) => (
                <StepLabel
                  key={layer.step}
                  scrollYProgress={scrollYProgress}
                  step={layer.step}
                  label={layer.label}
                  fadeIn={FADE_POINTS[i]}
                  fadeOut={i < LAYERS.length - 1 ? FADE_POINTS[i + 1] + 0.12 : RESULT_IN}
                />
              ))}
              {/* Result label */}
              <motion.div
                style={{ opacity: resultLabelOpacity, x: resultLabelX }}
                className="pointer-events-none"
              >
                <p className="text-[#e5e4d2]/35 font-bold text-[11px] tracking-[5px] uppercase mb-1">
                  07 / 07
                </p>
                <p className="text-[#e5e4d2] font-extrabold text-[15px] tracking-[3px] uppercase">
                  {RESULT.label}
                </p>
              </motion.div>
            </div>

            {/* ── Vertical progress line ── */}
            <div
              className="absolute right-5 md:right-8 top-1/4 bottom-1/4 w-px overflow-hidden"
              style={{ background: "rgba(229,228,210,0.07)" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full origin-top"
                style={{
                  scaleY: progressScaleY,
                  height: "100%",
                  background: "rgba(229,228,210,0.35)",
                }}
              />
            </div>

            {/* ── Step dots ── */}
            <div className="absolute right-3.5 md:right-6.5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {[...LAYERS, RESULT].map((_, i) => {
                const fadeIn  = i < LAYERS.length ? FADE_POINTS[i] : RESULT_IN;
                const fadeOut = i < LAYERS.length
                  ? (i < LAYERS.length - 1 ? FADE_POINTS[i + 1] + 0.15 : RESULT_IN)
                  : 1.0;
                return (
                  <StepDot
                    key={i}
                    scrollYProgress={scrollYProgress}
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
                  />
                );
              })}
            </div>

          </div>
        </div>

        {/* ── Outro / CTA ── */}
        <section
          className="px-6 md:px-16 py-24 md:py-36 flex flex-col md:flex-row md:items-end md:justify-between gap-12"
          style={{ borderTop: "1px solid rgba(229,228,210,0.1)" }}
        >
          <div>
            <p className="text-[#e5e4d2]/30 font-bold text-[11px] tracking-[5px] uppercase mb-5">
              Ready?
            </p>
            <h2
              className="text-[#e5e4d2] font-extrabold leading-[1.0em]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              Begin your<br />own story.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-block border-2 border-[#e5e4d2] text-[#e5e4d2] font-bold text-[13px] tracking-[3px] uppercase px-8 py-4 hover:bg-[#e5e4d2] hover:text-[#221c14] transition-colors duration-200"
            >
              Book a consultation
            </Link>
            <Link
              href="/"
              className="inline-block border-2 border-[#e5e4d2]/20 text-[#e5e4d2]/40 font-bold text-[13px] tracking-[3px] uppercase px-8 py-4 hover:border-[#e5e4d2]/50 hover:text-[#e5e4d2]/70 transition-colors duration-200"
            >
              ← Home
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}

// ─── Step dot component (hooks must be at component level) ────────────────────
function StepDot({
  scrollYProgress,
  fadeIn,
  fadeOut,
}: {
  scrollYProgress: MotionValue<number>;
  fadeIn: number;
  fadeOut: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, fadeIn - 0.01), fadeIn + 0.08, fadeOut - 0.05, fadeOut],
    [0.15, 1, 1, 0.15]
  );
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, fadeIn - 0.01), fadeIn + 0.08],
    [0.6, 1]
  );
  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-1.5 h-1.5 rounded-full bg-[#e5e4d2]"
    />
  );
}
