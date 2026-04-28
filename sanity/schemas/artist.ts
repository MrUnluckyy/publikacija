import { defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role", type: "localeString", description: 'e.g. "Tattoo Artist & Printmaker"' }),
    defineField({ name: "bio", title: "Bio", type: "localeText" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "instagramHandle", title: "Instagram Handle (e.g. @lukastattoo)", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role.lt", media: "photo" },
    prepare({ title, subtitle, media }) {
      return { title: title ?? "Artist", subtitle, media };
    },
  },
});
