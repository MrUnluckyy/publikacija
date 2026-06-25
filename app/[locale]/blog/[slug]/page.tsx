import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { newsPostBySlugQuery } from "@/sanity/lib/queries";
import type { NewsPostData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import ArticleBody from "@/components/ArticleBody";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

type Params = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await client
    .fetch<NewsPostData>(newsPostBySlugQuery, { locale, slug })
    .catch(() => null);
  return {
    title: post?.title ? `${post.title} — Publikacija` : "Publikacija",
    description: post?.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const post = await client
    .fetch<NewsPostData>(newsPostBySlugQuery, { locale, slug })
    .catch(() => null);

  if (!post) notFound();

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString(locale === "lt" ? "lt-LT" : "en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const hasBody = (post.body?.length ?? 0) > 0 || !!post.excerpt;

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: "calc(72px + var(--bar-h, 0px))" }}>
        {/* Back link */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase hover:text-[#221c14] transition-colors"
          >
            <ArrowIcon direction="left" size={14} />
            {locale === "lt" ? "Grįžti į naujienas" : "Back to journal"}
          </Link>
        </div>

        {/* Header — date + title, then photo below (per layout) */}
        <header className="border-b-2 border-[#221c14] px-5 md:px-10 py-12 md:py-20">
          {formattedDate && (
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-5">
              {formattedDate}
            </p>
          )}
          <h1 className="text-title text-[#221c14] max-w-[16ch]">
            {post.title}
          </h1>
        </header>

        {/* Cover image / video */}
        {post.coverVideo?.playbackId ? (
          <div className="border-b-2 border-[#221c14] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://image.mux.com/${post.coverVideo.playbackId}/thumbnail.jpg?width=1800&height=1000&fit_mode=crop`}
              alt={post.title ?? ""}
              className="w-full max-h-[72vh] object-cover"
            />
          </div>
        ) : post.coverImage ? (
          <div className="border-b-2 border-[#221c14] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(post.coverImage).width(1800).height(1000).fit("crop").auto("format").url()}
              alt={post.title ?? ""}
              className="w-full max-h-[72vh] object-cover"
            />
          </div>
        ) : null}

        {/* Body — sections, pushed right on desktop */}
        {hasBody && (
          <div className="border-b-2 border-[#221c14]">
            <ArticleBody value={post.body ?? []} lead={post.excerpt} />
          </div>
        )}
      </main>
      <FooterWrapper />
    </>
  );
}
