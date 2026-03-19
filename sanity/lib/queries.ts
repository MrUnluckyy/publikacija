import { groq } from "next-sanity";

// ─── Hero ──────────────────────────────────────────────────────────────────────
export const heroQuery = groq`*[_type == "hero"][0] {
  headline,
  location,
  heroImage,
  "backgroundVideo": backgroundVideo.asset->{ playbackId, status },
  ctaPrimaryLabel,
  ctaSecondaryLabel
}`;

// ─── Services ──────────────────────────────────────────────────────────────────
export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  title,
  subtitle,
  serviceType,
  description,
  features,
  ctaLabel,
  image
}`;

// ─── Portfolio ─────────────────────────────────────────────────────────────────
export const portfolioQuery = groq`*[_type == "portfolioItem"] | order(order asc) {
  _id,
  title,
  category,
  image
}`;

// ─── Videos ────────────────────────────────────────────────────────────────────
export const videosQuery = groq`*[_type == "studioVideo"] | order(order asc) {
  _id,
  title,
  label,
  "video": video.asset->{ playbackId, status },
  poster,
  featured
}`;

// ─── About ─────────────────────────────────────────────────────────────────────
export const aboutQuery = groq`*[_type == "about"][0] {
  heading,
  accentWord,
  body,
  portrait,
  stats,
  established
}`;

// ─── Featured video ────────────────────────────────────────────────────────────
export const featuredVideoQuery = groq`*[_type == "studioVideo" && featured == true][0] {
  _id,
  title,
  label,
  "video": video.asset->{ playbackId, status },
  poster
}`;

// ─── Reviews ───────────────────────────────────────────────────────────────────
export const reviewsQuery = groq`*[_type == "review" && featured == true] | order(order asc) {
  _id,
  author,
  body,
  rating,
  date
}`;

// ─── Site Settings ─────────────────────────────────────────────────────────────
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  studioName,
  tagline,
  email,
  phone,
  address,
  instagramUrl,
  facebookUrl,
  openingHours
}`;
