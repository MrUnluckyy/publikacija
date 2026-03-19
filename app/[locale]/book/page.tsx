import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";
import BookingClient from "./BookingClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Book a Session — Publikacija",
    description: "Book a tattoo consultation, linocut print session, or creative workshop at Publikacija studio in Vilnius.",
  };
}

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("book");

  const labels = {
    tattooTitle: t("tattooTitle"),
    tattooDesc: t("tattooDesc"),
    printTitle: t("printTitle"),
    printDesc: t("printDesc"),
    workshopTitle: t("workshopTitle"),
    workshopDesc: t("workshopDesc"),
    voucherTitle: t("voucherTitle"),
    voucherDesc: t("voucherDesc"),
    calHeading: t("calHeading"),
    workshopHeading: t("workshopHeading"),
    workshopBody: t("workshopBody"),
    workshopCta: t("workshopCta"),
    back: t("back"),
  };

  const voucherHref = locale === "en" ? "/en/gift-vouchers" : "/gift-vouchers";

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
            className="text-[#221c14] font-extrabold leading-[1.1em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {t("heading")}
          </h1>
        </div>

        {/* Service selector + Cal embed */}
        <BookingClient labels={labels} voucherHref={voucherHref} />

        {/* Studio info strip */}
        <div className="border-t-2 border-[#221c14] grid md:grid-cols-3">
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-2">
              {t("studioLabel")}
            </p>
            <p className="font-bold text-[17px] leading-[1.65em] text-[#221c14]">{t("studioName")}</p>
            <p className="font-bold text-[17px] leading-[1.65em] text-[#221c14]">{t("studioAddress")}</p>
          </div>
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-2">
              {t("hoursLabel")}
            </p>
            <p className="font-bold text-[17px] leading-[1.65em] text-[#221c14]">{t("hoursValue")}</p>
          </div>
          <div className="px-5 md:px-10 py-10">
            <p className="font-bold text-[13px] tracking-[2px] uppercase text-[#221c14]/50 mb-2">
              {t("emailLabel2")}
            </p>
            <a
              href="mailto:info@publikacija.lt"
              className="font-bold text-[17px] text-[#221c14] border-b-2 border-[#221c14]/30 hover:border-[#221c14] transition-colors"
            >
              info@publikacija.lt
            </a>
          </div>
        </div>

      </main>
      <FooterWrapper />
    </>
  );
}
