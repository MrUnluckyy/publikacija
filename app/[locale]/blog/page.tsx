import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { newsPostsQuery } from "@/sanity/lib/queries";
import type { NewsPostData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
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
    ? { title: "Naujienos — Publikacija", description: "Naujienos iš Publikacija studijos Vilniuje." }
    : { title: "Journal — Publikacija", description: "News and stories from the Publikacija studio in Vilnius." };
}

function coverUrl(post: NewsPostData): string | null {
  if (post.coverImage) return urlFor(post.coverImage).width(900).height(620).fit("crop").url();
  if (post.coverVideo?.playbackId)
    return `https://image.mux.com/${post.coverVideo.playbackId}/thumbnail.jpg?width=900&height=620&fit_mode=crop`;
  return null;
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, posts] = await Promise.all([
    getTranslations("blog"),
    client.fetch<NewsPostData[]>(newsPostsQuery, { locale }).catch(() => [] as NewsPostData[]),
  ]);

  const list = posts ?? [];

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
          <h1 className="text-title text-[#221c14] mb-6">{t("heading")}</h1>
          <p className="text-body text-[#221c14] max-w-[560px]">{t("intro")}</p>
        </div>

        {list.length === 0 ? (
          <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-20">
            <p className="text-body text-[#221c14]/60">{t("empty")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#221c14] border-b-2 border-[#221c14]">
            {list.map((post) => {
              const cover = coverUrl(post);
              const date = post.date
                ? new Date(post.date).toLocaleDateString(locale === "lt" ? "lt-LT" : "en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null;

              const card = (
                <article className="bg-[#e5e4d2] h-full flex flex-col">
                  <div className="aspect-[3/2] relative overflow-hidden bg-[#221c14]/5">
                    {cover && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={cover} alt={post.title ?? ""} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="px-5 md:px-8 py-7 flex flex-col flex-1">
                    {date && (
                      <p className="text-[#221c14]/40 font-bold text-[12px] tracking-[2px] uppercase mb-3">{date}</p>
                    )}
                    <h2 className="text-[#221c14] font-bold text-[22px] leading-tight mb-3">{post.title}</h2>
                    {post.excerpt && (
                      <p className="text-body text-[#221c14]/70 mb-6 line-clamp-3">{post.excerpt}</p>
                    )}
                    {post.slug && (
                      <span className="mt-auto inline-flex items-center gap-2 text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase">
                        {t("readMore")}
                        <ArrowIcon direction="right" size={14} />
                      </span>
                    )}
                  </div>
                </article>
              );

              return post.slug ? (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
                  {card}
                </Link>
              ) : (
                <div key={post._id}>{card}</div>
              );
            })}
          </div>
        )}
      </main>
      <FooterWrapper />
    </>
  );
}
