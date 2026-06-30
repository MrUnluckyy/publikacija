import { defineField, defineType } from "sanity";

// Lets the client feature a single existing blog/news post on the homepage,
// rendered with the exact same UI as the news section (no carousel).
export default defineType({
  name: "featuredPost",
  title: "Featured Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "enabled",
      title: "Show on homepage",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide the featured post section entirely.",
    }),
    defineField({
      name: "label",
      title: "Eyebrow label",
      type: "localeString",
      description: 'Small heading above the section. Defaults to "Rekomenduojame" / "Featured" if left empty.',
    }),
    defineField({
      name: "post",
      title: "Post to feature",
      type: "reference",
      to: [{ type: "newsPost" }],
      description: "Choose which blog post to feature. Nothing shows until one is selected.",
    }),
  ],
  preview: {
    select: { title: "post.title.lt", media: "post.coverImage", enabled: "enabled" },
    prepare({ title, media, enabled }) {
      return {
        title: title ?? "Featured Blog Post",
        subtitle: enabled === false ? "Hidden" : "Visible",
        media,
      };
    },
  },
});
