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
// All text fields are pre-resolved for the requested locale by GROQ projections.
// Components receive plain strings — no locale handling needed in components.

export type HeroData = {
  title1: string | null;
  title2: string | null;
  body: string | null;
  service1: string | null;
  service2: string | null;
  service3: string | null;
  backgroundVideo: MuxVideoAsset | null;
};

export type VideoSectionData = {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  ctaLabel: string | null;
};

export type ServiceData = {
  _id: string;
  title: string | null;
  description: string | null;
  ctaLabel: string | null;
  serviceType: "tattoo" | "print" | "workshop";
  image: SanityImage | null;
};

export type PortfolioItemData = {
  _id: string;
  title: string;
  category: "Tattoo" | "Print";
  image: SanityImage | null;
  artistName: string | null;
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
  // Section headings
  galleryEyebrow: string | null;
  galleryHeading: string | null;
  reviewsEyebrow: string | null;
  reviewsHeading: string | null;
  artistsEyebrow: string | null;
  artistsHeading: string | null;
  marqueeItems: string[] | null;
  // Contact section text
  contactEyebrow: string | null;
  contactHeading: string | null;
  contactBookHeading: string | null;
  contactBookBody: string | null;
  contactSendLabel: string | null;
  contactFindUsHeading: string | null;
};

export type GiftVoucherData = {
  _id: string;
  label: string | null;
  amount: string;
  description: string | null;
  ideal: string[] | null;
  coverImage: SanityImage | null;
};

export type ArtistData = {
  _id: string;
  name: string;
  role: string | null;
  bio: string | null;
  instagramUrl: string | null;
  instagramHandle: string | null;
  photo: SanityImage | null;
};

export type BookPageData = {
  eyebrow: string | null;
  heading: string | null;
  tattooTitle: string | null;
  tattooDesc: string | null;
  printTitle: string | null;
  printDesc: string | null;
  workshopTitle: string | null;
  workshopDesc: string | null;
  voucherTitle: string | null;
  voucherDesc: string | null;
  calHeading: string | null;
  workshopHeading: string | null;
  workshopBody: string | null;
  workshopCtaLabel: string | null;
};

export type TermsPageData = {
  heading: string | null;
  lastUpdated: string | null;
  sections: {
    heading: string | null;
    body: PortableTextBlock[] | null;
  }[] | null;
};

export type GiftVouchersPageData = {
  eyebrow: string | null;
  heading: string | null;
  intro: string | null;
  howItWorksLabel: string | null;
  steps: { stepNumber: string; title: string; body: string }[] | null;
  readyHeading: string | null;
  readyBody: string | null;
  orderVoucherLabel: string | null;
  emailUsLabel: string | null;
  getVoucherLabel: string | null;
};
