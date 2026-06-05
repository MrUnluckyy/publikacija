import { defineField, defineType } from "sanity";

export default defineType({
  name: "voucherOrder",
  title: "Voucher Order",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "recipient",
      title: "Recipient",
      type: "string",
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "string",
      description: "Voucher value requested by the customer",
    }),
    defineField({
      name: "design",
      title: "Gift Card Design",
      type: "string",
    }),
    defineField({
      name: "contactMethod",
      title: "Preferred Contact",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Email", value: "email" },
        ],
      },
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
      hidden: ({ parent }) => parent?.contactMethod !== "instagram",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Fulfilled", value: "fulfilled" },
          { title: "Closed", value: "closed" },
        ],
      },
      initialValue: "new",
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", design: "design", status: "status" },
    prepare({ title, design, status }) {
      return { title, subtitle: `${design ?? "–"} · ${status ?? "new"}` };
    },
  },
});
