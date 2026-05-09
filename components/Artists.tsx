"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import type { ArtistData, PortfolioItemData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Lightbox from "./Lightbox";

const FALLBACK_ARTISTS: ArtistData[] = [
  {
    _id: "lukas",
    name: "Lukas",
    role: null,
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

interface Props {
  items?: ArtistData[] | null;
  eyebrow?: string | null;
  heading?: string | null;
  portfolioItems?: PortfolioItemData[] | null;
}

function WorkCard({ item, onClick }: { item: PortfolioItemData; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-none w-[210px] md:w-[260px] aspect-[2/3] relative overflow-hidden cursor-pointer group focus:outline-none"
    >
      {item.image && (
        <Image
          src={urlFor(item.image).width(520).height(780).auto("format").url()}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="260px"
        />
      )}
      <div className="absolute inset-0 bg-[#221c14]/0 group-hover:bg-[#221c14]/40 transition-colors duration-300" />
    </button>
  );
}

export default function Artists({ items, eyebrow, heading, portfolioItems }: Props) {
  const t      = useTranslations("artists");
  const tg     = useTranslations("gallery");
  const locale = useLocale();

  const [expandedBios, setExpandedBios] = useState<Set<string>>(new Set());
  function toggleBio(id: string) {
    setExpandedBios((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const fallbackBios: Record<string, string> = {
    lukas:    t("lukasBio"),
    artiomas: t("artiomasBio"),
  };

  const artists =
    items && items.length > 0
      ? items
      : FALLBACK_ARTISTS.map((a) => ({
          ...a,
          bio:  fallbackBios[a._id] ?? null,
          role: a._id === "lukas" ? "Tattoo Artist & Printmaker" : "Tattoo Artist",
        }));

  // Portfolio items grouped by artist name
  const workByArtist = useMemo(() => {
    const map = new Map<string, PortfolioItemData[]>();
    if (!portfolioItems) return map;
    for (const item of portfolioItems) {
      const key = item.artistName ?? "";
      const arr = map.get(key) ?? [];
      arr.push(item);
      map.set(key, arr);
    }
    return map;
  }, [portfolioItems]);

  // Flat ordered list for lightbox navigation
  const allItems = useMemo(
    () => artists.flatMap((a) => workByArtist.get(a.name) ?? []),
    [artists, workByArtist]
  );

  const lightboxImages = allItems
    .filter((i) => i.image)
    .map((i) => ({
      src: urlFor(i.image!).width(1600).height(2000).auto("format").url(),
      alt: i.title,
    }));

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback(
    (item: PortfolioItemData) => {
      const idx = allItems.findIndex((i) => i._id === item._id);
      if (idx !== -1) setLightboxIndex(idx);
    },
    [allItems]
  );
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % lightboxImages.length)),
    [lightboxImages.length]
  );
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? 0 : (i - 1 + lightboxImages.length) % lightboxImages.length
      ),
    [lightboxImages.length]
  );

  return (
    <>
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
          {artists.map((artist, i) => {
            const work = workByArtist.get(artist.name) ?? [];
            const doubled = [...work, ...work];
            const animClass = i % 2 === 0 ? "gallery-left" : "gallery-right";

            return (
              <div key={artist._id} className="border-b-2 border-[#221c14] last:border-b-0">

                {/* Bio row */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${work.length > 0 ? "md:border-b-2 md:border-[#221c14]" : ""}`}>
                  {/* Left: name + role + instagram handle */}
                  <div className="md:border-r-2 border-[#221c14] px-5 md:px-10 pt-10 pb-3 md:py-16 flex flex-col justify-center">
                    <h3
                      className="text-[#221c14] font-extrabold leading-[1.05em] mb-2"
                      style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)" }}
                    >
                      {artist.name}
                    </h3>
                    {artist.role && (
                      <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[2px] uppercase mt-3">
                        {artist.role}
                      </p>
                    )}
                    {artist.instagramHandle && artist.instagramUrl && (
                      <a
                        href={artist.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#221c14]/40 font-bold text-[13px] tracking-[2px] uppercase mt-3 hover:text-[#221c14] transition-colors w-fit"
                      >
                        Instagram {artist.instagramHandle}
                      </a>
                    )}
                  </div>

                  {/* Right: bio only */}
                  <div className="px-5 md:px-10 pt-3 pb-10 md:py-16 flex flex-col justify-center">
                    {artist.bio && (
                      <>
                        {/* Mobile: inline truncation */}
                        {!expandedBios.has(artist._id) ? (
                          <p className="md:hidden text-[#221c14] font-bold text-[20px] leading-[1.65em]">
                            {artist.bio.length > 180
                              ? artist.bio.slice(0, artist.bio.lastIndexOf(" ", 180))
                              : artist.bio}
                            {artist.bio.length > 180 && (
                              <>
                                {"… "}
                                <button
                                  className="inline italic text-[#221c14]/50 hover:text-[#221c14] transition-colors"
                                  onClick={() => toggleBio(artist._id)}
                                >
                                  {locale === "lt" ? "Rodyti daugiau" : "Show more"}
                                </button>
                              </>
                            )}
                          </p>
                        ) : (
                          <p className="md:hidden text-[#221c14] font-bold text-[20px] leading-[1.65em] mb-3">
                            {artist.bio}
                            {" "}
                            <button
                              className="inline italic text-[#221c14]/50 hover:text-[#221c14] transition-colors"
                              onClick={() => toggleBio(artist._id)}
                            >
                              {locale === "lt" ? "Rodyti mažiau ↑" : "Show less ↑"}
                            </button>
                          </p>
                        )}
                        {/* Desktop: full bio */}
                        <p className="hidden md:block text-[#221c14] font-bold text-[20px] leading-[1.65em]">
                          {artist.bio}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Work gallery — scrolls automatically */}
                {work.length > 0 && (
                  <div className="overflow-hidden py-4">
                    <div className={`flex gap-3 ${animClass} w-max`}>
                      {doubled.map((item, j) => (
                        <WorkCard
                          key={`${artist._id}-${item._id}-${j}`}
                          item={item}
                          onClick={() => openLightbox(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="px-5 md:px-10 py-8">
          <a
            href="/our-work"
            className="inline-flex items-center gap-3 text-[#221c14] font-bold text-[17px] tracking-[2px] uppercase border-b-2 border-[#221c14] pb-1 hover:opacity-60 transition-opacity"
          >
            {tg("viewAll")} <span>→</span>
          </a>
        </div>

      </section>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
