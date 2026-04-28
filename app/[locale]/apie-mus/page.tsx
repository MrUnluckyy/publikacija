import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import type { AboutData } from "@/sanity/types";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "lt"
    ? {
        title: "Apie mus — Publikacija",
        description:
          "Sužinokite daugiau apie Publikacija tatuiruočių ir linorytų studiją Vilniuje.",
      }
    : {
        title: "About — Publikacija",
        description:
          "Learn more about Publikacija tattoo and linocut studio in Vilnius.",
      };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await client
    .fetch<AboutData>(aboutQuery, { locale })
    .catch(() => null);

  const isLt = locale === "lt";

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 72 }}>
        <BackToHome />
        <About data={data} />

        {/* Tattoo care downloads */}
        <div className="border-b-2 border-[#221c14]">
          <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">
              {isLt ? "Priežiūra" : "Aftercare"}
            </p>
            <h2
              className="text-[#221c14] font-extrabold leading-[1.1em]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
            >
              {isLt ? "Tatuiruotės priežiūros instrukcija" : "Tattoo Aftercare Guide"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2">
            {/* LT download */}
            <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] px-5 md:px-10 py-12 flex flex-col gap-6">
              <div>
                <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mb-3">
                  Lietuvių kalba
                </p>
                <p className="text-[#221c14] font-bold text-[16px] leading-[1.65em]">
                  Kaip tinkamai prižiūrėti naują tatuiruotę — instrukcija lietuvių kalba.
                </p>
              </div>
              <a
                href="/assets/tattoo-care/TATUIRUOTESGYDYMAS-scaled.jpg"
                download="Tatuiruotes-prieziura.jpg"
                className="self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              >
                ↓ Atsisiųsti
              </a>
            </div>

            {/* EN download */}
            <div className="px-5 md:px-10 py-12 flex flex-col gap-6">
              <div>
                <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mb-3">
                  English
                </p>
                <p className="text-[#221c14] font-bold text-[16px] leading-[1.65em]">
                  How to properly care for your new tattoo — instructions in English.
                </p>
              </div>
              <a
                href="/assets/tattoo-care/tattooaftercareEN-scaled.jpg"
                download="Tattoo-aftercare.jpg"
                className="self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              >
                ↓ Download
              </a>
            </div>
          </div>
        </div>

      </main>
      <FooterWrapper />
    </>
  );
}
