import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/i18n/navigation";
import type { BlogSidebarData } from "@/sanity/types";

export function hasSidebarContent(s: BlogSidebarData | null | undefined): boolean {
  return !!(s && (s.image || s.heading || s.body || (s.ctaLabel && s.ctaUrl)));
}

export default function BlogSidebar({ sidebar }: { sidebar: BlogSidebarData }) {
  const { image, imageAlt, heading, body, ctaLabel, ctaUrl } = sidebar;

  const cta =
    ctaLabel && ctaUrl ? (
      ctaUrl.startsWith("/") ? (
        <Link
          href={ctaUrl}
          className="self-start inline-flex items-center gap-2 border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
        >
          {ctaLabel}
        </Link>
      ) : (
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-2 border-2 border-[#221c14] text-[#221c14] font-bold text-[13px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#221c14] hover:text-[#e5e4d2] transition-colors duration-200"
        >
          {ctaLabel}
        </a>
      )
    ) : null;

  return (
    <aside className="px-5 md:px-10 py-12 md:py-16 md:sticky md:self-start md:top-[calc(72px+var(--bar-h,0px)+1.5rem)]">
      <div className="flex flex-col gap-6">
        {image && (
          <div className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(image).width(800).auto("format").url()}
              alt={imageAlt ?? heading ?? ""}
              className="w-full object-cover"
            />
          </div>
        )}
        {heading && <h2 className="text-subtitle text-[#221c14]">{heading}</h2>}
        {body && <p className="text-body text-[#221c14]/80 whitespace-pre-line">{body}</p>}
        {cta}
      </div>
    </aside>
  );
}
