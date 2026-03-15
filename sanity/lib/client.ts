import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const base = {
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  stega: false as const,
};

export const client = createClient({
  ...base,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
});

// Write client — used only in Server Actions (never sent to the browser)
export const writeClient = createClient({
  ...base,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN,
});
