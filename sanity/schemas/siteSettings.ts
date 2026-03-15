import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "studioName", title: "Studio Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "string",
      description: 'e.g. "Mon–Sat, 10:00–19:00"',
    }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "pinterestUrl", title: "Pinterest URL", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok URL", type: "url" }),
  ],
  preview: {
    select: { title: "studioName" },
    prepare({ title }) {
      return { title: title ?? "Site Settings" };
    },
  },
});
