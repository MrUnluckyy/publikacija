"use client";

const ITEMS = [
  "Tattoos in Vilnius",
  "Traditional Tattoos",
  "Abstract Tattoos",
  "Realistic Tattoos",
  "Gift Vouchers",
  "Free Consultations",
  "Linocuts",
];

const ALL = [...ITEMS, ...ITEMS];

export default function MarqueeText() {
  return (
    <section
      className="border-b-2 border-[#221c14] overflow-hidden py-5 select-none"
      style={{ backgroundColor: "#e5e4d2" }}
    >
      <div className="flex w-max marquee-left">
        {ALL.map((text, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap text-[#221c14] font-extrabold leading-none px-8"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            {text}
            <span className="ml-8 text-[#221c14]/30 font-bold">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
