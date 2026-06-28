"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreloaderLogo from "./PreloaderLogo";

// Time the animated SVG logo is shown before the page is revealed.
const DURATION_MS = 2600;

function dispatchReady() {
  window.dispatchEvent(new CustomEvent("preloader:done"));
}

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloader:shown")) {
      dispatchReady();
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const dismiss = () => {
      sessionStorage.setItem("preloader:shown", "1");
      setVisible(false);
      dispatchReady();
    };

    const timer = setTimeout(dismiss, DURATION_MS);
    return () => clearTimeout(timer);
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
          <PreloaderLogo />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
