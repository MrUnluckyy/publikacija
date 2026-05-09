"use client";

import { useState, useEffect, useRef } from "react";

const SESSION_KEY = "announcement:dismissed";
const BAR_HEIGHT = "36px";

interface Props {
  barType: "marquee" | "cta";
  // marquee
  items?: string[];
  // cta
  ctaMessage?: string | null;
  ctaLinkLabel?: string | null;
  ctaLinkHref?: string | null;
}

export default function AnnouncementBarBanner({
  barType,
  items = [],
  ctaMessage,
  ctaLinkLabel,
  ctaLinkHref,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setVisible(true);
    } else {
      document.documentElement.style.setProperty("--bar-h", "0px");
    }
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.style.setProperty("--bar-h", "0px");
  }

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[35] flex items-center overflow-hidden"
      style={{ height: BAR_HEIGHT, backgroundColor: "#221c14" }}
    >
      {barType === "cta" ? (
        <CtaBar
          message={ctaMessage}
          linkLabel={ctaLinkLabel}
          linkHref={ctaLinkHref}
        />
      ) : (
        <MarqueeBar items={items} />
      )}

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Close announcement"
        className="flex-none px-4 h-full flex items-center text-[#e5e4d2]/35 hover:text-[#e5e4d2] transition-colors duration-150 text-[18px] leading-none cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}

// ── Marquee variant ─────────────────────────────────────────────────────────

const MARQUEE_SPEED = 55; // px per second — change this to tune speed

function MarqueeBar({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Repeat items enough times so the content always overflows any viewport,
  // then duplicate so translateX(-50%) loops seamlessly.
  const repeated = Array(10).fill(items).flat() as string[];
  const track = [...repeated, ...repeated];

  // Set duration based on actual pixel width so speed is constant
  // regardless of how many items the client has added.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // scrollWidth = full track; half = what -50% translates over
    const duration = (el.scrollWidth / 2) / MARQUEE_SPEED;
    el.style.animationDuration = `${duration}s`;
  }, [items]);

  return (
    <div className="flex-1 overflow-hidden select-none">
      <div ref={trackRef} className="announcement-marquee flex items-center w-max">
        {track.map((item, i) => (
          <span
            key={i}
            className="text-[#e5e4d2]/60 font-bold text-[11px] tracking-[3px] uppercase whitespace-nowrap"
          >
            {item}
            <span className="text-[#e5e4d2]/20 mx-5">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── CTA variant ─────────────────────────────────────────────────────────────

function CtaBar({
  message,
  linkLabel,
  linkHref,
}: {
  message?: string | null;
  linkLabel?: string | null;
  linkHref?: string | null;
}) {
  return (
    <div className="flex-1 flex items-center justify-center gap-4 px-4">
      {message && (
        <span className="text-[#e5e4d2]/70 font-bold text-[11px] tracking-[3px] uppercase whitespace-nowrap">
          {message}
        </span>
      )}
      {linkLabel && linkHref && (
        <a
          href={linkHref}
          className="text-[#e5e4d2] font-bold text-[11px] tracking-[3px] uppercase whitespace-nowrap border-b border-[#e5e4d2]/40 hover:border-[#e5e4d2] transition-colors duration-150"
        >
          {linkLabel} →
        </a>
      )}
    </div>
  );
}
