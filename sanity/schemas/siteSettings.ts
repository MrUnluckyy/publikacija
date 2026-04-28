import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // ── Studio info ────────────────────────────────────────────────────────────
    defineField({ name: "studioName", title: "Studio Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "localeString",
      description: 'e.g. LT: "Pr–Š, 10:00–19:00" / EN: "Mon–Sat, 10:00–19:00"',
    }),

    // ── Social links ───────────────────────────────────────────────────────────
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "pinterestUrl", title: "Pinterest URL", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok URL", type: "url" }),

    // ── Section headings ──────────────────────────────────────────────────────
    defineField({ name: "galleryEyebrow", title: "Gallery — Eyebrow Label", type: "localeString" }),
    defineField({ name: "galleryHeading", title: "Gallery — Heading", type: "localeString" }),
    defineField({ name: "reviewsEyebrow", title: "Reviews — Eyebrow Label", type: "localeString" }),
    defineField({ name: "reviewsHeading", title: "Reviews — Heading", type: "localeString" }),
    defineField({ name: "artistsEyebrow", title: "Artists Section — Eyebrow Label", type: "localeString" }),
    defineField({ name: "artistsHeading", title: "Artists Section — Heading", type: "localeString" }),

    // ── Marquee / SEO keywords ─────────────────────────────────────────────────
    defineField({
      name: "marqueeItemsLt",
      title: "SEO Keywords Band — Lithuanian",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords shown in the band between Gallery and Reviews (LT)",
    }),
    defineField({
      name: "marqueeItemsEn",
      title: "SEO Keywords Band — English",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords shown in the band between Gallery and Reviews (EN)",
    }),

    // ── Contact section text ───────────────────────────────────────────────────
    defineField({ name: "contactEyebrow", title: "Contact — Eyebrow Label", type: "localeString" }),
    defineField({ name: "contactHeading", title: "Contact — Heading", type: "localeString" }),
    defineField({ name: "contactBookHeading", title: "Contact — Book CTA Heading", type: "localeString" }),
    defineField({ name: "contactBookBody", title: "Contact — Book CTA Body", type: "localeText" }),
    defineField({ name: "contactSendLabel", title: "Contact — Send Message Button", type: "localeString" }),
    defineField({ name: "contactFindUsHeading", title: "Contact — Find Us Heading", type: "localeString" }),
  ],
  preview: {
    select: { title: "studioName" },
    prepare({ title }) {
      return { title: title ?? "Site Settings" };
    },
  },
});
