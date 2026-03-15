"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitBooking, type BookingState } from "./actions";

const SERVICES = ["Tattoo", "Linocut / Print", "Workshop", "Gift Voucher"];

const initial: BookingState = { status: "idle" };

export default function BookingForm() {
  const [state, action, pending] = useActionState(submitBooking, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="border border-[#221c14]/20 p-10 text-center max-w-[560px]">
        <div className="w-10 h-[4px] bg-[#221c14] mx-auto mb-6" />
        <h3 className="text-[#221c14] text-xl font-medium mb-3">Request received</h3>
        <p className="text-[#585858] text-[15px] leading-[1.7em]">
          Thank you — we&apos;ll be in touch within 24 hours to discuss your project.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-5 max-w-[560px]">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#585858] text-[12px] tracking-[2px] uppercase">
          Name <span className="text-[#221c14]">*</span>
        </label>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="bg-transparent border border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[15px] placeholder:text-[#221c14]/30 focus:outline-none focus:border-[#221c14] transition-colors"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#585858] text-[12px] tracking-[2px] uppercase">
          Email <span className="text-[#221c14]">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="bg-transparent border border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[15px] placeholder:text-[#221c14]/30 focus:outline-none focus:border-[#221c14] transition-colors"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#585858] text-[12px] tracking-[2px] uppercase">Phone</label>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+370 600 00000"
          className="bg-transparent border border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[15px] placeholder:text-[#221c14]/30 focus:outline-none focus:border-[#221c14] transition-colors"
        />
      </div>

      {/* Service */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#585858] text-[12px] tracking-[2px] uppercase">Service</label>
        <select
          name="service"
          defaultValue=""
          className="bg-[#e5e4d2] border border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[15px] focus:outline-none focus:border-[#221c14] transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#585858] text-[12px] tracking-[2px] uppercase">
          Your idea / message <span className="text-[#221c14]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your idea, preferred style, size, placement, or any other details…"
          className="bg-transparent border border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[15px] placeholder:text-[#221c14]/30 focus:outline-none focus:border-[#221c14] transition-colors resize-none"
        />
      </div>

      {state.status === "error" && (
        <p className="text-red-700 text-[13px]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start border border-[#221c14] text-[#221c14] text-[14px] tracking-[3px] px-8 py-3.5 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? "Sending…" : "Send request"}
      </button>

      <p className="text-[#585858] text-[12px]">
        We reply within 24 h · info@publikacija.lt
      </p>
    </form>
  );
}
