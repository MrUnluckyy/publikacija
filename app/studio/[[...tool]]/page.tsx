/**
 * Sanity Studio at /studio
 *
 * Metadata is exported at the server level (required by Next.js).
 * The actual Studio is loaded client-side only via StudioWrapper to prevent
 * Turbopack resolving sanity-plugin-mux-input's `swr` dep as a server module.
 */
export { metadata, viewport } from "next-sanity/studio";

import StudioWrapper from "./StudioWrapper";

export default function StudioPage() {
  return <StudioWrapper />;
}
