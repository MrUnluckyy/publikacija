import { defineField, defineType } from "sanity";

export default defineType({
  name: "giftVouchersPage",
  title: "Gift Vouchers Page",
  type: "document",
  fields: [
    // ── Page header ────────────────────────────────────────────────────────────
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "localeString" }),
    defineField({ name: "heading", title: "Page Heading", type: "localeString" }),
    defineField({ name: "intro", title: "Intro Paragraph", type: "localeText" }),

    // ── How it works ───────────────────────────────────────────────────────────
    defineField({ name: "howItWorksLabel", title: '"How it works" Section Label', type: "localeString" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Step Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Step Title", type: "localeString" }),
            defineField({ name: "body", title: "Step Body", type: "localeText" }),
          ],
          preview: {
            select: { title: "stepNumber", subtitle: "title.lt" },
            prepare({ title, subtitle }) {
              return { title: `Step ${title}`, subtitle };
            },
          },
        },
      ],
    }),

    // ── Bottom CTA ─────────────────────────────────────────────────────────────
    defineField({ name: "readyHeading", title: "CTA Heading", type: "localeString" }),
    defineField({ name: "readyBody", title: "CTA Body", type: "localeText" }),
    defineField({ name: "orderVoucherLabel", title: '"Order Voucher" Button Label', type: "localeString" }),
    defineField({ name: "emailUsLabel", title: '"Email Us" Button Label', type: "localeString" }),
    defineField({ name: "getVoucherLabel", title: '"Get Voucher" Button Label (on each card)', type: "localeString" }),
  ],
  preview: {
    prepare() {
      return { title: "Gift Vouchers Page" };
    },
  },
});
