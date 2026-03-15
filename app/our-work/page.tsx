import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { portfolioQuery } from "@/sanity/lib/queries";
import type { PortfolioItemData } from "@/sanity/types";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WorkGallery from "./WorkGallery";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Work — Publikacija",
  description: "Browse tattoo and linocut print work from Publikacija studio in Vilnius.",
};

export default async function OurWorkPage() {
  const items = await client.fetch<PortfolioItemData[]>(portfolioQuery).catch(() => []);

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: 72 }}>

        {/* ── Hero ── */}
        <div className="border-b border-[#221c14]/10 py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8">
            <p className="text-[#585858] text-[13px] tracking-[3px] uppercase mb-4">Selected Work</p>
            <h1
              className="text-[#221c14] font-medium leading-[1.2em] mb-4"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Our Work
            </h1>
            <div className="w-16 h-[4px] bg-[#221c14]" />
          </div>
        </div>

        {/* ── Gallery ── */}
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">
          <WorkGallery items={items ?? []} />
        </div>

      </main>
      <Footer />
    </>
  );
}
