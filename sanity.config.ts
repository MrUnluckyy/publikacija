import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "default",
  title: "Publikacija Studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Hero Section")
              .child(
                S.document().schemaType("hero").documentId("hero-singleton")
              ),
            S.listItem()
              .title("About Section")
              .child(
                S.document().schemaType("about").documentId("about-singleton")
              ),
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("site-settings-singleton")
              ),
            S.divider(),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("portfolioItem").title("Portfolio Items"),
            S.documentTypeListItem("studioVideo").title("Videos"),
            S.documentTypeListItem("review").title("Reviews"),
            S.divider(),
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
