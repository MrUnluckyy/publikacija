"use client";

import { useTranslations } from "next-intl";
import type { ServiceData } from "@/sanity/types";
import Link from "next/link";

type LinocutCta = { text?: string | null; label?: string | null; url?: string | null };

export default function Services({
  items,
  linocutCta,
}: {
  items?: ServiceData[] | null;
  linocutCta?: LinocutCta;
}) {
  const t = useTranslations("services");
  const tl = useTranslations("linocut");

  const FALLBACK = [
    {
      id: "tattoo",
      heading: t("title1"),
      body: t("body1"),
      ctaLabel: null as string | null,
    },
    {
      id: "linocuts",
      heading: t("title2"),
      body: t("body2"),
      ctaLabel: null as string | null,
    },
    {
      id: "workshops",
      heading: t("title3"),
      body: t("body3"),
      ctaLabel: null as string | null,
    },
  ];

  const services =
    items && items.length > 0
      ? items.map((s) => ({
          id: s._id,
          heading: s.title ?? "",
          body: s.description ?? "",
          ctaLabel: s.ctaLabel ?? null,
        }))
      : FALLBACK;

  const ctaFallback = t("cta");

  return (
    <section
      id="services"
      className="border-b-2 border-[#221c14] bg-[#221c14] md:bg-[#e5e4d2]"
    >
      {services.map((svc) => (
        <div
          key={svc.id}
          className="border-b-2 border-[#e5e4d2]/20 md:border-[#221c14] last:border-b-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: heading */}
            <div className="border-[#e5e4d2]/20 md:border-b-0 md:border-r-2 md:border-[#221c14] px-5 md:px-10 py-10 md:py-16 flex items-center">
              <h2 className="text-title text-[#e5e4d2] md:text-[#221c14]">
                {svc.heading}
              </h2>
            </div>

            {/* Right: body + CTA */}
            <div className="px-5 md:px-10 pt-0 md:pt-3 pb-10 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <p className="text-body text-[#e5e4d2] md:text-[#221c14] max-w-120">
                {svc.body}
              </p>
              <Link
                href="/book"
                className="shrink-0 self-start border-2 border-[#e5e4d2] text-[#e5e4d2] md:border-[#221c14] md:text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#e5e4d2] hover:text-[#221c14] md:hover:bg-[#221c14] md:hover:text-[#e5e4d2] transition-colors duration-200"
              >
                {svc.ctaLabel ?? ctaFallback}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Linocut explainer CTA — separated by the last service's bottom border */}
      <div className="px-5 md:px-10 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-body text-[#e5e4d2] md:text-[#221c14]">
          {linocutCta?.text ?? tl("homeCtaText")}
        </p>
        <Link
          href={linocutCta?.url || "/linocut"}
          className="shrink-0 self-start border-2 border-[#e5e4d2] text-[#e5e4d2] md:border-[#221c14] md:text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#e5e4d2] hover:text-[#221c14] md:hover:bg-[#221c14] md:hover:text-[#e5e4d2] transition-colors duration-200"
        >
          {linocutCta?.label ?? tl("homeCtaButton")}
        </Link>
      </div>
    </section>
  );
}
