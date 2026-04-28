import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoSection",
  title: "Video Section",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "localeString",
      description: 'Small uppercase label above the heading, e.g. "Studija / The Studio"',
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "localeString",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "localeText",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "localeString",
      description: 'e.g. "Rezervuoti vizitą / Book a visit"',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Video Section" };
    },
  },
});
