"use client";

import { useTranslations } from "next-intl";
import type { ServiceData } from "@/sanity/types";

export default function Services({ items }: { items?: ServiceData[] | null }) {
  const t = useTranslations("services");

  const FALLBACK = [
    { id: "tattoo",    heading: t("title1"), body: t("body1"), ctaLabel: null as string | null },
    { id: "linocuts",  heading: t("title2"), body: t("body2"), ctaLabel: null as string | null },
    { id: "workshops", heading: t("title3"), body: t("body3"), ctaLabel: null as string | null },
  ];

  const services = items && items.length > 0
    ? items.map((s) => ({ id: s._id, heading: s.title ?? "", body: s.description ?? "", ctaLabel: s.ctaLabel ?? null }))
    : FALLBACK;

  const ctaFallback = t("cta");

  return (
    <section id="services" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>
      {services.map((svc, i) => (
        // Border on static wrapper — never disappears during animation
        <div key={svc.id} className="border-b-2 border-[#221c14] last:border-b-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: heading */}
            <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] px-5 md:px-10 py-12 md:py-16 flex items-center">
              <h2
                className="text-[#221c14] font-extrabold leading-[1.1em]"
                style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
              >
                {svc.heading}
              </h2>
            </div>

            {/* Right: body + CTA */}
            <div className="px-5 md:px-10 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <p className="text-[#221c14] font-bold text-[20px] leading-[1.65em] max-w-[480px]">
                {svc.body}
              </p>
              <a
                href="/book"
                className="flex-shrink-0 self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              >
                {svc.ctaLabel ?? ctaFallback}
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
