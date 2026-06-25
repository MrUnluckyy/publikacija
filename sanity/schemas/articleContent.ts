import { defineField, defineType, defineArrayMember } from "sanity";

// ── Single image ────────────────────────────────────────────────────────────
export const articleImage = defineType({
  name: "articleImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({ name: "alt", title: "Alt text", type: "string", description: "For accessibility & SEO" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "fullWidth",
      title: "Full-bleed (edge to edge)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { media: "image", title: "caption", alt: "alt" },
    prepare({ media, title, alt }) {
      return { title: title || alt || "Image", media };
    },
  },
});

// ── Gallery (multiple images) ───────────────────────────────────────────────
export const articleGallery = defineType({
  name: "articleGallery",
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
  ],
  preview: {
    select: { images: "images" },
    prepare({ images }) {
      const n = images?.length ?? 0;
      return { title: `Gallery — ${n} image${n === 1 ? "" : "s"}`, media: images?.[0] };
    },
  },
});

// ── Video (Mux) ─────────────────────────────────────────────────────────────
export const articleVideo = defineType({
  name: "articleVideo",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "video", title: "Video file", type: "mux.video", validation: (R) => R.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { title: "caption" },
    prepare({ title }) {
      return { title: title || "Video" };
    },
  },
});

// ── Pull quote ──────────────────────────────────────────────────────────────
export const articleQuote = defineType({
  name: "articleQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Quote", type: "text", rows: 3, validation: (R) => R.required() }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
  ],
  preview: {
    select: { title: "text", subtitle: "attribution" },
    prepare({ title, subtitle }) {
      return { title: title ? `“${title}”` : "Quote", subtitle };
    },
  },
});

// ── Shared rich-content members (reused for both locales) ────────────────────
const articleOf = [
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
  defineArrayMember({ type: "articleImage" }),
  defineArrayMember({ type: "articleGallery" }),
  defineArrayMember({ type: "articleVideo" }),
  defineArrayMember({ type: "articleQuote" }),
];

// ── Localised article body ──────────────────────────────────────────────────
export const localeArticle = defineType({
  name: "localeArticle",
  title: "Article Content",
  type: "object",
  fields: [
    defineField({ name: "lt", title: "Lietuvių (LT) ★", type: "array", of: articleOf }),
    defineField({ name: "en", title: "English (EN)", type: "array", of: articleOf }),
  ],
});
