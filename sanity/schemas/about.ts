import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      description: 'e.g. "Art in"',
    }),
    defineField({
      name: "accentWord",
      title: "Italic Accent Word",
      type: "string",
      description: 'Displayed in italic serif on the second line, e.g. "every"',
      initialValue: "every",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "portrait",
      title: "Studio Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: 'Value (e.g. "500+")',
              type: "string",
            },
            {
              name: "label",
              title: 'Label (e.g. "Tattoos")',
              type: "string",
            },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "established",
      title: "Year Established",
      type: "string",
      initialValue: "2019",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title ?? "About Section" };
    },
  },
});
