import { groq } from "next-sanity";

// ── Locale helper ─────────────────────────────────────────────────────────────
// All queries accept a $locale parameter ("lt" | "en").
// coalesce(field[$locale], field.lt) means: try the requested locale,
// fall back to Lithuanian (the primary language) if not set.

// ── Hero ──────────────────────────────────────────────────────────────────────
export const heroQuery = groq`*[_type == "hero" && _id == "hero-singleton"][0] {
  "title1": coalesce(title1[$locale], title1.lt),
  "title2": coalesce(title2[$locale], title2.lt),
  "body":   coalesce(body[$locale], body.lt),
  "service1": coalesce(service1[$locale], service1.lt),
  "service2": coalesce(service2[$locale], service2.lt),
  "service3": coalesce(service3[$locale], service3.lt),
  "backgroundVideo": backgroundVideo.asset->{ playbackId, status }
}`;

// ── Video Section ─────────────────────────────────────────────────────────────
export const videoSectionQuery = groq`*[_type == "videoSection" && _id == "video-section-singleton"][0] {
  "eyebrow":  coalesce(eyebrow[$locale], eyebrow.lt),
  "heading":  coalesce(heading[$locale], heading.lt),
  "body":     coalesce(body[$locale], body.lt),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.lt)
}`;

// ── Services ──────────────────────────────────────────────────────────────────
export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  "title":       coalesce(title[$locale], title.lt),
  "description": coalesce(description[$locale], description.lt),
  "ctaLabel":    coalesce(ctaLabel[$locale], ctaLabel.lt),
  serviceType,
  image
}`;

// ── Portfolio ─────────────────────────────────────────────────────────────────
export const portfolioQuery = groq`*[_type == "portfolioItem"] | order(order asc) {
  _id,
  title,
  category,
  image,
  "artistName": artist->name
}`;

// ── Videos ────────────────────────────────────────────────────────────────────
export const videosQuery = groq`*[_type == "studioVideo"] | order(order asc) {
  _id,
  title,
  label,
  "video": video.asset->{ playbackId, status },
  poster,
  featured
}`;

// ── About ─────────────────────────────────────────────────────────────────────
export const aboutQuery = groq`*[_type == "about" && _id == "about-singleton"][0] {
  "heading":     coalesce(heading[$locale], heading.lt),
  "accentWord":  coalesce(accentWord[$locale], accentWord.lt),
  "body":        coalesce(body[$locale], body.lt),
  portrait,
  "stats": stats[]{ value, "label": coalesce(label[$locale], label.lt) },
  established
}`;

// ── Featured video ────────────────────────────────────────────────────────────
export const featuredVideoQuery = groq`*[_type == "studioVideo" && featured == true][0] {
  _id,
  title,
  label,
  "video": video.asset->{ playbackId, status },
  poster
}`;

// ── Reviews ───────────────────────────────────────────────────────────────────
export const reviewsQuery = groq`*[_type == "review" && featured == true] | order(order asc) {
  _id,
  author,
  body,
  rating,
  date
}`;

// ── Site Settings ─────────────────────────────────────────────────────────────
export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "site-settings-singleton"][0] {
  studioName,
  tagline,
  email,
  phone,
  address,
  "openingHours": coalesce(openingHours[$locale], openingHours.lt),
  instagramUrl,
  facebookUrl,
  pinterestUrl,
  tiktokUrl,
  "contactEyebrow":      coalesce(contactEyebrow[$locale], contactEyebrow.lt),
  "contactHeading":      coalesce(contactHeading[$locale], contactHeading.lt),
  "contactBookHeading":  coalesce(contactBookHeading[$locale], contactBookHeading.lt),
  "contactBookBody":     coalesce(contactBookBody[$locale], contactBookBody.lt),
  "contactSendLabel":    coalesce(contactSendLabel[$locale], contactSendLabel.lt),
  "contactFindUsHeading": coalesce(contactFindUsHeading[$locale], contactFindUsHeading.lt),
  "galleryEyebrow": coalesce(galleryEyebrow[$locale], galleryEyebrow.lt),
  "galleryHeading": coalesce(galleryHeading[$locale], galleryHeading.lt),
  "reviewsEyebrow": coalesce(reviewsEyebrow[$locale], reviewsEyebrow.lt),
  "reviewsHeading": coalesce(reviewsHeading[$locale], reviewsHeading.lt),
  "artistsEyebrow": coalesce(artistsEyebrow[$locale], artistsEyebrow.lt),
  "artistsHeading": coalesce(artistsHeading[$locale], artistsHeading.lt),
  "marqueeItems": select(
    $locale == "en" && defined(marqueeItemsEn) && length(marqueeItemsEn) > 0 => marqueeItemsEn,
    marqueeItemsLt
  )
}`;

