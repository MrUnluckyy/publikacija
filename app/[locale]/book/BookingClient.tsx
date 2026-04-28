"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const CalEmbed = dynamic(() => import("./CalEmbed"), { ssr: false });

const CALCOM_LINK = "justas-sobutas-slb4s9";
const LUMA_EVENT_ID = "cejyidc8";

type Service = "tattoo" | "print" | "workshop" | null;

interface Props {
  labels: {
    tattooTitle: string;
    tattooDesc: string;
    printTitle: string;
    printDesc: string;
    workshopTitle: string;
    workshopDesc: string;
    voucherTitle: string;
    voucherDesc: string;
    calHeading: string;
    workshopHeading: string;
    workshopBody: string;
    workshopCta: string;
    back: string;
  };
  voucherHref: string;
}

const SERVICES = (l: Props["labels"]) => [
  {
    id: "tattoo" as Service,
    title: l.tattooTitle,
    desc: l.tattooDesc,
    action: "cal",
    arrow: "→",
  },
  {
    id: "print" as Service,
    title: l.printTitle,
    desc: l.printDesc,
    action: "cal",
    arrow: "→",
  },
  {
    id: "workshop" as Service,
    title: l.workshopTitle,
    desc: l.workshopDesc,
    action: "workshop",
    arrow: "→",
  },
  {
    id: null,
    title: l.voucherTitle,
    desc: l.voucherDesc,
    action: "voucher",
    arrow: "→",
  },
];

export default function BookingClient({ labels, voucherHref }: Props) {
  const [selected, setSelected] = useState<Service>(null);
  const [showEmbed, setShowEmbed] = useState(false);

  const services = SERVICES(labels);

  function handleSelect(svc: typeof services[0]) {
    if (svc.action === "voucher") {
      window.location.href = voucherHref;
      return;
    }
    setSelected(svc.id);
    setShowEmbed(true);
    setTimeout(() => {
      document.getElementById("booking-embed")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleBack() {
    setShowEmbed(false);
    setSelected(null);
    document.getElementById("booking-services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      {/* Service cards */}
      <div id="booking-services" className="grid md:grid-cols-2">
        {services.map((svc, i) => (
          <button
            key={i}
            onClick={() => handleSelect(svc)}
            className={`text-left border-b-2 border-r-0 md:border-r-2 border-[#221c14] last:border-b-0 md:last:border-b-2 px-5 md:px-10 py-10 md:py-14 group transition-colors duration-200 ${
              selected === svc.id && showEmbed
                ? "bg-[#221c14] text-[#e5e4d2]"
                : "hover:bg-[#221c14] hover:text-[#e5e4d2]"
            } [&:nth-child(even)]:md:border-r-0`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className="font-extrabold leading-[1.1em] mb-3"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="font-bold text-[15px] leading-[1.6em] opacity-70 max-w-[320px]">
                  {svc.desc}
                </p>
              </div>
              <span className="text-2xl mt-1 flex-shrink-0 opacity-30 group-hover:opacity-100 transition-opacity">
                {svc.arrow}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Embed area */}
      <AnimatePresence>
        {showEmbed && (
          <motion.div
            id="booking-embed"
            className="border-t-2 border-[#221c14]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Back button + heading */}
            <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-6 flex items-center gap-6">
              <button
                onClick={handleBack}
                className="font-bold text-[14px] tracking-[2px] uppercase text-[#221c14]/50 hover:text-[#221c14] transition-colors flex items-center gap-2"
              >
                ← {labels.back}
              </button>
              <span className="text-[#221c14]/20">|</span>
              <span className="font-extrabold text-[#221c14] text-[18px]">
                {selected === "tattoo" ? labels.tattooTitle : selected === "print" ? labels.printTitle : labels.workshopTitle}
              </span>
            </div>

            {/* Cal.com or Workshop info */}
            {(selected === "tattoo" || selected === "print") ? (
              <div className="px-5 md:px-10 py-8">
                <CalEmbed calLink={CALCOM_LINK} />
              </div>
            ) : selected === "workshop" ? (
              <div className="px-5 md:px-10 py-10">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                  <div>
                    <h3
                      className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
                      style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
                    >
                      {labels.workshopHeading}
                    </h3>
                    <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] mb-8">
                      {labels.workshopBody}
                    </p>
                    <a
                      href={`https://lu.ma/${LUMA_EVENT_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
                    >
                      {labels.workshopCta}
                    </a>
                  </div>
                  <div className="w-full overflow-hidden border-2 border-[#221c14]/20">
                    <iframe
                      src={`https://lu.ma/embed/event/${LUMA_EVENT_ID}/simple`}
                      width="100%"
                      height="600"
                      frameBorder="0"
                      allowFullScreen
                      aria-hidden="false"
                      style={{ display: "block" }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
