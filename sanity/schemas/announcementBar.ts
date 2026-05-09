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
      name: "barType",
      title: "Bar type",
      type: "string",
      options: {
        list: [
          { title: "Scrolling marquee — text items loop across the bar", value: "marquee" },
          { title: "Call to action — static message with a link", value: "cta" },
        ],
        layout: "radio",
      },
      initialValue: "marquee",
    }),

    // ── Marquee fields ──────────────────────────────────────────────────────
    defineField({
      name: "items",
      title: "Scrolling text items",
      type: "array",
      of: [{ type: "localeString" }],
      description: "Add as many as you like — they repeat seamlessly.",
      hidden: ({ document }) => document?.barType !== "marquee" && document?.barType !== undefined,
    }),

    // ── CTA fields ──────────────────────────────────────────────────────────
    defineField({
      name: "ctaMessage",
      title: "Message",
      type: "localeString",
      description: "The text shown in the bar",
      hidden: ({ document }) => document?.barType !== "cta",
    }),
    defineField({
      name: "ctaLinkLabel",
      title: "Link label",
      type: "localeString",
      description: 'Button text, e.g. "Book now"',
      hidden: ({ document }) => document?.barType !== "cta",
    }),
    defineField({
      name: "ctaLinkHref",
      title: "Link URL",
      type: "string",
      description: 'Internal path (e.g. /book) or full URL',
      hidden: ({ document }) => document?.barType !== "cta",
    }),
  ],
  preview: {
    select: { enabled: "enabled", barType: "barType" },
    prepare({ enabled, barType }) {
      return {
        title: "Announcement Bar",
        subtitle: enabled
          ? `● Live — ${barType === "cta" ? "CTA" : "Marquee"}`
          : "○ Hidden",
      };
    },
  },
});
