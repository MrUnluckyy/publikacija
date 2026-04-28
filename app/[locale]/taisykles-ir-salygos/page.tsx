import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { termsQuery } from "@/sanity/lib/queries";
import type { TermsPageData } from "@/sanity/types";
import { PortableText } from "next-sanity";
import Navigation from "@/components/Navigation";
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
        title: "Taisyklės ir sąlygos — Publikacija",
        description: "Publikacija tatuiruočių studijos paslaugų teikimo taisyklės ir sąlygos.",
      }
    : {
        title: "Terms & Conditions — Publikacija",
        description: "Terms and conditions for services provided by Publikacija tattoo studio.",
      };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await client
    .fetch<TermsPageData>(termsQuery, { locale })
    .catch(() => null);

  const heading =
    data?.heading ??
    (locale === "lt" ? "Taisyklės ir sąlygos" : "Terms & Conditions");

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 72 }}>
        <BackToHome />

        {/* Page header */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10 md:py-16">
          {data?.lastUpdated && (
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">
              {locale === "lt" ? "Atnaujinta" : "Updated"}{" "}
              {new Date(data.lastUpdated).toLocaleDateString(
                locale === "lt" ? "lt-LT" : "en-GB",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </p>
          )}
          <h1
            className="text-[#221c14] font-extrabold leading-[1.1em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {heading}
          </h1>
        </div>

        {/* Sections */}
        <div className="px-5 md:px-10 py-12 md:py-20 max-w-3xl">
          {data?.sections?.map((section, i) => (
            <div key={i} className="mb-12">
              {section.heading && (
                <h2 className="text-[#221c14] font-extrabold text-xl mb-4 uppercase tracking-wide">
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <div className="text-[#221c14]/80 text-base leading-relaxed font-normal [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1">
                  <PortableText value={section.body} />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <FooterWrapper />
    </>
  );
}
