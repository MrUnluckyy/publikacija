import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion } from "./sanity/env";

export default defineConfig({
  name: "default",
  title: "Publikacija Studio",

  projectId: "a81smloy",
  dataset: "stage",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ── Landing page ─────────────────────────────────────────
            S.listItem()
              .title("Hero Section")
              .child(S.document().schemaType("hero").documentId("hero-singleton")),
            S.listItem()
              .title("Video Section")
              .child(S.document().schemaType("videoSection").documentId("video-section-singleton")),
            S.documentTypeListItem("service").title("Services"),

            S.divider(),

            // ── Inner pages ──────────────────────────────────────────
            S.listItem()
              .title("Booking Page")
              .child(S.document().schemaType("bookPage").documentId("book-page-singleton")),
            S.listItem()
              .title("Gift Vouchers Page")
              .child(S.document().schemaType("giftVouchersPage").documentId("gift-vouchers-page-singleton")),
            S.listItem()
              .title("About Page")
              .child(S.document().schemaType("about").documentId("about-singleton")),
            S.listItem()
              .title("Terms & Conditions")
              .child(S.documentTypeList("termsPage").title("Terms & Conditions")),

            S.divider(),

            // ── Global settings ──────────────────────────────────────
            S.listItem()
              .title("Site Settings & Contact")
              .child(S.document().schemaType("siteSettings").documentId("site-settings-singleton")),

            S.divider(),

            // ── Collections ──────────────────────────────────────────
            S.documentTypeListItem("portfolioItem").title("Portfolio Items"),
            S.documentTypeListItem("giftVoucher").title("Gift Vouchers"),
            S.documentTypeListItem("artist").title("Artists"),
            S.documentTypeListItem("review").title("Reviews (fallback)"),

            S.divider(),

            // ── Operations ───────────────────────────────────────────
            S.documentTypeListItem("bookingRequest").title("Booking Requests"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    muxInput({ mp4_support: "standard" }),
  ],

  schema: {
    types: schemaTypes,
  },
});
