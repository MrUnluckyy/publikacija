"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function dispatchReady() {
  window.dispatchEvent(new CustomEvent("preloader:done"));
}

export default function Preloader() {
  // Start visible so the video element is in the DOM when useEffect runs
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Already shown this session — hide immediately and unblock Nav/Hero
    if (sessionStorage.getItem("preloader:shown")) {
      setVisible(false);
      dispatchReady();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const dismiss = () => {
      sessionStorage.setItem("preloader:shown", "1");
      setVisible(false);
      dispatchReady();
    };

    video.addEventListener("ended", dismiss);
    video.addEventListener("error", dismiss);
    const fallback = setTimeout(dismiss, 4000);
    video.play().catch(dismiss);

    return () => {
      video.removeEventListener("ended", dismiss);
      video.removeEventListener("error", dismiss);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <video
            ref={videoRef}
            src="/assets/animacija su fonu.mp4"
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
