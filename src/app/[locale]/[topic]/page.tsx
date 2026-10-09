import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LOCALES, BASE_URL, SITE, type Locale } from '@/lib/site-config';
import { TOPICS, getTopic } from '@/lib/topics';
import TopicPage from '@/components/TopicPage';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: Locale; topic: string }[] = [];
  for (const locale of LOCALES) {
    for (const topic of TOPICS) {
      params.push({ locale, topic: topic.slug[locale] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  if (!LOCALES.includes(locale as Locale)) return {};
  const t = getTopic(locale as Locale, topic);
  if (!t) return {};

  const self = `${BASE_URL}/${locale}/${t.slug[locale as Locale]}`;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/${t.slug[l]}`;
  }
  languages['x-default'] = `${BASE_URL}/es/${t.slug.es}`;

  return {
    title: t.metaTitle[locale as Locale],
    description: t.metaDescription[locale as Locale],
    alternates: { canonical: self, languages },
    openGraph: {
      title: t.metaTitle[locale as Locale],
      description: t.metaDescription[locale as Locale],
      url: self,
      siteName: SITE.title,
      locale,
      type: 'website',
    },
  };
}

export default async function TopicPageRoute({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = getTopic(locale as Locale, topic);
  if (!t) notFound();
  return <TopicPage locale={locale as Locale} topic={t} />;
}
