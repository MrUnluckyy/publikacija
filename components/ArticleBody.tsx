"use client";

import { useState } from "react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import MuxPlayer from "@mux/mux-player-react";
import { urlFor } from "@/sanity/lib/image";
import Lightbox from "@/components/Lightbox";
import type {
  ArticleSection,
  SectionText,
  SectionImage,
  SectionGallery,
  SectionVideo,
  SectionQuote,
  SectionMediaText,
  GalleryImage,
} from "@/sanity/types";

// Text columns are left-aligned with a comfortable reading width.
const TEXT_COLUMN = "max-w-[760px]";

// Rich-text rendering shared by Text and Media+text sections.
const textComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-subtitle mt-12 first:mt-0 mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-body font-extrabold uppercase tracking-[1px] mt-8 first:mt-0 mb-3">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-60 transition-opacity"
      >
        {children}
      </a>
    ),
  },
};

function Caption({ children, className = "" }: { children?: string; className?: string }) {
  if (!children) return null;
  return <figcaption className={`mt-3 text-[14px] text-[#221c14]/50 italic ${className}`}>{children}</figcaption>;
}

function MuxBlock({ playbackId }: { playbackId: string }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-[#221c14]">
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        accentColor="#221c14"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}

function TextSection({ section }: { section: SectionText }) {
  return (
    <div className={TEXT_COLUMN}>
      <PortableText value={section.content} components={textComponents} />
    </div>
  );
}

function ImageSection({ section }: { section: SectionImage }) {
  const src = urlFor(section.image).width(section.fullWidth ? 2000 : 1400).auto("format").url();
  return (
    <figure className={section.fullWidth ? "md:relative md:left-1/2 md:w-screen md:max-w-none md:-translate-x-1/2" : ""}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={section.alt ?? section.caption ?? ""} className="w-full object-cover" />
      <Caption className={section.fullWidth ? "px-5 md:px-10" : ""}>{section.caption}</Caption>
    </figure>
  );
}

function GallerySection({ section }: { section: SectionGallery }) {
  const images = (section.images ?? []).filter(Boolean);
  const [open, setOpen] = useState<number | null>(null);
  if (images.length === 0) return null;

  const lightboxImages = images.map((img: GalleryImage) => ({
    src: urlFor(img).width(1800).auto("format").url(),
    alt: img.alt ?? img.caption ?? "",
  }));

  return (
    <figure>
      <div className={`grid gap-2 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"}`}>
        {images.map((img, i) => (
          <button
            key={img._key ?? i}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-square overflow-hidden bg-[#221c14]/5 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(img).width(700).height(700).fit("crop").auto("format").url()}
              alt={img.alt ?? img.caption ?? ""}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Caption>{section.caption}</Caption>
      <Lightbox
        images={lightboxImages}
        index={open}
        onClose={() => setOpen(null)}
        onNext={() => setOpen((i) => (i === null ? null : (i + 1) % images.length))}
        onPrev={() => setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length))}
      />
    </figure>
  );
}

function VideoSectionBlock({ section }: { section: SectionVideo }) {
  if (!section.video?.playbackId) return null;
  return (
    <figure>
      <MuxBlock playbackId={section.video.playbackId} />
      <Caption>{section.caption}</Caption>
    </figure>
  );
}

function QuoteSection({ section }: { section: SectionQuote }) {
  return (
    <blockquote className={TEXT_COLUMN}>
      <p className="text-subtitle text-[#221c14]">
        <span className="text-[#221c14]/30">“</span>
        {section.text}
        <span className="text-[#221c14]/30">”</span>
      </p>
      {section.attribution && (
        <footer className="mt-4 text-[14px] tracking-[2px] uppercase font-bold text-[#221c14]/50">
          — {section.attribution}
        </footer>
      )}
    </blockquote>
  );
}

function MediaTextSection({ section }: { section: SectionMediaText }) {
  const mediaRight = section.mediaPosition === "right";

  let media: React.ReactNode = null;
  if (section.mediaType === "video" && section.video?.playbackId) {
    media = <MuxBlock playbackId={section.video.playbackId} />;
  } else if (section.mediaType === "image" && section.image) {
    media = (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={urlFor(section.image).width(1100).auto("format").url()}
        alt={section.alt ?? ""}
        className="w-full object-cover"
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
      <div className={mediaRight ? "md:order-2" : ""}>{media}</div>
      <div className={mediaRight ? "md:order-1" : ""}>
        <PortableText value={section.text} components={textComponents} />
      </div>
    </div>
  );
}

function Section({ section }: { section: ArticleSection }) {
  switch (section._type) {
    case "sectionText":
      return <TextSection section={section} />;
    case "sectionImage":
      return <ImageSection section={section} />;
    case "sectionGallery":
      return <GallerySection section={section} />;
    case "sectionVideo":
      return <VideoSectionBlock section={section} />;
    case "sectionQuote":
      return <QuoteSection section={section} />;
    case "sectionMediaText":
      return <MediaTextSection section={section} />;
    default:
      return null;
  }
}

export default function ArticleBody({
  value,
  lead,
}: {
  value: ArticleSection[];
  lead?: string | null;
}) {
  return (
    <div className="px-5 md:px-10 py-12 md:py-20 overflow-x-clip text-[#221c14] text-body">
      {lead && (
        <p className={`${TEXT_COLUMN} mb-12 text-body opacity-70`}>
          {lead}
        </p>
      )}
      <div className="space-y-12 md:space-y-16">
        {value.map((section) => (
          <Section key={section._key} section={section} />
        ))}
      </div>
    </div>
  );
}
