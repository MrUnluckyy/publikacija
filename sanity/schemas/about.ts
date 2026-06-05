import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  groups: [
    { name: "intro", title: "Intro", default: true },
    { name: "video", title: "Video" },
    { name: "faq", title: "FAQ" },
    { name: "aftercare", title: "Aftercare" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      group: "intro",
    }),

    // ── Intro ────────────────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "localeString",
      description: 'Small uppercase label above the heading, e.g. "About the Studio"',
      group: "intro",
    }),
    defineField({
      name: "heading",
      title: "Heading — Line 1",
      type: "localeString",
      description: 'e.g. "Art in"',
      group: "intro",
    }),
    defineField({
      name: "accentWord",
      title: "Heading — Line 2 (Italic Accent)",
      type: "localeString",
      description: 'Displayed in italic on the second line, e.g. "every"',
      group: "intro",
    }),
    defineField({
      name: "headingLine3",
      title: "Heading — Line 3",
      type: "localeString",
      description: 'Third line of the heading, e.g. "detail."',
      group: "intro",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "localeBlock",
      group: "intro",
    }),
    defineField({
      name: "portrait",
      title: "Studio Portrait",
      type: "image",
      options: { hotspot: true },
      group: "intro",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "intro",
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
      group: "intro",
    }),

    // ── Video ────────────────────────────────────────────────────────────
    defineField({
      name: "videoEyebrow",
      title: "Eyebrow Label",
      type: "localeString",
      description: 'Small uppercase label above the video heading',
      group: "video",
    }),
    defineField({
      name: "videoHeading",
      title: "Heading",
      type: "localeString",
      group: "video",
    }),
    defineField({
      name: "videoBody",
      title: "Body Text",
      type: "localeText",
      group: "video",
    }),
    defineField({
      name: "video",
      title: "Video File",
      type: "mux.video",
      description: "Upload a video to show on the About page. Leave empty to hide the video section.",
      group: "video",
    }),
    defineField({
      name: "videoLabel",
      title: "Video Label",
      type: "string",
      description: 'Shown in the controls bar, e.g. "Studio Tour — Publikacija 2024"',
      group: "video",
    }),
    defineField({
      name: "videoCtaLabel",
      title: "CTA Button Label",
      type: "localeString",
      description: 'e.g. "Book a visit". Leave empty to hide the button.',
      group: "video",
    }),
    defineField({
      name: "videoCtaUrl",
      title: "CTA Button Link",
      type: "string",
      description: 'Where the button links to, e.g. "/book"',
      initialValue: "/book",
      group: "video",
    }),

    // ── FAQ ──────────────────────────────────────────────────────────────
    defineField({
      name: "faqEyebrow",
      title: "Eyebrow Label",
      type: "localeString",
      description: 'Small uppercase label above the FAQ heading',
      group: "faq",
    }),
    defineField({
      name: "faqHeading",
      title: "Heading",
      type: "localeString",
      description: 'e.g. "Frequently Asked Questions"',
      group: "faq",
    }),
    defineField({
      name: "faqItems",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "localeString" },
            { name: "answer", title: "Answer", type: "localeText" },
          ],
          preview: {
            select: { title: "question.lt", subtitle: "answer.lt" },
            prepare({ title, subtitle }) {
              return { title: title ?? "Untitled question", subtitle };
            },
          },
        },
      ],
    }),

    // ── Aftercare ────────────────────────────────────────────────────────
    defineField({
      name: "aftercareEyebrow",
      title: "Eyebrow Label",
      type: "localeString",
      description: 'Small uppercase label, e.g. "Aftercare"',
      group: "aftercare",
    }),
    defineField({
      name: "aftercareHeading",
      title: "Heading",
      type: "localeString",
      description: 'e.g. "Tattoo Aftercare Guide"',
      group: "aftercare",
    }),
    defineField({
      name: "aftercareItems",
      title: "Downloads",
      type: "array",
      group: "aftercare",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "language",
              title: "Language Label",
              type: "localeString",
              description: 'e.g. "Lietuvių kalba" / "English"',
            },
            { name: "description", title: "Description", type: "localeText" },
            { name: "buttonLabel", title: "Button Label", type: "localeString" },
            { name: "file", title: "Downloadable File", type: "file" },
          ],
          preview: {
            select: { title: "language.lt", subtitle: "description.lt" },
            prepare({ title, subtitle }) {
              return { title: title ?? "Download", subtitle };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title ?? "About Page" };
    },
  },
});
