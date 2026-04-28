import { defineField, defineType } from "sanity";

export default defineType({
  name: "bookPage",
  title: "Booking Page",
  type: "document",
  fields: [
    // ── Page header ────────────────────────────────────────────────────────────
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "localeString" }),
    defineField({ name: "heading", title: "Page Heading", type: "localeString" }),

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

    // ── Workshop special section ───────────────────────────────────────────────
    defineField({ name: "workshopHeading", title: "Workshop Section Heading", type: "localeString" }),
    defineField({ name: "workshopBody", title: "Workshop Section Body", type: "localeText" }),
    defineField({ name: "workshopCtaLabel", title: "Workshop CTA Label", type: "localeString", description: 'e.g. "Registruotis per Luma"' }),
  ],
  preview: {
    prepare() {
      return { title: "Booking Page" };
    },
  },
});
