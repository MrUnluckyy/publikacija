import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a Session — Publikacija",
  description: "Book a tattoo consultation, linocut print session, or creative workshop at Publikacija studio in Vilnius.",
};

export default function BookPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: 72 }}>

        {/* ── Hero ── */}
        <div className="border-b border-[#221c14]/10 py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8">
            <p className="text-[#585858] text-[13px] tracking-[3px] uppercase mb-4">Registracija</p>
            <h1
              className="text-[#221c14] font-medium leading-[1.2em] mb-4"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Book a session
            </h1>
            <div className="w-16 h-[4px] bg-[#221c14]" />
          </div>
        </div>

        {/* ── Form + Info ── */}
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">

            {/* Left: form */}
            <div>
              <p className="text-[#221c14] text-[17px] leading-[1.7em] mb-10 max-w-[440px]">
                Fill in the form below and we&apos;ll get back to you within 24 hours
                to discuss your project. All consultations are free.
              </p>
              <BookingForm />
            </div>

            {/* Right: studio info */}
            <div className="space-y-10">
              <div>
                <p className="text-[#585858] text-[12px] tracking-[3px] uppercase mb-3">Studio</p>
                <p className="text-[#221c14] text-[17px] leading-[1.7em]">Radio Lofts</p>
                <p className="text-[#221c14] text-[17px] leading-[1.7em]">Kauno g. 30, Vilnius LT-03202</p>
              </div>
              <div>
                <p className="text-[#585858] text-[12px] tracking-[3px] uppercase mb-3">Hours</p>
                <p className="text-[#221c14] text-[17px] leading-[1.7em]">Mon – Sat, 10:00 – 19:00</p>
              </div>
              <div>
                <p className="text-[#585858] text-[12px] tracking-[3px] uppercase mb-3">Email</p>
                <a
                  href="mailto:info@publikacija.lt"
                  className="text-[#221c14] text-[17px] border-b border-[#221c14]/30 hover:border-[#221c14] transition-colors pb-0.5"
                >
                  info@publikacija.lt
                </a>
              </div>
              <div>
                <p className="text-[#585858] text-[12px] tracking-[3px] uppercase mb-3">What to expect</p>
                <ul className="space-y-2">
                  {[
                    "Free initial consultation",
                    "Custom design for every client",
                    "Fully sterile, safe environment",
                    "Multiple revision rounds included",
                    "Aftercare guidance provided",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#221c14] text-[15px] leading-[1.7em]">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-[#221c14] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
