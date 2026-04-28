/**
 * Sanity Studio at /studio
 *
 * Metadata is exported at the server level (required by Next.js).
 * The actual Studio is loaded client-side only via StudioWrapper to prevent
 * Turbopack resolving sanity-plugin-mux-input's `swr` dep as a server module.
 */
export { metadata, viewport } from "next-sanity/studio";

import { redirect } from "next/navigation";
import StudioWrapper from "./StudioWrapper";

export default async function StudioPage({
  params,
}: {
  params: Promise<{ tool?: string[] }>;
}) {
  const { tool } = await params;

  // Redirect bare /studio to /studio/desk so the Studio never sees an empty tool
  if (!tool || tool.length === 0) {
    redirect("/studio/desk");
  }

  return <StudioWrapper />;
}
