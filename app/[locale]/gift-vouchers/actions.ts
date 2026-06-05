"use server";

import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/client";

export type VoucherOrderState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

type OrderDetails = {
  name: string;
  email: string;
  recipient?: string;
  amount?: string;
  design?: string;
  contactMethod?: string;
  instagramHandle?: string;
};

async function sendOrderEmail(o: OrderDetails) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping voucher order email.");
    return;
  }

  const from = process.env.RESEND_FROM ?? "Publikacija <onboarding@resend.dev>";
  const to = process.env.RESEND_TO ?? "info@publikacija.lt";
  const resend = new Resend(apiKey);

  const contact =
    o.contactMethod === "instagram"
      ? `Instagram: @${o.instagramHandle ?? "—"}`
      : "Email";

  const rows: [string, string][] = [
    ["Name", o.name],
    ["Email", o.email],
    ["Recipient", o.recipient || "—"],
    ["Amount", o.amount || "—"],
    ["Design", o.design || "—"],
    ["Preferred contact", contact],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#221c14;font-size:15px;line-height:1.6">
      <h2 style="margin:0 0 16px">New gift voucher order</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#7a7060;font-weight:600">${k}</td><td style="padding:4px 0">${v}</td></tr>`
          )
          .join("")}
      </table>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  await resend.emails.send({
    from,
    to,
    replyTo: o.email,
    subject: `New gift voucher order — ${o.name}`,
    html,
    text,
  });
}

export async function submitVoucherOrder(
  _prev: VoucherOrderState,
  formData: FormData
): Promise<VoucherOrderState> {
  const name          = (formData.get("name")          as string)?.trim();
  const email         = (formData.get("email")         as string)?.trim();
  const recipient     = (formData.get("recipient")     as string)?.trim();
  const amount        = (formData.get("amount")        as string)?.trim();
  const design        = (formData.get("design")        as string)?.trim();
  const contactMethod = (formData.get("contactMethod") as string)?.trim();
  const instagramRaw  = (formData.get("instagramHandle") as string)?.trim();
  const terms         = formData.get("terms");

  if (!name || !email) {
    return { status: "error", message: "Please fill in your name and email." };
  }
  if (!terms) {
    return { status: "error", message: "Please accept the Terms & Conditions." };
  }

  const instagram =
    contactMethod === "instagram" && instagramRaw
      ? instagramRaw.replace(/^@/, "")
      : undefined;

  try {
    await writeClient.create({
      _type: "voucherOrder",
      name,
      email,
      recipient:       recipient || undefined,
      amount:          amount    || undefined,
      design:          design    || undefined,
      contactMethod:   contactMethod || undefined,
      instagramHandle: instagram,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
  } catch (err) {
    console.error("Voucher order submission failed:", err);
    return { status: "error", message: "Something went wrong. Please email us directly at info@publikacija.lt" };
  }

  // Order is saved — email is best-effort and must not fail the submission.
  try {
    await sendOrderEmail({ name, email, recipient, amount, design, contactMethod, instagramHandle: instagram });
  } catch (err) {
    console.error("Voucher order email failed (order was still saved):", err);
  }

  return { status: "success" };
}
