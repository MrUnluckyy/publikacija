"use client";

import { useState } from "react";
import MontonioCheckout from "@/components/MontonioCheckout";
import { Link } from "@/i18n/navigation";

export type VoucherFormOption = {
  id: string;
  label: string;
  amount: string;
  amountCents: number;
};

interface Props {
  vouchers: VoucherFormOption[];
  labels: {
    selectVoucher: string;
    selectContact: string;
    instagramOption: string;
    emailOption: string;
    payOnlineOption: string;
    instagramPlaceholder: string;
    send: string;
    getVoucher: string;
    terms: string;
  };
}

export default function VoucherOrderForm({ vouchers, labels }: Props) {
  const [selectedId, setSelectedId] = useState(vouchers[0]?.id ?? "");
  const [method, setMethod] = useState<"instagram" | "email" | "pay">("instagram");
  const [handle, setHandle] = useState("");

  const selected = vouchers.find((v) => v.id === selectedId) ?? vouchers[0];
  const canPayOnline = (selected?.amountCents ?? 0) > 0;

  const contactMethods: Array<{ id: "instagram" | "email" | "pay"; label: string }> = [
    { id: "instagram", label: labels.instagramOption },
    { id: "email", label: labels.emailOption },
    ...(canPayOnline ? [{ id: "pay" as const, label: labels.payOnlineOption }] : []),
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const voucherInfo = `${selected.label} (${selected.amount})`;
    if (method === "instagram") {
      const sub = encodeURIComponent(`Dovanų kuponas – ${voucherInfo}`);
      const bdy = encodeURIComponent(
        `Sveiki,\n\nNorėčiau įsigyti dovanų kuponą: ${voucherInfo}\nMano Instagram: @${handle.replace(/^@/, "")}\n\nAčiū!`
      );
      window.location.href = `mailto:info@publikacija.lt?subject=${sub}&body=${bdy}`;
    } else if (method === "email") {
      const sub = encodeURIComponent(`Dovanų kuponas – ${voucherInfo}`);
      const bdy = encodeURIComponent(`Sveiki,\n\nNorėčiau įsigyti dovanų kuponą: ${voucherInfo}\n\nAčiū!`);
      window.location.href = `mailto:info@publikacija.lt?subject=${sub}&body=${bdy}`;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-5 md:px-10 py-12 md:py-16 max-w-[640px]">
      <div className="mb-10">
        <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[3px] uppercase mb-5">
          {labels.selectVoucher}
        </p>
        <div className="flex flex-col gap-4">
          {vouchers.map((v) => (
            <label key={v.id} className="flex items-center gap-4 cursor-pointer group">
              <input
                type="radio"
                name="voucher"
                value={v.id}
                checked={selectedId === v.id}
                onChange={() => setSelectedId(v.id)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  selectedId === v.id
                    ? "border-[#221c14]"
                    : "border-[#221c14]/25 group-hover:border-[#221c14]/50"
                }`}
              >
                {selectedId === v.id && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#221c14]" />
                )}
              </span>
              <span className="text-[#221c14] font-bold text-[20px]">
                {v.label}
                <span className="text-[#221c14]/40 ml-2 text-[16px]">— {v.amount}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[3px] uppercase mb-5">
          {labels.selectContact}
        </p>
        <div className="flex flex-wrap gap-6">
          {contactMethods.map((m) => (
            <label key={m.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="method"
                value={m.id}
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  method === m.id
                    ? "border-[#221c14]"
                    : "border-[#221c14]/25 group-hover:border-[#221c14]/50"
                }`}
              >
                {method === m.id && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#221c14]" />
                )}
              </span>
              <span className="text-[#221c14] font-bold text-[18px]">{m.label}</span>
            </label>
          ))}
        </div>
      </div>

      {method === "instagram" && (
        <div className="mb-10">
          <input
            type="text"
            placeholder={labels.instagramPlaceholder}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
            className="w-full sm:w-[400px] bg-transparent border-b-2 border-[#221c14]/40 text-[#221c14] font-bold text-[18px] py-3 outline-none placeholder:text-[#221c14]/25 focus:border-[#221c14] transition-colors"
          />
        </div>
      )}

      {method === "pay" && selected ? (
        <MontonioCheckout
          amount={selected.amountCents}
          description={`Publikacija Gift Voucher – ${selected.label}`}
          label={labels.getVoucher}
          className="border-2 border-[#221c14] text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200 disabled:opacity-40"
        />
      ) : (
        <button
          type="submit"
          className="border-2 border-[#221c14] text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
        >
          {labels.send}
        </button>
      )}

      <div className="mt-8">
        <Link
          href="/taisykles-ir-salygos"
          className="text-[#221c14]/35 font-bold text-[13px] tracking-[1px] uppercase hover:text-[#221c14]/60 transition-colors"
        >
          {labels.terms}
        </Link>
      </div>
    </form>
  );
}
