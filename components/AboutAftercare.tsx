import type { AboutData, AboutAftercareItem } from "@/sanity/types";
import ArrowIcon from "@/components/ui/ArrowIcon";

// Used when no downloads have been configured in Studio yet.
const DEFAULT_ITEMS: AboutAftercareItem[] = [
    {
      language: "Lietuvių kalba",
      description:
        "Kaip tinkamai prižiūrėti naują tatuiruotę — instrukcija lietuvių kalba.",
      buttonLabel: "Atsisiųsti",
      fileUrl: "/assets/tattoo-care/TATUIRUOTESGYDYMAS-scaled.jpg",
      fileName: "Tatuiruotes-prieziura.jpg",
    },
    {
      language: "English",
      description:
        "How to properly care for your new tattoo — instructions in English.",
      buttonLabel: "Download",
      fileUrl: "/assets/tattoo-care/tattooaftercareEN-scaled.jpg",
      fileName: "Tattoo-aftercare.jpg",
    },
];

export default function AboutAftercare({
  data,
  isLt,
}: {
  data?: AboutData | null;
  isLt: boolean;
}) {
  const configured = (data?.aftercareItems ?? []).filter((i) => i?.fileUrl);
  const items = configured.length ? configured : DEFAULT_ITEMS;

  const eyebrow = data?.aftercareEyebrow ?? (isLt ? "Priežiūra" : "Aftercare");
  const heading =
    data?.aftercareHeading ??
    (isLt ? "Tatuiruotės priežiūros instrukcija" : "Tattoo Aftercare Guide");

  return (
    <div className="border-b-2 border-[#221c14]">
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
        <p className="text-[#221c14]/50 font-bold text-[14px] tracking-[3px] uppercase mb-2">
          {eyebrow}
        </p>
        <h2 className="text-title text-[#221c14]">{heading}</h2>
      </div>

      <div className="grid md:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className={`px-5 md:px-10 py-12 flex flex-col gap-6 border-b-2 md:border-b-0 border-[#221c14] ${
              i % 2 === 0 ? "md:border-r-2" : ""
            } ${i === items.length - 1 ? "border-b-0" : ""}`}
          >
            <div>
              {item.language && (
                <p className="text-[#221c14]/50 font-bold text-[14px] tracking-[2px] uppercase mb-3">
                  {item.language}
                </p>
              )}
              {item.description && (
                <p className="text-body text-[#221c14]">{item.description}</p>
              )}
            </div>
            {item.fileUrl && (
              <a
                href={item.fileUrl}
                download={item.fileName ?? true}
                className="self-start inline-flex items-center gap-2 border-2 border-[#221c14] text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
              >
                <ArrowIcon direction="down" size={14} />
                {item.buttonLabel ?? (isLt ? "Atsisiųsti" : "Download")}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
