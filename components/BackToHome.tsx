import { Link } from "@/i18n/navigation";

export default function BackToHome() {
  return (
    <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase hover:text-[#221c14] transition-colors"
      >
        ← Home
      </Link>
    </div>
  );
}
