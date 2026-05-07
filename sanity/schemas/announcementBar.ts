import { defineField, defineType } from "sanity";

export default defineType({
  name: "announcementBar",
  title: "Announcement Bar",
  type: "document",
  fields: [
    defineField({
      name: "enabled",
      title: "Show announcement bar",
      type: "boolean",
      description: "Toggle the bar on or off across the whole site",
      initialValue: false,
    }),
    defineField({
      name: "items",
      title: "Scrolling text items",
      type: "array",
      of: [{ type: "localeString" }],
      description: "Each item scrolls across the bar. Add several — they repeat seamlessly.",
    }),
  ],
  preview: {
    select: { enabled: "enabled" },
    prepare({ enabled }) {
      return {
        title: "Announcement Bar",
        subtitle: enabled ? "● Live" : "○ Hidden",
      };
    },
  },
});
