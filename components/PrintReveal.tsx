"use client";

import { motion } from "framer-motion";

// Print-press reveal: a dark "roller" sweeps left→right, exposing content
// underneath as if ink is being laid down by a printing press.
export default function PrintReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-10 origin-left"
        style={{ backgroundColor: "#221c14" }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0, delay: delay + 0.12 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
