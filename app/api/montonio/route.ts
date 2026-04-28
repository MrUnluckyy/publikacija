import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ── Montonio credentials — add to .env.local ──────────────────────────────
// MONTONIO_ACCESS_KEY=your_access_key
// MONTONIO_SECRET_KEY=your_secret_key
// MONTONIO_ENV=sandbox   (use "production" when going live)

const ACCESS_KEY = process.env.MONTONIO_ACCESS_KEY ?? "";
const SECRET_KEY = process.env.MONTONIO_SECRET_KEY ?? "";
const IS_SANDBOX = (process.env.MONTONIO_ENV ?? "sandbox") !== "production";
const API_URL    = IS_SANDBOX
  ? "https://api.sandbox.montonio.com"
  : "https://api.montonio.com";

function signJwt(payload: object): string {
  const header  = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body    = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig     = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${sig}`;
}

export interface MontonioOrderRequest {
  amount: number;          // EUR cents, e.g. 5000 = €50.00
  description: string;     // shown in Montonio checkout
  merchantReference: string; // your internal order/booking ID
  returnUrl: string;       // where to send the customer after payment
  notificationUrl: string; // your webhook endpoint for payment confirmation
}

export async function POST(req: NextRequest) {
  if (!ACCESS_KEY || !SECRET_KEY) {
    return NextResponse.json(
      { error: "Montonio credentials not configured. Set MONTONIO_ACCESS_KEY and MONTONIO_SECRET_KEY in .env.local." },
      { status: 503 }
    );
  }

  const body = (await req.json()) as MontonioOrderRequest;

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: ACCESS_KEY,
    iat: now,
    exp: now + 600, // token valid for 10 minutes
    payment: {
      amount: body.amount / 100, // Montonio uses decimal EUR, not cents
      currency: "EUR",
      merchant_reference: body.merchantReference,
      merchant_return_url: body.returnUrl,
      merchant_notification_url: body.notificationUrl,
      checkout_email: null,
      purchase_country: "LT",
    },
  };

  const token = signJwt(payload);

  // Create order in Montonio
  const montonioRes = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ payment_token: token }),
  });

  if (!montonioRes.ok) {
    const err = await montonioRes.text();
    return NextResponse.json({ error: err }, { status: montonioRes.status });
  }

  const data = (await montonioRes.json()) as { payment_url: string };
  return NextResponse.json({ paymentUrl: data.payment_url });
}
