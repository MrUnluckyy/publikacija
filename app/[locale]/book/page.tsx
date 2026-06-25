import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery, bookPageQuery, artistsQuery } from "@/sanity/lib/queries";
import type { SiteSettingsData, BookPageData, ArtistData } from "@/sanity/types";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";
import BookingForm from "./BookingForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Book a Session — Publikacija",
    description: "Book a tattoo consultation, linocut print session, or creative workshop at Publikacija studio in Vilnius.",
  };
}

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, settings, bookContent, artists] = await Promise.all([
    getTranslations("book"),
    client.fetch<SiteSettingsData>(siteSettingsQuery, { locale }).catch(() => null),
    client.fetch<BookPageData>(bookPageQuery, { locale }).catch(() => null),
    client.fetch<ArtistData[]>(artistsQuery, { locale }).catch(() => null),
  ]);

  // Service options — Sanity content takes priority, i18n is the fallback
  const services = [
    { value: "Tattoo", label: bookContent?.tattooTitle ?? t("tattooTitle") },
    { value: "Workshop", label: bookContent?.workshopTitle ?? t("workshopTitle") },
  ];

  const artistOptions = (artists ?? []).map((a) => ({ id: a._id, name: a.name }));

  const eyebrow = bookContent?.eyebrow ?? t("eyebrow");
  const heading = bookContent?.heading ?? t("heading");
  const intro = bookContent?.intro ?? t("intro");

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: "calc(72px + var(--bar-h, 0px))" }}>
        <BackToHome />

        {/* Page header */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10 md:py-16">
          <p className="text-[#221c14]/50 font-bold text-[14px] tracking-[3px] uppercase mb-2">
            {eyebrow}
          </p>
          <h1 className="text-title text-[#221c14] mb-6">
            {heading}
          </h1>
          <p className="text-body text-[#221c14] max-w-[560px]">
            {intro}
          </p>
        </div>

        {/* Booking request form */}
        <BookingForm
          services={services}
          artists={artistOptions}
          locale={locale}
          instagramUrl={settings?.instagramUrl}
          workshop={{
            heading: bookContent?.workshopHeading ?? t("workshopHeading"),
            body: bookContent?.workshopBody ?? t("workshopBody"),
            facts: bookContent?.workshopFacts ?? [],
          }}
        />

        {/* Studio info strip */}
        <div className="border-t-2 border-b-2 border-[#221c14] grid md:grid-cols-3">
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="font-bold text-[14px] tracking-[2px] uppercase text-[#221c14]/50 mb-2">
              {t("studioLabel")}
            </p>
            <p className="text-body text-[#221c14]">{settings?.studioName ?? t("studioName")}</p>
            <p className="text-body text-[#221c14]">{settings?.address ?? t("studioAddress")}</p>
          </div>
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="font-bold text-[14px] tracking-[2px] uppercase text-[#221c14]/50 mb-2">
              {t("hoursLabel")}
            </p>
            <p className="text-body text-[#221c14]">{settings?.openingHours ?? t("hoursValue")}</p>
          </div>
          <div className="px-5 md:px-10 py-10">
            <p className="font-bold text-[14px] tracking-[2px] uppercase text-[#221c14]/50 mb-2">
              {t("emailLabel2")}
            </p>
            <a
              href={`mailto:${settings?.email ?? "info@publikacija.lt"}`}
              className="text-body text-[#221c14] border-b-2 border-[#221c14]/30 hover:border-[#221c14] transition-colors"
            >
              {settings?.email ?? "info@publikacija.lt"}
            </a>
          </div>
        </div>

      </main>
      <FooterWrapper />
    </>
  );
}
