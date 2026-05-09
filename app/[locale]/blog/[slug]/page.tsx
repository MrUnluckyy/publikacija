import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { newsPostBySlugQuery, newsPostsQuery } from "@/sanity/lib/queries";
import type { NewsPostData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

type Params = { locale: string; slug: string };

export async function generateStaticParams() {
  const posts = await client
    .fetch<NewsPostData[]>(newsPostsQuery, { locale: "lt" })
    .catch(() => []);
  return posts
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

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
    ? new Date(post.date).toLocaleDateString(
        locale === "lt" ? "lt-LT" : "en-GB",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : null;

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "calc(72px + var(--bar-h, 0px))" }}>
        {/* Back link */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#221c14]/50 font-bold text-[13px] tracking-[2px] uppercase hover:text-[#221c14] transition-colors"
          >
            ← {locale === "lt" ? "Grįžti" : "Back"}
          </Link>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="border-b-2 border-[#221c14] overflow-hidden max-h-[60vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(post.coverImage).width(1600).height(900).url()}
              alt={post.title ?? ""}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10 md:py-16">
          {formattedDate && (
            <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-4">
              {formattedDate}
            </p>
          )}
          <h1
            className="text-[#221c14] font-extrabold leading-[1.1em] mb-6 max-w-3xl"
            style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-[#221c14] font-bold text-[20px] leading-[1.65em] max-w-2xl opacity-70">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Body */}
        {post.body && (
          <div className="px-5 md:px-10 py-12 md:py-20 max-w-3xl">
            <div className="text-[#221c14] text-[18px] leading-[1.8em] font-normal [&_h2]:font-extrabold [&_h2]:text-[1.6em] [&_h2]:leading-[1.2em] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-extrabold [&_h3]:text-[1.3em] [&_h3]:leading-[1.2em] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2 [&_strong]:font-bold [&_a]:underline [&_a]:underline-offset-2">
              <PortableText value={post.body} />
            </div>
          </div>
        )}
      </main>
      <FooterWrapper />
    </>
  );
}
