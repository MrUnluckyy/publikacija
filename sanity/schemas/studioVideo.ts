import { defineField, defineType } from "sanity";

export default defineType({
  name: "studioVideo",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Display Label",
      type: "string",
      description: 'Shown below the play button, e.g. "Studio Tour — Publikacija 2024"',
    }),
    defineField({
      name: "video",
      title: "Video File",
      type: "mux.video",
    }),
    defineField({
      name: "poster",
      title: "Poster / Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown before the video loads",
    }),
    defineField({
      name: "featured",
      title: "Featured (Hero Video)",
      type: "boolean",
      description: "The single featured video is shown full-width at the top",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "label", media: "poster" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? "No label set", media };
    },
  },
});
