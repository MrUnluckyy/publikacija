import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gift Vouchers — Publikacija",
  description: "Give the gift of art. Publikacija gift vouchers are valid for tattoos, prints, and workshops.",
};

const VOUCHERS = [
  {
    amount: "€50",
    label: "Starter",
    description: "Perfect for a linocut print, workshop session, or contribution toward a small tattoo.",
    ideal: ["Linocut print", "Workshop entry", "Small tattoo deposit"],
  },
  {
    amount: "€100",
    label: "Studio",
    description: "A solid contribution toward a custom tattoo or a full workshop series.",
    ideal: ["Medium tattoo", "Workshop series", "Print commission"],
  },
  {
    amount: "€200",
    label: "Signature",
    description: "Cover a full custom tattoo session or a bespoke print project from start to finish.",
    ideal: ["Full tattoo session", "Bespoke print project", "Multiple visits"],
  },
  {
    amount: "Custom",
    label: "Custom amount",
    description: "Have a specific budget in mind? We can create a voucher for any amount you choose.",
    ideal: ["Any amount", "Any service", "Any occasion"],
  },
];

export default function GiftVouchersPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: 72 }}>

        {/* ── Hero ── */}
        <div className="border-b border-[#221c14]/10 py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8">
            <p className="text-[#585858] text-[13px] tracking-[3px] uppercase mb-4">Dovanų kuponai</p>
            <h1
              className="text-[#221c14] font-medium leading-[1.2em] mb-4"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Gift Vouchers
            </h1>
            <div className="w-16 h-[4px] bg-[#221c14] mb-8" />
            <p className="text-[#221c14] text-[17px] leading-[1.7em] max-w-[540px]">
              Give someone the gift of a truly personal experience — a custom tattoo,
              a linocut print, or an afternoon workshop in the heart of Vilnius.
              Vouchers never expire.
            </p>
          </div>
        </div>

        {/* ── Voucher tiers ── */}
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {VOUCHERS.map((v) => (
              <div
                key={v.amount}
                className="border border-[#221c14]/15 p-8 flex flex-col hover:border-[#221c14]/40 transition-colors duration-300"
              >
                <p className="text-[#585858] text-[11px] tracking-[3px] uppercase mb-2">{v.label}</p>
                <p
                  className="text-[#221c14] font-medium mb-4 leading-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                >
                  {v.amount}
                </p>
                <div className="w-8 h-[3px] bg-[#221c14] mb-5" />
                <p className="text-[#221c14] text-[14px] leading-[1.7em] mb-6 flex-1">
                  {v.description}
                </p>
                <ul className="space-y-1.5 mb-8">
                  {v.ideal.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[#585858] text-[12px] tracking-[1px]">
                      <span className="w-1 h-1 rounded-full bg-[#585858] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className="self-start border border-[#221c14] text-[#221c14] text-[12px] tracking-[3px] uppercase px-5 py-2.5 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-300"
                >
                  Get this voucher
                </Link>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="border-t border-[#221c14]/10 pt-16">
            <p className="text-[#585858] text-[13px] tracking-[3px] uppercase mb-6">How it works</p>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { step: "01", title: "Choose an amount", body: "Pick one of the tiers above or request a custom amount." },
                { step: "02", title: "We send the voucher", body: "A beautifully designed digital voucher arrives by email, ready to gift." },
                { step: "03", title: "Recipient books in", body: "They choose a service and date — we take care of the rest." },
              ].map((s) => (
                <div key={s.step}>
                  <p className="text-[#221c14]/20 text-[3rem] font-bold leading-none mb-4">{s.step}</p>
                  <p className="text-[#221c14] font-medium text-[17px] mb-2">{s.title}</p>
                  <p className="text-[#585858] text-[15px] leading-[1.7em]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div className="border-t border-[#221c14]/10 py-16 md:py-20">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2
                className="text-[#221c14] font-medium leading-[1.3em] mb-2"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
              >
                Ready to give a perfect gift?
              </h2>
              <p className="text-[#585858] text-[15px]">Contact us and we&apos;ll arrange everything.</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/book"
                className="border border-[#221c14] text-[#221c14] text-[14px] tracking-[3px] px-7 py-3.5 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-300"
              >
                Order a voucher
              </Link>
              <a
                href="mailto:info@publikacija.lt"
                className="text-[#221c14] text-[14px] tracking-[3px] px-7 py-3.5 border border-[#221c14]/25 hover:border-[#221c14] transition-colors duration-300"
              >
                Email us
              </a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
