"use client";

import { Link } from "@/i18n/navigation";

// Controlled terms checkbox. Submits `name="terms"` (value "on") when checked.
// The styled box is custom-rendered so it looks consistent across browsers.
export default function TermsCheckbox({
  checked,
  onChange,
  agreeLabel,
  termsLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  agreeLabel: string;
  termsLabel: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        name="terms"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <span
        aria-hidden
        className={`w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#221c14]/40 ${
          checked ? "bg-[#221c14] border-[#221c14]" : "border-[#221c14]/30"
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="#e5e4d2"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className="text-[#221c14] text-[15px] leading-snug">
        {agreeLabel}{" "}
        <Link href="/taisykles-ir-salygos" className="underline hover:opacity-60">
          {termsLabel}
        </Link>
      </span>
    </label>
  );
}
