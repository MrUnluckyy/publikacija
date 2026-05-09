import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import PreloaderWrapper from '@/components/PreloaderWrapper';
import AnnouncementBarBanner from '@/components/AnnouncementBarBanner';
import { client } from '@/sanity/lib/client';
import { announcementBarQuery } from '@/sanity/lib/queries';
import type { AnnouncementBarData } from '@/sanity/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'lt' | 'en')) notFound();

  const [messages, bar] = await Promise.all([
    getMessages(),
    client.fetch<AnnouncementBarData>(announcementBarQuery, { locale }).catch(() => null),
  ]);

  const barEnabled = bar?.enabled === true;
  const barType = bar?.barType ?? "marquee";
  const barItems = (bar?.items ?? []).map((i) => i.text).filter((t): t is string => Boolean(t));
  const isMarquee = barType === "marquee";
  const isCta     = barType === "cta";
  const barVisible = barEnabled && (
    (isMarquee && barItems.length > 0) ||
    (isCta && Boolean(bar?.ctaMessage || bar?.ctaLinkLabel))
  );

  return (
    <>
      {/* Inject CSS variable server-side so nav and page offsets are correct on first paint */}
      {barVisible && (
        <style>{`:root { --bar-h: 36px; }`}</style>
      )}
      <NextIntlClientProvider messages={messages}>
        <PreloaderWrapper>
          {barVisible && (
            <AnnouncementBarBanner
              barType={barType}
              items={barItems}
              ctaMessage={bar?.ctaMessage}
              ctaLinkLabel={bar?.ctaLinkLabel}
              ctaLinkHref={bar?.ctaLinkHref}
            />
          )}
          {children}
        </PreloaderWrapper>
      </NextIntlClientProvider>
    </>
  );
}
