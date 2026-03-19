import { client } from "@/sanity/lib/client";
import { heroQuery, portfolioQuery, reviewsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { HeroData, PortfolioItemData, ReviewData, SiteSettingsData } from "@/sanity/types";
import { getGoogleReviews } from "@/lib/googleReviews";

import Preloader      from "@/components/Preloader";
import Navigation     from "@/components/Navigation";
import Hero           from "@/components/Hero";
import VideoSection   from "@/components/VideoSection";
import Services       from "@/components/Services";
import MarqueeText    from "@/components/MarqueeText";
import Gallery        from "@/components/Gallery";
import Reviews        from "@/components/Reviews";
import Artists        from "@/components/Artists";
import ContactSection from "@/components/ContactSection";
import FooterWrapper  from "@/components/FooterWrapper";

export const revalidate = 60;

export default async function Home() {
  const [hero, portfolioItems, sanityReviews, googleReviews, settings] = await Promise.all([
    client.fetch<HeroData>(heroQuery).catch(() => null),
    client.fetch<PortfolioItemData[]>(portfolioQuery).catch(() => null),
    client.fetch<ReviewData[]>(reviewsQuery).catch(() => []),
    getGoogleReviews(),
    client.fetch<SiteSettingsData>(siteSettingsQuery).catch(() => null),
  ]);

  // Google reviews take priority; fall back to Sanity if Google returns nothing
  const reviews = googleReviews.length > 0 ? googleReviews : sanityReviews;

  return (
    <>
      <Preloader />
      <Navigation />
      <main>
        <Hero         data={hero} />
        <VideoSection video={hero?.backgroundVideo} />
        <Services />
        <MarqueeText />
        <Gallery      items={portfolioItems} />
        <Reviews      items={reviews} />
        <Artists />
        <ContactSection instagramUrl={settings?.instagramUrl} />
      </main>
      <FooterWrapper />
    </>
  );
}
