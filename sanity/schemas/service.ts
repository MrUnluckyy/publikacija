import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "localeString",
    }),
    defineField({
      name: "serviceType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Tattoo", value: "tattoo" },
          { title: "Print", value: "print" },
          { title: "Workshop", value: "workshop" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: { hotspot: true },
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
    select: { titleLt: "title.lt", type: "serviceType", media: "image" },
    prepare({ titleLt, type, media }) {
      return { title: titleLt ?? "Service", subtitle: type, media };
    },
  },
});
