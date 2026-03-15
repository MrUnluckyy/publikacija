"use server";

import { writeClient } from "@/sanity/lib/client";

export type BookingState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const name    = (formData.get("name")    as string)?.trim();
  const email   = (formData.get("email")   as string)?.trim();
  const phone   = (formData.get("phone")   as string)?.trim();
  const service = (formData.get("service") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  try {
    await writeClient.create({
      _type: "bookingRequest",
      name,
      email,
      phone:   phone   || undefined,
      service: service || undefined,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
    return { status: "success" };
  } catch (err) {
    console.error("Booking submission failed:", err);
    return { status: "error", message: "Something went wrong. Please email us directly at info@publikacija.lt" };
  }
}
