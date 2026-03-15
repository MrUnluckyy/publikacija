import type { PortableTextBlock } from "sanity";

// ─── Shared ────────────────────────────────────────────────────────────────────

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type MuxVideoAsset = {
  playbackId: string;
  status: string;
};

// ─── Documents ─────────────────────────────────────────────────────────────────

export type HeroData = {
  headline: string[] | null;
  location: string | null;
  heroImage: SanityImage | null;
  backgroundVideo: MuxVideoAsset | null;
  ctaPrimaryLabel: string | null;
  ctaSecondaryLabel: string | null;
};

export type ServiceData = {
  _id: string;
  title: string;
  subtitle: string;
  serviceType: "tattoo" | "print";
  description: string;
  features: string[];
  ctaLabel: string;
  image: SanityImage | null;
};

export type PortfolioItemData = {
  _id: string;
  title: string;
  category: "Tattoo" | "Print";
  image: SanityImage | null;
};

export type VideoData = {
  _id: string;
  title: string;
  label: string;
  video: MuxVideoAsset | null;
  poster: SanityImage | null;
  featured: boolean;
};

export type AboutData = {
  heading: string | null;
  accentWord: string | null;
  body: PortableTextBlock[] | null;
  portrait: SanityImage | null;
  stats: { value: string; label: string }[] | null;
  established: string | null;
};

export type ReviewData = {
  _id: string;
  author: string;
  body: string;
  rating: number;
  date: string | null;
};

export type SiteSettingsData = {
  studioName: string | null;
  tagline: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  openingHours: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  pinterestUrl: string | null;
  tiktokUrl: string | null;
};
