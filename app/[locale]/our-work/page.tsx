import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { portfolioQuery } from "@/sanity/lib/queries";
import type { PortfolioItemData } from "@/sanity/types";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";
import WorkGallery from "./WorkGallery";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Work — Publikacija",
    description: "Browse tattoo and linocut print work from Publikacija studio in Vilnius.",
  };
}

export default async function OurWorkPage() {
  const t = await getTranslations("ourWork");
  const items = await client.fetch<PortfolioItemData[]>(portfolioQuery).catch(() => []);

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

        {/* Gallery */}
        <WorkGallery items={items ?? []} />

      </main>
      <FooterWrapper />
    </>
  );
}
