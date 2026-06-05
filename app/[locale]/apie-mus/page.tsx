import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import type { AboutData } from "@/sanity/types";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import AboutVideo from "@/components/AboutVideo";
import AboutFaq from "@/components/AboutFaq";
import AboutAftercare from "@/components/AboutAftercare";
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
      <main style={{ paddingTop: "calc(72px + var(--bar-h, 0px))" }}>
        <BackToHome />
        <About data={data} />
        <AboutVideo data={data} />
        <AboutFaq data={data} />
        <AboutAftercare data={data} isLt={isLt} />
      </main>
      <FooterWrapper />
    </>
  );
}
