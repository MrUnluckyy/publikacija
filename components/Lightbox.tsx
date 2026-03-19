"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ images, index, onClose, onNext, onPrev }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNext, onPrev]);

  const img = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {index !== null && img && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(34,28,20,0.95)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            key={index}
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#e5e4d2] font-bold text-[13px] tracking-[2px] uppercase hover:opacity-60 transition-opacity cursor-pointer"
          >
            ✕ Close
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#e5e4d2] font-bold text-2xl hover:opacity-60 transition-opacity px-3 py-4 cursor-pointer"
            >
              ←
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#e5e4d2] font-bold text-2xl hover:opacity-60 transition-opacity px-3 py-4 cursor-pointer"
            >
              →
            </button>
          )}

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#e5e4d2]/50 font-bold text-[12px] tracking-[2px]">
            {index + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