// ── Gift Vouchers ─────────────────────────────────────────────────────────────
export const giftVouchersQuery = groq`*[_type == "giftVoucher"] | order(order asc) {
  _id,
  "label":       coalesce(label[$locale], label.lt),
  amount,
  "description": coalesce(description[$locale], description.lt),
  "ideal": select(
    $locale == "en" && defined(idealEn) && length(idealEn) > 0 => idealEn,
    idealLt
  ),
  coverImage
}`;

// ── Artists ───────────────────────────────────────────────────────────────────
export const artistsQuery = groq`*[_type == "artist"] | order(order asc) {
  _id,
  name,
  "role": coalesce(role[$locale], role.lt),
  "bio":  coalesce(bio[$locale], bio.lt),
  instagramUrl,
  instagramHandle,
  photo
}`;

// ── Booking Page ──────────────────────────────────────────────────────────────
export const bookPageQuery = groq`*[_type == "bookPage" && _id == "book-page-singleton"][0] {
  "eyebrow":         coalesce(eyebrow[$locale], eyebrow.lt),
  "heading":         coalesce(heading[$locale], heading.lt),
  "tattooTitle":     coalesce(tattooTitle[$locale], tattooTitle.lt),
  "tattooDesc":      coalesce(tattooDesc[$locale], tattooDesc.lt),
  "printTitle":      coalesce(printTitle[$locale], printTitle.lt),
  "printDesc":       coalesce(printDesc[$locale], printDesc.lt),
  "workshopTitle":   coalesce(workshopTitle[$locale], workshopTitle.lt),
  "workshopDesc":    coalesce(workshopDesc[$locale], workshopDesc.lt),
  "voucherTitle":    coalesce(voucherTitle[$locale], voucherTitle.lt),
  "voucherDesc":     coalesce(voucherDesc[$locale], voucherDesc.lt),
  "calHeading":      coalesce(calHeading[$locale], calHeading.lt),
  "workshopHeading": coalesce(workshopHeading[$locale], workshopHeading.lt),
  "workshopBody":    coalesce(workshopBody[$locale], workshopBody.lt),
  "workshopCtaLabel": coalesce(workshopCtaLabel[$locale], workshopCtaLabel.lt)
}`;

// ── Terms & Conditions Page ───────────────────────────────────────────────────
export const termsQuery = groq`*[_type == "termsPage"][0] {
  "heading":     coalesce(heading[$locale], heading.lt),
  lastUpdated,
  "sections": sections[]{
    "heading": coalesce(heading[$locale], heading.lt),
    "body":    coalesce(body[$locale], body.lt)
  }
}`;

// ── Gift Vouchers Page ────────────────────────────────────────────────────────
export const giftVouchersPageQuery = groq`*[_type == "giftVouchersPage" && _id == "gift-vouchers-page-singleton"][0] {
  "eyebrow":          coalesce(eyebrow[$locale], eyebrow.lt),
  "heading":          coalesce(heading[$locale], heading.lt),
  "intro":            coalesce(intro[$locale], intro.lt),
  "howItWorksLabel":  coalesce(howItWorksLabel[$locale], howItWorksLabel.lt),
  "steps": steps[]{
    stepNumber,
    "title": coalesce(title[$locale], title.lt),
    "body":  coalesce(body[$locale], body.lt)
  },
  "readyHeading":       coalesce(readyHeading[$locale], readyHeading.lt),
  "readyBody":          coalesce(readyBody[$locale], readyBody.lt),
  "orderVoucherLabel":  coalesce(orderVoucherLabel[$locale], orderVoucherLabel.lt),
  "emailUsLabel":       coalesce(emailUsLabel[$locale], emailUsLabel.lt),
  "getVoucherLabel":    coalesce(getVoucherLabel[$locale], getVoucherLabel.lt)
}`;
