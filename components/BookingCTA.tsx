"use client";

import { motion } from "framer-motion";

export default function BookingCTA() {
  return (
    <section
      id="contact"
      className="relative bg-[#0f0e0c] py-32 md:py-52 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* Radial warm glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div
          className="w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(200,184,154,0.05) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c8b89a] mb-10">
            Ready to Start?
          </p>

          <h2 className="text-[clamp(3.5rem,9vw,8rem)] font-bold uppercase tracking-tight text-white leading-[0.85] mb-14">
            Let&apos;s make
            <br />
            something
            <br />
            <span
              className="text-[#c8b89a] italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              lasting.
            </span>
          </h2>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="mailto:info@publikacija.lt"
              className="group inline-flex items-center gap-3 bg-[#c8b89a] text-[#0f0e0c] px-10 py-5 text-xs font-bold tracking-[0.22em] uppercase hover:bg-white transition-colors duration-300"
            >
              Book a Consultation
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                →
              </span>
            </a>

            <span className="text-white/20 text-xs hidden sm:block">or</span>

            <a
              href="mailto:info@publikacija.lt"
              className="text-white/45 text-xs tracking-[0.22em] uppercase hover:text-white transition-colors"
            >
              info@publikacija.lt
            </a>
          </div>

          {/* Contact info row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10">
            {[
              { icon: "📍", label: "Vilnius, Lithuania" },
              { icon: "📸", label: "@publikacija" },
              { icon: "⏰", label: "Mon–Sat, 10–19" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-[#c8b89a]/60 text-sm">{icon}</span>
                <span className="text-white/35 text-xs tracking-wider">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-white/20 text-[10px] tracking-[0.25em]">
            Online booking system coming soon — we respond within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
