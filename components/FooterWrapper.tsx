import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettingsData } from "@/sanity/types";
import Footer from "./Footer";

export default async function FooterWrapper() {
  const settings = await client
    .fetch<SiteSettingsData>(siteSettingsQuery)
    .catch(() => null);

  return <Footer instagramUrl={settings?.instagramUrl ?? null} />;
}
