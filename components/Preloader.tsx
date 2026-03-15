"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#e5e4d2" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Wordmark */}
          <div className="overflow-hidden">
            <motion.span
              className="block text-[#221c14] text-3xl md:text-5xl font-bold tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Switzer', Helvetica, Arial, sans-serif" }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            >
              PUBLIKACIJA
            </motion.span>
          </div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-[#221c14]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
