import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Gift Vouchers — Publikacija",
    description: "Give the gift of art. Publikacija gift vouchers are valid for tattoos, prints, and workshops.",
  };
}

type VoucherData = { amount: string; label: string; description: string; ideal: string[] };
type StepData   = { step: string; title: string; body: string };

export default async function GiftVouchersPage() {
  const t = await getTranslations("giftVouchers");
  const vouchers = t.raw("vouchers") as VoucherData[];
  const steps    = t.raw("steps")    as StepData[];

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: 72 }}>
        <BackToHome />

        {/* Page header */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10 md:py-16">
          <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {t("heading")}
          </h1>
          <p className="text-[#221c14] font-bold text-[18px] leading-[1.65em] max-w-[560px]">
            {t("intro")}
          </p>
        </div>

        {/* Voucher tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-b-2 border-[#221c14]">
          {vouchers.map((v, i) => (
            <div
              key={v.amount}
              className="border-b-2 md:border-b-0 border-r-0 lg:border-r-2 border-[#221c14] last:border-r-0 px-5 md:px-10 py-12 md:py-14 flex flex-col"
            >
              <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mb-3">
                {v.label}
              </p>
              <p
                className="text-[#221c14] font-extrabold leading-none mb-6"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}
              >
                {v.amount}
              </p>
              <p className="text-[#221c14] font-bold text-[16px] leading-[1.65em] mb-6 flex-1">
                {v.description}
              </p>
              <ul className="space-y-2 mb-8">
                {v.ideal.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#221c14]/60 font-bold text-[13px]">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[#221c14]/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/book"
                className="self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              >
                {t("getVoucher")}
              </Link>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="border-b-2 border-[#221c14]">
          <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">
              {t("howItWorks")}
            </p>
          </div>
          <div className="grid md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] last:border-r-0 last:border-b-0 px-5 md:px-10 py-12 md:py-16"
              >
                <p className="text-[#221c14]/15 font-extrabold leading-none mb-6"
                  style={{ fontSize: "clamp(4rem, 8vw, 6rem)" }}>
                  {s.step}
                </p>
                <p className="text-[#221c14] font-extrabold text-[20px] leading-[1.2em] mb-3">
                  {s.title}
                </p>
                <p className="text-[#221c14]/70 font-bold text-[16px] leading-[1.65em]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="grid md:grid-cols-2">
          <div className="border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-[#221c14] px-5 md:px-10 py-12 md:py-16">
            <h2
              className="text-[#221c14] font-extrabold leading-[1.1em] mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
            >
              {t("readyHeading")}
            </h2>
            <p className="text-[#221c14]/70 font-bold text-[17px] leading-[1.65em]">
              {t("readyBody")}
            </p>
          </div>
          <div className="px-5 md:px-10 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center gap-4">
            <Link
              href="/book"
              className="border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
            >
              {t("orderVoucher")}
            </Link>
            <a
              href="mailto:info@publikacija.lt"
              className="border-2 border-[#221c14]/30 text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-8 py-4 hover:border-[#221c14] transition-colors duration-200"
            >
              {t("emailUs")}
            </a>
          </div>
        </div>

      </main>
      <FooterWrapper />
    </>
  );
}
