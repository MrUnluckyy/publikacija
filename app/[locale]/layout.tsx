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
  const barItems = barEnabled
    ? (bar!.items ?? []).map((i) => i.text).filter((t): t is string => Boolean(t))
    : [];

  return (
    <>
      {/* Inject CSS variable server-side so nav and page offsets are correct on first paint */}
      {barEnabled && barItems.length > 0 && (
        <style>{`:root { --bar-h: 36px; }`}</style>
      )}
      <NextIntlClientProvider messages={messages}>
        <PreloaderWrapper>
          {barEnabled && barItems.length > 0 && (
            <AnnouncementBarBanner items={barItems} />
          )}
          {children}
        </PreloaderWrapper>
      </NextIntlClientProvider>
    </>
  );
}
