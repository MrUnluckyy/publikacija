export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

// These are required at runtime but we keep them soft here so Next.js can
// still build / render placeholder UI before the project is configured.
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
