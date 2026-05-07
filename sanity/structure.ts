import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Announcement Bar")
        .id("announcementBar")
        .child(
          S.document()
            .schemaType("announcementBar")
            .documentId("announcement-bar-singleton")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "announcementBar"
      ),
    ]);
