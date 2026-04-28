"use client";

import { useTranslations } from "next-intl";

interface Props {
  items?: string[] | null;
}

export default function MarqueeText({ items }: Props) {
  const t = useTranslations("marquee");
  const fallback = t.raw("items") as string[];
  const list = items && items.length > 0 ? items : fallback;

  return (
    <section
      className="border-b-2 border-[#221c14] px-5 md:px-10 py-4 select-none"
      style={{ backgroundColor: "#e5e4d2" }}
    >
      <p className="text-[#221c14]/40 font-bold text-[11px] tracking-[2px] uppercase leading-relaxed">
        {list.join(" / ")}
      </p>
    </section>
  );
}
