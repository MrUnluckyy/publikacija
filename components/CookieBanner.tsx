"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  readConsent,
  writeConsent,
  OPEN_EVENT,
  type ConsentState,
} from "@/lib/consent";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Show on first visit (no stored choice); allow reopening from a footer link.
  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }

    const reopen = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setShowDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function save(state: ConsentState) {
    writeConsent(state);
    setOpen(false);
    setShowDetails(false);
  }

  const acceptAll = () => save({ analytics: true, marketing: true });
  const rejectAll = () => save({ analytics: false, marketing: false });
  const savePrefs = () => save({ analytics, marketing });

  const btnPrimary =
    "border-2 border-[#221c14] bg-[#221c14] text-[#e5e4d2] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-transparent hover:text-[#221c14] transition-colors duration-200";
  const btnSecondary =
    "border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={t("title")}
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[90] p-4 md:p-6"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mx-auto max-w-[860px] border-2 border-[#221c14] bg-[#e5e4d2] p-5 md:p-7 shadow-[6px_6px_0_0_#221c14]">
            <h2 className="text-[#221c14] font-extrabold text-[18px] md:text-[20px] mb-2">
              {t("title")}
            </h2>
            <p className="text-[#221c14]/80 text-[15px] leading-relaxed mb-5 max-w-[640px]">
              {t("body")}{" "}
              <Link href="/taisykles-ir-salygos" className="underline hover:opacity-60">
                {t("learnMore")}
              </Link>
            </p>

            {/* Category toggles */}
            <AnimatePresence initial={false}>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 border-t-2 border-[#221c14]/15 pt-5 mb-5">
                    <Row
                      title={t("necessaryTitle")}
                      desc={t("necessaryDesc")}
                      checked
                      disabled
                      always={t("always")}
                    />
                    <Row
                      title={t("analyticsTitle")}
                      desc={t("analyticsDesc")}
                      checked={analytics}
                      onChange={setAnalytics}
                    />
                    <Row
                      title={t("marketingTitle")}
                      desc={t("marketingDesc")}
                      checked={marketing}
                      onChange={setMarketing}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button onClick={acceptAll} className={btnPrimary}>
                {t("acceptAll")}
              </button>
              <button onClick={rejectAll} className={btnSecondary}>
                {t("rejectAll")}
              </button>
              {showDetails ? (
                <button onClick={savePrefs} className={btnSecondary}>
                  {t("savePrefs")}
                </button>
              ) : (
                <button
                  onClick={() => setShowDetails(true)}
                  className="self-start sm:ml-auto text-[#221c14]/60 font-bold text-[12px] tracking-[2px] uppercase hover:text-[#221c14] transition-colors"
                >
                  {t("customize")}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  title,
  desc,
  checked,
  disabled,
  always,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  always?: string;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[#221c14] font-bold text-[15px]">{title}</p>
        <p className="text-[#221c14]/60 text-[13px] leading-snug">{desc}</p>
      </div>
      {disabled ? (
        <span className="shrink-0 mt-1 text-[#221c14]/40 font-bold text-[11px] tracking-[2px] uppercase">
          {always}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={() => onChange?.(!checked)}
          className={`shrink-0 mt-1 relative w-11 h-6 border-2 border-[#221c14] transition-colors ${
            checked ? "bg-[#221c14]" : "bg-transparent"
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 transition-all ${
              checked ? "left-[22px] bg-[#e5e4d2]" : "left-0.5 bg-[#221c14]"
            }`}
          />
        </button>
      )}
    </div>
  );
}
