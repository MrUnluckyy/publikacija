import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localeText",
      description: "Short summary shown in the news slider",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverVideo",
      title: "Cover Video (optional)",
      type: "mux.video",
      description: "If set, this video plays in the news slider instead of the cover image.",
    }),
    defineField({
      name: "body",
      title: "Sections",
      type: "localeSections",
      description:
        "Build the article section by section — add Text, Image, Gallery, Video, Media + text, or Pull quote, and drag to reorder.",
    }),
    defineField({
      name: "sidebar",
      title: "Sticky sidebar",
      type: "object",
      description:
        "Optional block shown beside the article and pinned while scrolling (desktop). Add an image and/or a text block with a button.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "localeString" }),
        defineField({ name: "body", title: "Text", type: "localeText" }),
        defineField({ name: "ctaLabel", title: "Button label", type: "localeString" }),
        defineField({
          name: "ctaUrl",
          title: "Button link",
          type: "string",
          description: 'Internal path (e.g. "/book") or full URL',
        }),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.lt", maxLength: 96 },
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
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.lt", subtitle: "date", media: "coverImage" },
  },
});
