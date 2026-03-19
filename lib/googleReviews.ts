import type { ReviewData } from "@/sanity/types";

interface GoogleReview {
  author_name: string;
  text: string;
  rating: number;
  time: number;
}

interface PlacesResponse {
  result?: { reviews?: GoogleReview[] };
  status: string;
}

export async function getGoogleReviews(): Promise<ReviewData[]> {
  const apiKey   = process.env.GOOGLE_PLACES_API_KEY;
  const placeId  = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return [];

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`,
      { next: { revalidate: 3600 } } // cache for 1 hour
    );

    
    const data: PlacesResponse = await res.json();
    console.log("REVIEWS", data)

    if (data.status !== "OK" || !data.result?.reviews) return [];

    return data.result.reviews
      .filter((r) => r.text?.trim()) // skip reviews with no text
      .map((r, i) => ({
        _id:    `google-${i}`,
        author: r.author_name,
        body:   r.text,
        rating: r.rating,
        date:   new Date(r.time * 1000).toISOString(),
      }));
  } catch {
    return [];
  }
}
