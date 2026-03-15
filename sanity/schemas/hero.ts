import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "Used only in the Studio — not shown on the site",
    }),
    defineField({
      name: "headline",
      title: "Headline Lines",
      type: "array",
      of: [{ type: "string" }],
      description: 'Each entry is one line. Default: ["TATTOO &", "PRINT", "STUDIO."]',
    }),
    defineField({
      name: "location",
      title: "Location Label",
      type: "string",
      initialValue: "Vilnius, Lithuania",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Main image shown in the right column of the hero",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Hero Video",
      type: "mux.video",
      description: "If set, shows instead of the hero image (right column)",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "Primary CTA Label",
      type: "string",
      initialValue: "Book Consultation",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "Secondary CTA Label",
      type: "string",
      initialValue: "View Our Work",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title ?? "Hero Section" };
    },
  },
});
