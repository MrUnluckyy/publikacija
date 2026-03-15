"use client";

import dynamic from "next/dynamic";

// Load the studio only in the browser — keeps swr/mux-plugin deps client-side only
const StudioClient = dynamic(() => import("./StudioClient"), { ssr: false });

export default function StudioWrapper() {
  return <StudioClient />;
}
