"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function dispatchReady() {
  window.dispatchEvent(new CustomEvent("preloader:done"));
}

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("preloader:shown")) {
      dispatchReady();
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const video = videoRef.current;
    if (!video) return;

    const dismiss = () => {
      sessionStorage.setItem("preloader:shown", "1");
      setVisible(false);
      dispatchReady();
    };

    video.addEventListener("ended", dismiss);
    video.addEventListener("error", dismiss);
    const fallback = setTimeout(dismiss, 2500);
    video.play().catch(dismiss);

    return () => {
      video.removeEventListener("ended", dismiss);
      video.removeEventListener("error", dismiss);
      clearTimeout(fallback);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "#e5e4d2" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <video
            ref={videoRef}
            src="/assets/intro1.mp4"
            autoPlay
            muted
            playsInline
            className="w-[85%] md:w-[55%] max-w-[640px] h-auto object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
