"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    id: "tattoo",
    num: "01",
    heading: "Tattoo",
    body: "Every tattoo begins with a conversation. We create custom designs tailored to your skin, style, and story — from delicate fine-line work to bold traditional pieces. No flash, no shortcuts.",
  },
  {
    id: "linocuts",
    num: "02",
    heading: "Linocuts & Prints",
    body: "Linocuts are hand-carved relief prints — a centuries-old medium with a distinctly tactile result. We create limited edition prints, artist editions, and bespoke commissions.",
  },
  {
    id: "workshops",
    num: "03",
    heading: "Creative Workshops",
    body: "Open workshops for beginners and experienced artists alike. Learn linocut printing, tattoo drawing, or spend an afternoon making something with your hands.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>
      {SERVICES.map((svc, i) => (
        <motion.div
          key={svc.id}
          className="border-b-2 border-[#221c14] last:border-b-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.05 }}
        >
          <div className="grid md:grid-cols-[1fr_2fr] items-start px-5 md:px-10 py-12 md:py-16 gap-8 md:gap-16">

            {/* Left: number + heading */}
            <div>
              <p className="text-[#221c14]/40 font-bold text-[13px] tracking-[3px] uppercase mb-3">{svc.num}</p>
              <h2
                className="text-[#221c14] font-extrabold leading-[1.1em]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                {svc.heading}
              </h2>
            </div>

            {/* Right: body + CTA */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] max-w-[560px]">
                {svc.body}
              </p>
              <a
                href="/book"
                className="flex-shrink-0 self-start md:self-auto border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              >
                Book now
              </a>
            </div>

          </div>
        </motion.div>
      ))}
    </section>
  );
}
