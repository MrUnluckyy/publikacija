import { defineField, defineType } from "sanity";

export default defineType({
  name: "termsPage",
  title: "Terms & Conditions",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "localeString",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "heading",
              title: "Section Heading",
              type: "localeString",
            },
            {
              name: "body",
              title: "Content",
              type: "localeBlock",
            },
          ],
          preview: {
            select: { title: "heading.lt" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title ?? "Terms & Conditions" };
    },
  },
});
