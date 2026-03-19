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
            // ── Singletons ──────────────────────────────────────────
            S.listItem()
              .title("Hero Section")
              .child(S.document().schemaType("hero").documentId("hero-singleton")),
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("site-settings-singleton")),

            S.divider(),

            // ── Collections ─────────────────────────────────────────
            S.documentTypeListItem("portfolioItem").title("Portfolio Items"),
            S.documentTypeListItem("review").title("Reviews (fallback)"),

            S.divider(),

            // ── Operations ──────────────────────────────────────────
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
