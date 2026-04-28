import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    // ── Text content ───────────────────────────────────────────────────────────
    defineField({
      name: "title1",
      title: "Heading Line 1",
      type: "localeString",
      description: 'e.g. "Publikacija"',
    }),
    defineField({
      name: "title2",
      title: "Heading Line 2",
      type: "localeString",
      description: 'e.g. "Tattoo"',
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "localeText",
    }),
    defineField({
      name: "service1",
      title: "Service Link 1 Label",
      type: "localeString",
      description: 'e.g. "Tatuiruotės / Tattoos"',
    }),
    defineField({
      name: "service2",
      title: "Service Link 2 Label",
      type: "localeString",
      description: 'e.g. "Linorytai / Linocut prints"',
    }),
    defineField({
      name: "service3",
      title: "Service Link 3 Label",
      type: "localeString",
      description: 'e.g. "Seminarai / Workshops"',
    }),

    // ── Media ──────────────────────────────────────────────────────────────────
    defineField({
      name: "backgroundVideo",
      title: "Studio Video",
      type: "mux.video",
      description: "Used in the video section below the hero.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hero Section" };
    },
  },
});
