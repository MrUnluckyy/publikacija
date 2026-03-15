import { client } from "@/sanity/lib/client";
import { heroQuery, portfolioQuery, reviewsQuery } from "@/sanity/lib/queries";
import type { HeroData, PortfolioItemData, ReviewData } from "@/sanity/types";

import Preloader      from "@/components/Preloader";
import Navigation     from "@/components/Navigation";
import Hero           from "@/components/Hero";
import Services       from "@/components/Services";
import MarqueeText    from "@/components/MarqueeText";
import Gallery        from "@/components/Gallery";
import Reviews        from "@/components/Reviews";
import Artists        from "@/components/Artists";
import ContactSection from "@/components/ContactSection";
import Footer         from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  const [hero, portfolioItems, reviews] = await Promise.all([
    client.fetch<HeroData>(heroQuery).catch(() => null),
    client.fetch<PortfolioItemData[]>(portfolioQuery).catch(() => null),
    client.fetch<ReviewData[]>(reviewsQuery).catch(() => null),
  ]);

  return (
    <>
      <Preloader />
      <Navigation />
      <main>
        <Hero     data={hero} />
        <Services />
        <MarqueeText />
        <Gallery  items={portfolioItems} />
        <Reviews  items={reviews} />
        <Artists />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
