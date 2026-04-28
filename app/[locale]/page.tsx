import { client } from "@/sanity/lib/client";
import {
  heroQuery,
  videoSectionQuery,
  servicesQuery,
  portfolioQuery,
  reviewsQuery,
  siteSettingsQuery,
  artistsQuery,
} from "@/sanity/lib/queries";
import type {
  HeroData,
  VideoSectionData,
  ServiceData,
  PortfolioItemData,
  ReviewData,
  SiteSettingsData,
  ArtistData,
} from "@/sanity/types";
import { getGoogleReviews } from "@/lib/googleReviews";

import Navigation     from "@/components/Navigation";
import Hero           from "@/components/Hero";
import VideoSection   from "@/components/VideoSection";
import Services       from "@/components/Services";
import Gallery        from "@/components/Gallery";
import Reviews        from "@/components/Reviews";
import Artists        from "@/components/Artists";
import ContactSection from "@/components/ContactSection";
import FooterWrapper  from "@/components/FooterWrapper";

export const revalidate = 60;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const [hero, videoSection, services, portfolioItems, sanityReviews, googleReviews, settings, artists] =
    await Promise.all([
      client.fetch<HeroData>(heroQuery, { locale }).catch(() => null),
      client.fetch<VideoSectionData>(videoSectionQuery, { locale }).catch(() => null),
      client.fetch<ServiceData[]>(servicesQuery, { locale }).catch(() => null),
      client.fetch<PortfolioItemData[]>(portfolioQuery, { locale }).catch(() => null),
      client.fetch<ReviewData[]>(reviewsQuery, { locale }).catch(() => []),
      getGoogleReviews(),
      client.fetch<SiteSettingsData>(siteSettingsQuery, { locale }).catch(() => null),
      client.fetch<ArtistData[]>(artistsQuery, { locale }).catch(() => null),
    ]);

  const reviews = googleReviews.length > 0 ? googleReviews : sanityReviews;

  return (
    <>
      <Navigation />
      <main>
        <Hero data={hero} />
        <VideoSection video={hero?.backgroundVideo} content={videoSection} />
        <Services items={services} />
        <Gallery
          items={portfolioItems}
          eyebrow={settings?.galleryEyebrow}
          heading={settings?.galleryHeading}
        />
        <Reviews
          items={reviews}
          eyebrow={settings?.reviewsEyebrow}
          heading={settings?.reviewsHeading}
        />
        <Artists
          items={artists}
          eyebrow={settings?.artistsEyebrow}
          heading={settings?.artistsHeading}
        />
        <ContactSection settings={settings} />
      </main>
      <FooterWrapper />
    </>
  );
}
