import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "backgroundVideo",
      title: "Studio Video",
      type: "mux.video",
      description: "Used in the video section below the hero. Upload your studio/process video here.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hero Section" };
    },
  },
});
