"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { submitBooking, type BookingState } from "./actions";

export type ServiceOption = { value: string; label: string };
export type ArtistOption = { id: string; name: string };

interface Props {
  services: ServiceOption[];
  artists: ArtistOption[];
}

const initial: BookingState = { status: "idle" };

const fieldClass =
  "bg-transparent border-2 border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[16px] placeholder:text-[#221c14]/30 focus:outline-none focus:border-[#221c14] transition-colors";

export default function BookingForm({ services, artists }: Props) {
  const t = useTranslations("book");
  const [state, action, pending] = useActionState(submitBooking, initial);
  const formRef = useRef<HTMLFormElement>(null);

  const [service, setService] = useState(services[0]?.value ?? "");
  const [method, setMethod] = useState<"instagram" | "email">("instagram");
  const [fileNames, setFileNames] = useState<string[]>([]);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-16">
        <div className="w-10 h-[4px] bg-[#221c14] mb-6" />
        <h3 className="text-[#221c14] text-2xl font-bold mb-3">{t("successHeading")}</h3>
        <p className="text-body text-[#221c14]/70 max-w-[560px]">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      className="border-b-2 border-[#221c14] px-5 md:px-10 py-12 md:py-16 max-w-[640px] flex flex-col gap-10"
    >
      {/* Service */}
      <div>
        <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mb-5">
          {t("selectService")}
        </p>
        <input type="hidden" name="service" value={service} />
        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => {
            const active = service === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setService(s.value)}
                className={`text-left border-2 px-5 py-5 transition-colors ${
                  active
                    ? "border-[#221c14] bg-[#221c14] text-[#e5e4d2]"
                    : "border-[#221c14]/20 text-[#221c14] hover:border-[#221c14]/50"
                }`}
              >
                <span className="font-bold text-[18px]">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Name + Email */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
            {t("nameLabel")} <span className="text-[#221c14]">{t("required")}</span>
          </label>
          <input name="name" type="text" required autoComplete="name" placeholder={t("namePlaceholder")} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
            {t("emailLabel")} <span className="text-[#221c14]">{t("required")}</span>
          </label>
          <input name="email" type="email" required autoComplete="email" placeholder={t("emailPlaceholder")} className={fieldClass} />
        </div>
      </div>

      {/* Preferred artist */}
      {artists.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
            {t("artistLabel")}
          </label>
          <select name="artist" defaultValue="" className={`${fieldClass} appearance-none cursor-pointer`}>
            <option value="">{t("artistAny")}</option>
            {artists.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Preferred dates */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
          {t("datesLabel")}
        </label>
        <input name="preferredDates" type="text" placeholder={t("datesPlaceholder")} className={fieldClass} />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
          {t("messageLabel")}
        </label>
        <textarea name="message" rows={5} placeholder={t("messagePlaceholder")} className={`${fieldClass} resize-none`} />
      </div>

      {/* Reference images */}
      <div className="flex flex-col gap-2">
        <label className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase">
          {t("referenceLabel")}
        </label>
        <label className="self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 cursor-pointer hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors">
          {t("referenceButton")}
          <input
            type="file"
            name="referenceImages"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => setFileNames(Array.from(e.target.files ?? []).map((f) => f.name))}
          />
        </label>
        <p className="text-[#221c14]/40 text-[13px]">
          {fileNames.length ? fileNames.join(", ") : t("referenceHint")}
        </p>
      </div>

      {/* Preferred contact */}
      <div>
        <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase mb-5">
          {t("contactLabel")}
        </p>
        <input type="hidden" name="contactMethod" value={method} />
        <div className="flex flex-wrap gap-6">
          {([
            { id: "instagram" as const, label: t("instagramOption") },
            { id: "email" as const, label: t("emailOption") },
          ]).map((m) => (
            <button key={m.id} type="button" onClick={() => setMethod(m.id)} className="flex items-center gap-3 cursor-pointer group">
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
            placeholder={t("instagramPlaceholder")}
            className={`${fieldClass} mt-5 w-full sm:w-[400px]`}
          />
        )}
      </div>

      {state.status === "error" && (
        <p className="text-red-700 text-[14px]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? t("submitting") : t("submit")}
      </button>

      <p className="text-[#221c14]/40 text-[13px]">{t("replyTime")}</p>
    </form>
  );
}
