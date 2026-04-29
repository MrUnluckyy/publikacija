"use client";

import { useTranslations } from "next-intl";
import type { ArtistData } from "@/sanity/types";

const FALLBACK_ARTISTS: ArtistData[] = [
  {
    _id: "lukas",
    name: "Lukas",
    role: null, // filled from i18n below
    bio: null,
    instagramUrl: "https://instagram.com",
    instagramHandle: "@lukastattoo",
    photo: null,
  },
  {
    _id: "artiomas",
    name: "Artiomas",
    role: null,
    bio: null,
    instagramUrl: "https://instagram.com",
    instagramHandle: "@scarycatboo",
    photo: null,
  },
];

interface ArtistsProps {
  items?: ArtistData[] | null;
  eyebrow?: string | null;
  heading?: string | null;
}

export default function Artists({ items, eyebrow, heading }: ArtistsProps) {
  const t = useTranslations("artists");

  const fallbackBios: Record<string, string> = {
    lukas: t("lukasBio"),
    artiomas: t("artiomasBio"),
  };

  const artists =
    items && items.length > 0
      ? items
      : FALLBACK_ARTISTS.map((a) => ({
          ...a,
          bio: fallbackBios[a._id] ?? null,
          role: a._id === "lukas" ? "Tattoo Artist & Printmaker" : "Tattoo Artist",
        }));

  return (
    <section id="about" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>

      {/* Section header */}
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
        <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[3px] uppercase mb-2">
          {eyebrow ?? t("eyebrow")}
        </p>
        <h2
          className="text-[#221c14] font-extrabold leading-[1.1em]"
          style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
        >
          {heading ?? t("heading")}
        </h2>
      </div>

      {/* Artist rows */}
      <div>
        {artists.map((artist, i) => (
          // Border on static wrapper — never disappears during animation
          <div key={artist._id} className="border-b-2 border-[#221c14] last:border-b-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: name + title */}
            <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#221c14] px-5 md:px-10 py-12 md:py-16 flex flex-col justify-center">
              <h3
                className="text-[#221c14] font-extrabold leading-[1.05em] mb-2"
                style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)" }}
              >
                {artist.name}
              </h3>
              {artist.role && (
                <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[2px] uppercase mt-3">
                  {artist.role}
                </p>
              )}
            </div>

            {/* Right: bio + instagram */}
            <div className="px-5 md:px-10 py-12 md:py-16 flex flex-col justify-between">
              {artist.bio && (
                <p className="text-[#221c14] font-bold text-[20px] leading-[1.65em] mb-8 max-w-[480px]">
                  {artist.bio}
                </p>
              )}
              {artist.instagramUrl && (
                <a
                  href={artist.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#221c14] font-bold text-[15px] tracking-[2px] uppercase border-b-2 border-[#221c14] pb-1 w-fit hover:opacity-50 transition-opacity"
                >
                  Instagram{" "}
                  {artist.instagramHandle && (
                    <span className="text-[#221c14]/50">{artist.instagramHandle}</span>
                  )}
                </a>
              )}
            </div>
          </div>
          </div>
        ))}
      </div>

    </section>
  );
}
