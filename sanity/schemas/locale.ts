import { defineField, defineType } from "sanity";

// ── Shared localized field types ───────────────────────────────────────────────
// LT is the primary language and always the fallback.
// EN is optional — leave blank and the LT value is served.

export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "lt", title: "Lietuvių (LT) ★", type: "string" }),
    defineField({ name: "en", title: "English (EN)", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "lt", title: "Lietuvių (LT) ★", type: "text", rows: 3 }),
    defineField({ name: "en", title: "English (EN)", type: "text", rows: 3 }),
  ],
});

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized Rich Text",
  type: "object",
  fields: [
    defineField({ name: "lt", title: "Lietuvių (LT) ★", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "en", title: "English (EN)", type: "array", of: [{ type: "block" }] }),
  ],
});
