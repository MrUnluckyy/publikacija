"use client";

import { useState } from "react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import MuxPlayer from "@mux/mux-player-react";
import { urlFor } from "@/sanity/lib/image";
import Lightbox from "@/components/Lightbox";
import type {
  ArticleBlock,
  ArticleImageBlock,
  ArticleGalleryBlock,
  ArticleVideoBlock,
  ArticleQuoteBlock,
  GalleryImage,
} from "@/sanity/types";

// Text columns sit in the right two-thirds on desktop; media spans full width.
const TEXT = "md:ml-[33%] md:max-w-[680px]";

function Caption({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <figcaption className={`${TEXT} mt-3 text-[14px] text-[#221c14]/50 italic`}>
      {children}
    </figcaption>
  );
}

function ImageBlock({ value }: { value: ArticleImageBlock }) {
  const src = urlFor(value.image).width(value.fullWidth ? 2000 : 1400).auto("format").url();
  return (
    <figure
      className={
        value.fullWidth
          ? "my-12 md:my-20 md:relative md:left-1/2 md:w-screen md:max-w-none md:-translate-x-1/2"
          : "my-10 md:my-14"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={value.alt ?? value.caption ?? ""}
        className="w-full object-cover"
      />
      <Caption>{value.caption}</Caption>
    </figure>
  );
}

function GalleryBlock({ value }: { value: ArticleGalleryBlock }) {
  const images = (value.images ?? []).filter(Boolean);
  const [open, setOpen] = useState<number | null>(null);

  if (images.length === 0) return null;

  const lightboxImages = images.map((img: GalleryImage) => ({
    src: urlFor(img).width(1800).auto("format").url(),
    alt: img.alt ?? img.caption ?? "",
  }));

  return (
    <figure className="my-12 md:my-16">
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
      <Caption>{value.caption}</Caption>

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

function VideoBlockInline({ value }: { value: ArticleVideoBlock }) {
  if (!value.video?.playbackId) return null;
  return (
    <figure className="my-12 md:my-16">
      <div className="relative aspect-video overflow-hidden bg-[#221c14]">
        <MuxPlayer
          playbackId={value.video.playbackId}
          streamType="on-demand"
          accentColor="#221c14"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
      <Caption>{value.caption}</Caption>
    </figure>
  );
}

function QuoteBlock({ value }: { value: ArticleQuoteBlock }) {
  return (
    <blockquote className={`${TEXT} my-12 md:my-16`}>
      <p className="text-[26px] md:text-[34px] leading-[1.3] font-bold text-[#221c14]">
        <span className="text-[#221c14]/30">“</span>
        {value.text}
        <span className="text-[#221c14]/30">”</span>
      </p>
      {value.attribution && (
        <footer className="mt-4 text-[14px] tracking-[2px] uppercase font-bold text-[#221c14]/50">
          — {value.attribution}
        </footer>
      )}
    </blockquote>
  );
}

const components: PortableTextComponents = {
  types: {
    articleImage: ({ value }) => <ImageBlock value={value as ArticleImageBlock} />,
    articleGallery: ({ value }) => <GalleryBlock value={value as ArticleGalleryBlock} />,
    articleVideo: ({ value }) => <VideoBlockInline value={value as ArticleVideoBlock} />,
    articleQuote: ({ value }) => <QuoteBlock value={value as ArticleQuoteBlock} />,
  },
  block: {
    normal: ({ children }) => <p className={`${TEXT} mb-7`}>{children}</p>,
    h2: ({ children }) => (
      <h2 className={`${TEXT} font-extrabold text-[1.5em] leading-[1.15] mt-14 mb-5`}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={`${TEXT} font-extrabold text-[1.25em] leading-[1.2] mt-10 mb-4`}>{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className={`${TEXT} list-disc pl-6 mb-7 space-y-2`}>{children}</ul>,
    number: ({ children }) => <ol className={`${TEXT} list-decimal pl-6 mb-7 space-y-2`}>{children}</ol>,
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

export default function ArticleBody({
  value,
  lead,
}: {
  value: ArticleBlock[];
  lead?: string | null;
}) {
  return (
    <div className="px-5 md:px-10 py-12 md:py-20 overflow-x-clip text-[#221c14] text-[18px] md:text-[21px] leading-[1.75]">
      {lead && (
        <p className={`${TEXT} mb-12 text-[22px] md:text-[27px] leading-[1.5] font-medium text-[#221c14]`}>
          {lead}
        </p>
      )}
      <PortableText value={value} components={components} />
    </div>
  );
}
