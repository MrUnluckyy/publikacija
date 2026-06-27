"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import TermsCheckbox from "@/components/TermsCheckbox";
import { submitVoucherOrder, type VoucherOrderState } from "@/app/[locale]/gift-vouchers/actions";

export type VoucherDesign = {
  id: string;
  label: string;
  imageUrl: string | null;
};

export interface VoucherFormLabels {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  recipientLabel: string;
  recipientPlaceholder: string;
  amountLabel: string;
  amountPlaceholder: string;
  selectDesign: string;
  selectContact: string;
  instagramOption: string;
  emailOption: string;
  instagramPlaceholder: string;
  termsAgree: string;
  terms: string;
  send: string;
  sending: string;
  required: string;
  successHeading: string;
  successBody: string;
}

interface Props {
  designs: VoucherDesign[];
  labels: VoucherFormLabels;
}

const initial: VoucherOrderState = { status: "idle" };

const fieldClass =
  "bg-transparent border-2 border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[16px] placeholder:text-[#221c14]/30 focus:outline-none focus:border-[#221c14] transition-colors";

export default function VoucherOrderForm({ designs, labels }: Props) {
  const [state, action, pending] = useActionState(submitVoucherOrder, initial);
  const formRef = useRef<HTMLFormElement>(null);

  const [design, setDesign] = useState(designs[0]?.label ?? "");
  const [method, setMethod] = useState<"instagram" | "email">("instagram");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="px-5 md:px-10 py-16 max-w-[640px]">
        <div className="w-10 h-[4px] bg-[#221c14] mb-6" />
        <h3 className="text-[#221c14] text-2xl font-bold mb-3">{labels.successHeading}</h3>
        <p className="text-body text-[#221c14]/70">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="px-5 md:px-10 py-12 md:py-16 max-w-[640px] flex flex-col gap-10">

      {/* Your details */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
            {labels.nameLabel} <span className="text-[#221c14]">{labels.required}</span>
          </label>
          <input name="name" type="text" required autoComplete="name" placeholder={labels.namePlaceholder} className={fieldClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
            {labels.emailLabel} <span className="text-[#221c14]">{labels.required}</span>
          </label>
          <input name="email" type="email" required autoComplete="email" placeholder={labels.emailPlaceholder} className={fieldClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
            {labels.recipientLabel}
          </label>
          <input name="recipient" type="text" placeholder={labels.recipientPlaceholder} className={fieldClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
            {labels.amountLabel}
          </label>
          <input name="amount" type="text" inputMode="numeric" placeholder={labels.amountPlaceholder} className={fieldClass} />
        </div>
      </div>

      {/* Design selection */}
      {designs.length > 0 && (
        <div>
          <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mb-5">
            {labels.selectDesign}
          </p>
          <input type="hidden" name="design" value={design} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {designs.map((d) => {
              const active = design === d.label;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDesign(d.label)}
                  className={`text-left border-2 transition-colors ${active ? "border-[#221c14]" : "border-[#221c14]/20 hover:border-[#221c14]/50"}`}
                >
                  <div className="aspect-[2/3] relative overflow-hidden bg-[#221c14]/5">
                    {d.imageUrl && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={d.imageUrl} alt={d.label} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                  </div>
                  <span className={`block px-3 py-2.5 font-bold text-[14px] ${active ? "text-[#221c14]" : "text-[#221c14]/60"}`}>
                    {d.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact preference */}
      <div>
        <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mb-5">
          {labels.selectContact}
        </p>
        <input type="hidden" name="contactMethod" value={method} />
        <div className="flex flex-wrap gap-6">
          {([
            { id: "instagram" as const, label: labels.instagramOption },
            { id: "email" as const, label: labels.emailOption },
          ]).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  method === m.id ? "border-[#221c14]" : "border-[#221c14]/25 group-hover:border-[#221c14]/50"
                }`}
              >
                {method === m.id && <span className="w-2.5 h-2.5 rounded-full bg-[#221c14]" />}
              </span>
              <span className="text-[#221c14] font-bold text-[18px]">{m.label}</span>
            </button>
          ))}
        </div>

        {method === "instagram" && (
          <input
            name="instagramHandle"
            type="text"
            placeholder={labels.instagramPlaceholder}
            className={`${fieldClass} mt-5 w-full sm:w-[400px]`}
          />
        )}
      </div>

      {/* Terms */}
      <TermsCheckbox
        checked={agreed}
        onChange={setAgreed}
        agreeLabel={labels.termsAgree}
        termsLabel={labels.terms}
      />

      {state.status === "error" && (
        <p className="text-red-700 text-[14px]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending || !agreed}
        className="self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? labels.sending : labels.send}
      </button>
    </form>
  );
}
