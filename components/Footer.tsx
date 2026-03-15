import Link from "next/link";

const LINKS = [
  { label: "Booking",       href: "/book" },
  { label: "Our Works",     href: "/our-work" },
  { label: "Gift Vouchers", href: "/gift-vouchers" },
  { label: "About",         href: "/#about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#e5e4d2" }}>

      {/* ── Desktop ── */}
      <div className="hidden md:block border-t-2 border-[#221c14]">
        <div className="grid grid-cols-3 items-center px-10 py-6 border-b-2 border-[#221c14]">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Curves.svg" alt="Publikacija" style={{ height: 24, width: "auto" }} />

          {/* Nav */}
          <nav className="flex items-center justify-center gap-8">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href}
                className="text-[#221c14] font-bold text-[14px] hover:opacity-50 transition-opacity">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center justify-end gap-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-[#221c14] font-bold text-[14px] hover:opacity-50 transition-opacity">
              Instagram
            </a>
            <Link href="/terms" className="text-[#221c14] font-bold text-[14px] hover:opacity-50 transition-opacity">
              Terms
            </Link>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="px-10 py-4">
          <p className="text-[#221c14]/50 font-bold text-[12px] tracking-[1px]">
            © {year} Publikacija. Visos teisės saugomos.
          </p>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden border-t-2 border-[#221c14]" style={{ backgroundColor: "#211c15" }}>

        {/* Logo row */}
        <div className="border-b-2 border-white/10 px-5 py-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/publikacija_iskaba-web.svg"
            alt="Publikacija"
            style={{ height: 52, width: "auto", filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className="border-b-2 border-white/10 px-5 py-5 text-white font-bold text-[18px] hover:opacity-60 transition-opacity flex items-center justify-between">
              {l.label}
              <span className="text-white/30">→</span>
            </a>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-5 py-6 flex items-center justify-between">
          <p className="text-white/30 font-bold text-[12px]">
            © {year} Publikacija
          </p>
          <div className="flex gap-3 text-[13px] font-bold text-white/40">
            <button className="text-white">LT</button>
            <span className="text-white/20">/</span>
            <button>EN</button>
          </div>
        </div>
      </div>

    </footer>
  );
}
