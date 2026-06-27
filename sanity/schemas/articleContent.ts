import { defineField, defineType, defineArrayMember } from "sanity";

// Reusable rich-text definition (used by Text and Media+Text sections).
const richText = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading", value: "h2" },
      { title: "Subheading", value: "h3" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [{ name: "href", type: "url", title: "URL" }],
        },
      ],
    },
  }),
];

function plainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((b) =>
      b && typeof b === "object" && Array.isArray((b as { children?: unknown[] }).children)
        ? (b as { children: { text?: string }[] }).children.map((c) => c.text ?? "").join("")
        : ""
    )
    .join(" ")
    .trim();
}

// ── Text section ─────────────────────────────────────────────────────────────
export const sectionText = defineType({
  name: "sectionText",
  title: "Text",
  type: "object",
  fields: [defineField({ name: "content", title: "Text", type: "array", of: richText })],
  preview: {
    select: { content: "content" },
    prepare({ content }) {
      const text = plainText(content);
      return { title: "Text", subtitle: text || "Empty" };
    },
  },
});

// ── Image section ────────────────────────────────────────────────────────────
export const sectionImage = defineType({
  name: "sectionImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: "alt", title: "Alt text", type: "string", description: "For accessibility & SEO" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "width",
      title: "Width (% on desktop)",
      type: "number",
      description: "Default 70. Mobile is always full width.",
      initialValue: 70,
      validation: (R) => R.min(20).max(100),
    }),
  ],
  preview: {
    select: { media: "image", title: "caption", alt: "alt" },
    prepare({ media, title, alt }) {
      return { title: "Image", subtitle: title || alt || "", media };
    },
  },
});

// ── Gallery section ──────────────────────────────────────────────────────────
export const sectionGallery = defineType({
  name: "sectionGallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
      validation: (R) => R.min(1),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "width",
      title: "Width (% on desktop)",
      type: "number",
      description: "Default 70. Mobile is always full width.",
      initialValue: 70,
      validation: (R) => R.min(20).max(100),
    }),
  ],
  preview: {
    select: { images: "images", caption: "caption" },
    prepare({ images, caption }) {
      const n = images?.length ?? 0;
      return { title: "Gallery", subtitle: caption || `${n} image${n === 1 ? "" : "s"}`, media: images?.[0] };
    },
  },
});

// ── Video section ────────────────────────────────────────────────────────────
export const sectionVideo = defineType({
  name: "sectionVideo",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "video", title: "Video file", type: "mux.video", validation: (R) => R.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "width",
      title: "Width (% on desktop)",
      type: "number",
      description: "Default 70. Mobile is always full width.",
      initialValue: 70,
      validation: (R) => R.min(20).max(100),
    }),
  ],
  preview: {
    select: { title: "caption" },
    prepare({ title }) {
      return { title: "Video", subtitle: title || "" };
    },
  },
});

// ── Pull quote section ───────────────────────────────────────────────────────
export const sectionQuote = defineType({
  name: "sectionQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Quote", type: "text", rows: 3, validation: (R) => R.required() }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
  ],
  preview: {
    select: { title: "text", subtitle: "attribution" },
    prepare({ title, subtitle }) {
      return { title: "Quote", subtitle: title ? `“${title}”${subtitle ? ` — ${subtitle}` : ""}` : "" };
    },
  },
});

// ── Media + text (combined) section ──────────────────────────────────────────
export const sectionMediaText = defineType({
  name: "sectionMediaText",
  title: "Media + text",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "video",
      title: "Video file",
      type: "mux.video",
      hidden: ({ parent }) => parent?.mediaType === "video" ? false : true,
    }),
    defineField({ name: "alt", title: "Image alt text", type: "string", hidden: ({ parent }) => parent?.mediaType !== "image" }),
    defineField({ name: "text", title: "Text", type: "array", of: richText }),
    defineField({
      name: "mediaPosition",
      title: "Media position (desktop)",
      type: "string",
      options: {
        list: [
          { title: "Media left", value: "left" },
          { title: "Media right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
  ],
  preview: {
    select: { media: "image", text: "text", mediaType: "mediaType" },
    prepare({ media, text, mediaType }) {
      return { title: "Media + text", subtitle: plainText(text) || `${mediaType ?? "image"} + text`, media };
    },
  },
});

// ── Localised list of sections ───────────────────────────────────────────────
const sectionsOf = [
  defineArrayMember({ type: "sectionText" }),
  defineArrayMember({ type: "sectionImage" }),
  defineArrayMember({ type: "sectionGallery" }),
  defineArrayMember({ type: "sectionVideo" }),
  defineArrayMember({ type: "sectionMediaText" }),
  defineArrayMember({ type: "sectionQuote" }),
];

export const localeSections = defineType({
  name: "localeSections",
  title: "Sections",
  type: "object",
  fields: [
    defineField({ name: "lt", title: "Lietuvių (LT) ★", type: "array", of: sectionsOf }),
    defineField({ name: "en", title: "English (EN)", type: "array", of: sectionsOf }),
  ],
});
