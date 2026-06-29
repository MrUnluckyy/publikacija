import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";
import { Link } from "@/i18n/navigation";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "lt"
    ? {
        title: "Linorytas — Publikacija",
        description:
          "Kas yra linorytas? Sužinokite apie rankų darbo reljefinę spaudą ir prisijunkite prie seminaro.",
      }
    : {
        title: "Linocut — Publikacija",
        description:
          "What is linocut? Learn about handmade relief printmaking and join a workshop at Publikacija.",
      };
}

type Step = { num: string; title: string; body: string };

export default async function LinocutPage() {
  const t = await getTranslations("linocut");
  const steps = t.raw("steps") as Step[];

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: "calc(72px + var(--bar-h, 0px))" }}>
        <BackToHome />

        {/* Page header */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10 md:py-16">
          <p className="text-[#221c14]/50 font-bold text-[14px] tracking-[3px] uppercase mb-2">
            {t("eyebrow")}
          </p>
          <h1 className="text-title text-[#221c14] mb-6 max-w-[15ch]">{t("heading")}</h1>
          <p className="text-body text-[#221c14] max-w-[620px]">{t("intro")}</p>
        </div>

        {/* Explanation */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-12 md:py-16">
          <h2 className="text-subtitle text-[#221c14] mb-6">{t("bodyHeading")}</h2>
          <p className="text-body text-[#221c14] max-w-[680px]">{t("body")}</p>
        </div>

        {/* Process steps */}
        <div className="border-b-2 border-[#221c14]">
          <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-6">
            <p className="text-[#221c14]/50 font-bold text-[14px] tracking-[3px] uppercase">
              {t("processLabel")}
            </p>
          </div>
          <div className="grid md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`px-5 md:px-10 py-12 border-[#221c14] ${
                  i < steps.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2" : ""
                }`}
              >
                <p className="text-[#221c14]/30 font-bold text-[40px] leading-none mb-6">{step.num}</p>
                <h3 className="text-[#221c14] font-bold text-[22px] mb-3">{step.title}</h3>
                <p className="text-body text-[#221c14]/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA band */}
        <div className="border-b-2 border-[#221c14] bg-[#221c14] text-[#e5e4d2] px-5 md:px-10 py-16 md:py-24">
          <h2 className="text-title mb-4 max-w-[18ch]">{t("ctaHeading")}</h2>
          <p className="text-body opacity-80 max-w-[520px] mb-10">{t("ctaBody")}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book?service=workshop"
              className="inline-flex items-center gap-2 border-2 border-[#e5e4d2] bg-[#e5e4d2] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-8 py-4 hover:bg-transparent hover:text-[#e5e4d2] transition-colors duration-200"
            >
              {t("ctaWorkshop")}
              <ArrowIcon direction="right" size={14} />
            </Link>
            <a
              href="mailto:info@publikacija.lt?subject=Linoraižybos%20spaudos%20užklausa"
              className="inline-flex items-center gap-2 border-2 border-[#e5e4d2] text-[#e5e4d2] font-bold text-[14px] tracking-[2px] uppercase px-8 py-4 hover:bg-[#e5e4d2] hover:text-[#221c14] transition-colors duration-200"
            >
              {t("ctaPrints")}
            </a>
          </div>
        </div>
      </main>
      <FooterWrapper />
    </>
  );
}
