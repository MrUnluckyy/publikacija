"use client";

import { useState, useEffect } from "react";

const SESSION_KEY = "announcement:dismissed";
const BAR_HEIGHT = "36px";

interface Props {
  items: string[];
}

export default function AnnouncementBarBanner({ items }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setVisible(true);
    } else {
      // Already dismissed this session — clear the server-injected CSS var
      document.documentElement.style.setProperty("--bar-h", "0px");
    }
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.style.setProperty("--bar-h", "0px");
  }

  if (!visible) return null;

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[35] flex items-center overflow-hidden"
      style={{ height: BAR_HEIGHT, backgroundColor: "#221c14" }}
    >
      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden select-none">
        <div className="announcement-marquee flex items-center w-max">
          {doubled.map((item, i) => (
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

      {/* Dismiss button */}
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
