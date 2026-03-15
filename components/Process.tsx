"use client";

import { motion } from "framer-motion";

const tattooSteps = [
  {
    step: "01",
    title: "Consultation",
    desc: "We discuss your vision, placement, size, and style. Every great tattoo begins with a real conversation.",
  },
  {
    step: "02",
    title: "Custom Design",
    desc: "Your artist creates artwork tailored specifically for your body — no flash, no copy-paste.",
  },
  {
    step: "03",
    title: "The Session",
    desc: "The tattooing itself, in our clean and comfortable studio. We work at your pace.",
  },
  {
    step: "04",
    title: "Aftercare",
    desc: "Detailed healing guidance and follow-up support to ensure lasting, vibrant results.",
  },
];

const printSteps = [
  {
    step: "01",
    title: "Brief",
    desc: "Share your project details — format, quantity, timeline, and any creative references you love.",
  },
  {
    step: "02",
    title: "File Prep",
    desc: "We review your files and prepare them for production, with guidance on print-ready specs.",
  },
  {
    step: "03",
    title: "Production",
    desc: "High-quality printing on carefully selected materials using professional-grade equipment.",
  },
  {
    step: "04",
    title: "Delivery",
    desc: "Carefully packaged and shipped, or ready for studio pickup at our Vilnius location.",
  },
];

function ProcessColumn({
  label,
  steps,
  delay,
}: {
  label: string;
  steps: typeof tattooSteps;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {/* Column label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-6 h-[1px] bg-[#0f0e0c]/25" />
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#7a7060]">{label}</p>
      </div>

      <div>
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="group flex gap-5 py-5 border-b border-[#0f0e0c]/8 last:border-0"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: delay + i * 0.07 }}
          >
            <span className="text-[10px] text-[#a09888] mt-0.5 w-5 flex-none font-mono">
              {s.step}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-[#0f0e0c] mb-1.5 group-hover:text-[#7a7060] transition-colors duration-200">
                {s.title}
              </h4>
              <p className="text-sm text-[#0f0e0c]/55 leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Process() {
  return (
    <section className="bg-[#f4f3ea] py-20 md:py-32">
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a7060] mb-3">
              How It Works
            </p>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#0f0e0c] leading-[0.88]">
              The Process.
            </h2>
          </motion.div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <ProcessColumn label="Tattoo Journey" steps={tattooSteps} delay={0} />
            <ProcessColumn label="Print Services" steps={printSteps} delay={0.12} />
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 pt-12 border-t border-[#0f0e0c]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-sm text-[#0f0e0c]/50 max-w-xs leading-relaxed">
              Every project is unique. If you have questions about either service, we&apos;re always happy to chat.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-[#0f0e0c] border-b border-[#0f0e0c]/30 pb-1 hover:gap-5 transition-all duration-300"
            >
              Get in Touch
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
