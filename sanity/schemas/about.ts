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
      type: "localeString",
      description: 'e.g. "Art in"',
    }),
    defineField({
      name: "accentWord",
      title: "Italic Accent Word",
      type: "localeString",
      description: 'Displayed in italic on the second line, e.g. "every"',
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "localeBlock",
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
            { name: "value", title: 'Value (e.g. "500+")', type: "string" },
            { name: "label", title: "Label", type: "localeString" },
          ],
          preview: {
            select: { title: "value", subtitle: "label.lt" },
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
