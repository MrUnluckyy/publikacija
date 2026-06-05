"use server";

import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/client";

export type BookingState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const MAX_IMAGES = 6;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

type BookingEmail = {
  name: string;
  email: string;
  service?: string;
  artistName?: string;
  contactMethod?: string;
  instagramHandle?: string;
  preferredDates?: string;
  message?: string;
  imageCount: number;
};

async function sendBookingEmail(b: BookingEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping booking email.");
    return;
  }

  const from = process.env.RESEND_FROM ?? "Publikacija <onboarding@resend.dev>";
  const to = process.env.RESEND_TO ?? "info@publikacija.lt";
  const resend = new Resend(apiKey);

  const contact =
    b.contactMethod === "instagram"
      ? `Instagram: @${b.instagramHandle ?? "—"}`
      : "Email";

  const rows: [string, string][] = [
    ["Service", b.service || "—"],
    ["Name", b.name],
    ["Email", b.email],
    ["Preferred artist", b.artistName || "Any"],
    ["Preferred contact", contact],
    ["Preferred dates", b.preferredDates || "—"],
    ["Message", b.message || "—"],
    ["Reference images", b.imageCount ? `${b.imageCount} attached — view in Studio` : "None"],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#221c14;font-size:15px;line-height:1.6">
      <h2 style="margin:0 0 16px">New booking request</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#7a7060;font-weight:600;vertical-align:top">${k}</td><td style="padding:4px 0;white-space:pre-wrap">${v}</td></tr>`
          )
          .join("")}
      </table>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  await resend.emails.send({
    from,
    to,
    replyTo: b.email,
    subject: `New booking request — ${b.service || "Session"} — ${b.name}`,
    html,
    text,
  });
}

async function uploadReferenceImages(files: File[]) {
  const images: { _type: "image"; _key: string; asset: { _type: "reference"; _ref: string } }[] = [];

  for (const file of files.slice(0, MAX_IMAGES)) {
    if (!file || file.size === 0) continue;
    if (!file.type.startsWith("image/")) continue;
    if (file.size > MAX_IMAGE_BYTES) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await writeClient.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    images.push({
      _type: "image",
      _key: asset._id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12) + images.length,
      asset: { _type: "reference", _ref: asset._id },
    });
  }

  return images;
}

export async function submitBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const name           = (formData.get("name")           as string)?.trim();
  const email          = (formData.get("email")          as string)?.trim();
  const service        = (formData.get("service")        as string)?.trim();
  const artistId       = (formData.get("artist")         as string)?.trim();
  const contactMethod  = (formData.get("contactMethod")  as string)?.trim();
  const instagramRaw   = (formData.get("instagramHandle") as string)?.trim();
  const preferredDates = (formData.get("preferredDates") as string)?.trim();
  const message        = (formData.get("message")        as string)?.trim();

  if (!name || !email) {
    return { status: "error", message: "Please fill in your name and email." };
  }

  const instagram =
    contactMethod === "instagram" && instagramRaw
      ? instagramRaw.replace(/^@/, "")
      : undefined;

  // Look up the chosen artist's name for the notification email.
  let artistName: string | undefined;
  if (artistId) {
    artistName = await writeClient
      .fetch<string | null>(`*[_type == "artist" && _id == $id][0].name`, { id: artistId })
      .then((n) => n ?? undefined)
      .catch(() => undefined);
  }

  try {
    const files = formData.getAll("referenceImages") as File[];
    const referenceImages = await uploadReferenceImages(files);

    await writeClient.create({
      _type: "bookingRequest",
      name,
      email,
      service:        service || undefined,
      preferredArtist: artistId ? { _type: "reference", _ref: artistId } : undefined,
      contactMethod:  contactMethod || undefined,
      instagramHandle: instagram,
      preferredDates: preferredDates || undefined,
      message:        message || undefined,
      referenceImages: referenceImages.length ? referenceImages : undefined,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    // Order is saved — email is best-effort and must not fail the submission.
    try {
      await sendBookingEmail({
        name, email, service, artistName, contactMethod,
        instagramHandle: instagram, preferredDates, message,
        imageCount: referenceImages.length,
      });
    } catch (err) {
      console.error("Booking email failed (request was still saved):", err);
    }

    return { status: "success" };
  } catch (err) {
    console.error("Booking submission failed:", err);
    return { status: "error", message: "Something went wrong. Please email us directly at info@publikacija.lt" };
  }
}
