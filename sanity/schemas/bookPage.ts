import { defineField, defineType } from "sanity";

export default defineType({
  name: "bookPage",
  title: "Booking Page",
  type: "document",
  fields: [
    // ── Page header ────────────────────────────────────────────────────────────
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "localeString" }),
    defineField({ name: "heading", title: "Page Heading", type: "localeString" }),
    defineField({ name: "intro", title: "Intro Paragraph", type: "localeText" }),

    // ── Service cards ──────────────────────────────────────────────────────────
    defineField({ name: "tattooTitle", title: "Tattoo — Card Title", type: "localeString" }),
    defineField({ name: "tattooDesc", title: "Tattoo — Card Description", type: "localeText" }),

    defineField({ name: "printTitle", title: "Print — Card Title", type: "localeString" }),
    defineField({ name: "printDesc", title: "Print — Card Description", type: "localeText" }),

    defineField({ name: "workshopTitle", title: "Workshop — Card Title", type: "localeString" }),
    defineField({ name: "workshopDesc", title: "Workshop — Card Description", type: "localeText" }),

    defineField({ name: "voucherTitle", title: "Gift Voucher — Card Title", type: "localeString" }),
    defineField({ name: "voucherDesc", title: "Gift Voucher — Card Description", type: "localeText" }),

    // ── Calendar / booking ─────────────────────────────────────────────────────
    defineField({ name: "calHeading", title: "Calendar Heading", type: "localeString", description: 'e.g. "Pasirinkite datą ir laiką"' }),

    // ── Workshop details panel (shown when "Workshop" is selected) ─────────────
    defineField({ name: "workshopHeading", title: "Workshop — Heading", type: "localeString" }),
    defineField({ name: "workshopBody", title: "Workshop — Description", type: "localeText" }),
    defineField({
      name: "workshopFacts",
      title: "Workshop — Facts",
      description: "Short labelled facts shown in the details panel, e.g. Duration · 2 h, Group size · 2–6, Price · 45 €",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label (e.g. Duration)", type: "localeString" },
            { name: "value", title: "Value (e.g. 2 hours)", type: "localeString" },
          ],
          preview: {
            select: { title: "label.lt", subtitle: "value.lt" },
            prepare({ title, subtitle }) {
              return { title: title ?? "Fact", subtitle };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Booking Page" };
    },
  },
});
