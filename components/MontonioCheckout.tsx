"use client";

import { useState } from "react";
import type { MontonioOrderRequest } from "@/app/api/montonio/route";

interface Props {
  amount: number;        // EUR cents, e.g. 5000 = €50
  description: string;
  label?: string;
  className?: string;
}

export default function MontonioCheckout({ amount, description, label, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    const body: MontonioOrderRequest = {
      amount,
      description,
      merchantReference: `pub-${Date.now()}`,
      returnUrl:         `${window.location.origin}/booking/success`,
      notificationUrl:   `${window.location.origin}/api/montonio/webhook`,
    };

    try {
      const res = await fetch("/api/montonio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Payment error");
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={
          className ??
          "border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        }
      >
        {loading ? "Redirecting…" : (label ?? "Buy now, pay later")}
      </button>
      {error && (
        <p className="mt-2 text-[#221c14] font-bold text-[13px] opacity-60">{error}</p>
      )}
    </div>
  );
}
