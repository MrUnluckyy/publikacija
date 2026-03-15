"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>

      {/* Section header */}
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
        <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">Registracija</p>
        <h2
          className="text-[#221c14] font-extrabold leading-[1.1em]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          Get in touch
        </h2>
      </div>

      <div className="grid md:grid-cols-2">

        {/* Left: booking */}
        <motion.div
          className="px-5 md:px-10 py-12 md:py-16 border-b-2 md:border-b-0 md:border-r-2 border-[#221c14]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h3
            className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
          >
            Book a session
          </h3>
          <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] mb-8 max-w-[400px]">
            Ready to start your project? Reach out to discuss your idea.
            Free consultations for tattoos, prints, and workshops.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/book"
              className="inline-block w-fit border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-7 py-3.5 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
            >
              Send a message
            </a>
            <p className="text-[#221c14]/60 font-bold text-[13px]">
              info@publikacija.lt · We reply within 24 h
            </p>
          </div>
        </motion.div>

        {/* Right: studio details */}
        <motion.div
          className="px-5 md:px-10 py-12 md:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <h3
            className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
          >
            Find us
          </h3>
          <div className="space-y-6 text-[#221c14]">
            <div>
              <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-1">Studio</p>
              <p className="font-bold text-[18px] leading-[1.65em]">Radio Lofts</p>
              <p className="font-bold text-[18px] leading-[1.65em]">Kauno g. 30, Vilnius LT-03202</p>
            </div>
            <div>
              <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-1">Hours</p>
              <p className="font-bold text-[18px] leading-[1.65em]">Mon – Sat, 10:00 – 19:00</p>
            </div>
            <div>
              <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-1">Social</p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[18px] border-b-2 border-[#221c14]/30 hover:border-[#221c14] transition-colors pb-0.5"
              >
                @publikacija
              </a>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-8 aspect-[16/9] border-2 border-[#221c14]/20 relative overflow-hidden bg-[#d5d4c2]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#221c14]/40 font-bold text-[12px] tracking-widest uppercase">
                Kauno g. 30, Vilnius
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
