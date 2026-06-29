"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { submitBooking, type BookingState } from "./actions";
import ArrowIcon from "@/components/ui/ArrowIcon";
import TermsCheckbox from "@/components/TermsCheckbox";

export type ServiceOption = { value: string; label: string };
export type ArtistOption = { id: string; name: string };
export type WorkshopContent = {
  heading?: string | null;
  body?: string | null;
  facts: { label: string | null; value: string | null }[];
};

interface Props {
  services: ServiceOption[];
  artists: ArtistOption[];
  locale: string;
  instagramUrl?: string | null;
  workshop: WorkshopContent;
  initialService?: string;
}

const initial: BookingState = { status: "idle" };

const fieldClass =
  "bg-transparent border-2 border-[#221c14]/25 px-4 py-3 text-[#221c14] text-[16px] placeholder:text-[#221c14]/30 focus:outline-none focus:border-[#221c14] transition-colors";
const labelClass = "text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase";

export default function BookingForm({ services, artists, locale, instagramUrl, workshop, initialService }: Props) {
  const t = useTranslations("book");
  const [state, action, pending] = useActionState(submitBooking, initial);
  const formRef = useRef<HTMLFormElement>(null);

  const [service, setService] = useState(
    initialService && services.some((s) => s.value === initialService)
      ? initialService
      : services[0]?.value ?? "Tattoo"
  );
  const [method, setMethod] = useState<"instagram" | "email">("instagram");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const isWorkshop = service === "Workshop";

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="px-5 md:px-10 py-16">
        <div className="w-10 h-[4px] bg-[#221c14] mb-6" />
        <h3 className="text-subtitle text-[#221c14] mb-3">{t("successHeading")}</h3>
        <p className="text-body text-[#221c14]/70 max-w-[560px]">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      className="px-5 md:px-10 py-12 md:py-16 flex flex-col gap-10 max-w-[640px]"
    >
      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="locale" value={locale} />

      {/* Service chooser */}
      <div>
        <p className={`${labelClass} mb-5`}>{t("selectService")}</p>
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

      {/* Workshop details panel */}
      {isWorkshop && (workshop.heading || workshop.body || workshop.facts.length > 0 || instagramUrl) && (
        <div className="border-2 border-[#221c14] p-6 md:p-8 flex flex-col gap-5">
          {workshop.heading && <h3 className="text-subtitle text-[#221c14]">{workshop.heading}</h3>}
          {workshop.body && <p className="text-body text-[#221c14]/80">{workshop.body}</p>}
          {workshop.facts.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t-2 border-[#221c14]/15 pt-5">
              {workshop.facts.map((f, i) => (
                <div key={i}>
                  <dt className="text-[#221c14]/50 font-bold text-[12px] tracking-[2px] uppercase mb-1">{f.label}</dt>
                  <dd className="text-body text-[#221c14]">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2 text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase border-b-2 border-[#221c14]/30 hover:border-[#221c14] transition-colors"
            >
              {t("instagramCta")}
              <ArrowIcon direction="up-right" size={12} strokeWidth={2.5} />
            </a>
          )}
        </div>
      )}

      {/* Name + Email (shared) */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>
            {t("nameLabel")} <span className="text-[#221c14]">{t("required")}</span>
          </label>
          <input name="name" type="text" required autoComplete="name" placeholder={t("namePlaceholder")} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>
            {t("emailLabel")} <span className="text-[#221c14]">{t("required")}</span>
          </label>
          <input name="email" type="email" required autoComplete="email" placeholder={t("emailPlaceholder")} className={fieldClass} />
        </div>
      </div>

      {isWorkshop ? (
        /* ── Workshop fields ───────────────────────────────────────────── */
        <>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>{t("participantsLabel")}</label>
            <input
              name="participants"
              type="number"
              min={1}
              max={5}
              placeholder={t("participantsPlaceholder")}
              className={`${fieldClass} w-full sm:w-[200px]`}
            />
            <p className="text-[#221c14]/40 text-[13px]">{t("participantsHint")}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>{t("workshopDatesLabel")}</label>
            <input name="preferredDates" type="text" placeholder={t("workshopDatesPlaceholder")} className={fieldClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>{t("workshopMessageLabel")}</label>
            <textarea name="message" rows={4} placeholder={t("workshopMessagePlaceholder")} className={`${fieldClass} resize-none`} />
          </div>
        </>
      ) : (
        /* ── Tattoo fields ─────────────────────────────────────────────── */
        <>
          {artists.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>{t("artistLabel")}</label>
              <select name="artist" defaultValue="" className={`${fieldClass} appearance-none cursor-pointer`}>
                <option value="">{t("artistAny")}</option>
                {artists.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>{t("datesLabel")}</label>
            <input name="preferredDates" type="text" placeholder={t("datesPlaceholder")} className={fieldClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>{t("messageLabel")}</label>
            <textarea name="message" rows={5} placeholder={t("messagePlaceholder")} className={`${fieldClass} resize-none`} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>{t("referenceLabel")}</label>
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
        </>
      )}

      {/* Preferred contact (shared) */}
      <div>
        <p className={`${labelClass} mb-5`}>{t("contactLabel")}</p>
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

      {/* Terms */}
      <TermsCheckbox
        checked={agreed}
        onChange={setAgreed}
        agreeLabel={t("termsAgree")}
        termsLabel={t("terms")}
      />

      {state.status === "error" && <p className="text-red-700 text-[14px]">{state.message}</p>}

      <button
        type="submit"
        disabled={pending || !agreed}
        className="self-start border-2 border-[#221c14] text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? t("submitting") : t("submit")}
      </button>

      <p className="text-[#221c14]/40 text-[13px]">{t("replyTime")}</p>
    </form>
  );
}
