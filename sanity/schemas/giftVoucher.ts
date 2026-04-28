import { defineField, defineType } from "sanity";

export default defineType({
  name: "giftVoucher",
  title: "Gift Voucher",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "amount", title: "Price (e.g. €50 or Individuali/Custom)", type: "string", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({
      name: "idealLt",
      title: "Ideal for — Lietuvių (LT) ★",
      description: "Short bullet points shown under the description",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "idealEn",
      title: "Ideal for — English (EN)",
      description: "Leave blank to use the LT version",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { titleLt: "label.lt", subtitle: "amount", media: "coverImage" },
    prepare({ titleLt, subtitle, media }) {
      return { title: titleLt ?? "Voucher", subtitle, media };
    },
  },
});
