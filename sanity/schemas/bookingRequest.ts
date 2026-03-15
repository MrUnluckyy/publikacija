import { defineField, defineType } from "sanity";

export default defineType({
  name: "bookingRequest",
  title: "Booking Request",
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
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "string",
      options: {
        list: [
          { title: "Tattoo", value: "Tattoo" },
          { title: "Linocut / Print", value: "Print" },
          { title: "Workshop", value: "Workshop" },
          { title: "Gift Voucher", value: "Gift Voucher" },
        ],
      },
    }),
    defineField({
      name: "message",
      title: "Message / Idea",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
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
          { title: "Booked", value: "booked" },
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
    select: { title: "name", subtitle: "service", description: "status" },
    prepare({ title, subtitle, description }) {
      return { title, subtitle: `${subtitle ?? "–"} · ${description ?? "new"}` };
    },
  },
});
