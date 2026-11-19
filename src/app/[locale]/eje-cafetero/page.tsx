import { setRequestLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { salentoAttractions } from '@/lib/salento-attractions';
import { topicPath } from '@/lib/topics';
import {
  BASE_URL,
  EJE_PATH,
  OG_IMAGE_URL,
  SITE,
  localizedPageUrl,
  type Locale,
} from '@/lib/site-config';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) return {};

  const loc = locale as Locale;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const eje = messages?.eje ?? {};
  const title = (eje.metaTitle as string) || (messages?.meta?.title as string);
  const description = (eje.metaDescription as string) || (messages?.meta?.description as string);
  const selfUrl = localizedPageUrl(loc, EJE_PATH);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedPageUrl(l as Locale, EJE_PATH);
  languages['x-default'] = localizedPageUrl('es', EJE_PATH);

  return {
    title,
    description,
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: selfUrl,
      siteName: SITE.brandNames[loc],
      type: 'website',
      images: [{ url: OG_IMAGE_URL, alt: `${SITE.brandNames[loc]} region guide` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_URL],
    },
    robots: { index: true, follow: true },
  };
}

export default async function EjePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);
  const loc = locale as Locale;

  const messages = (await getMessages()) as any;
  const eje = messages?.eje ?? {};
  const homeLabel = (messages?.header?.home as string) || 'Home';
  const homeUrl = localizedPageUrl(loc);
  const pageUrl = localizedPageUrl(loc, EJE_PATH);

  const destinations = (eje.destinations || []) as Array<{ name: string; text: string }>;
  const itinerary = (eje.itinerary || []) as string[];

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: eje.title as string,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <JsonLd data={breadcrumb} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {/* 返回主攻略（主题集群的中心页） */}
        <a
          href={homeUrl}
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {eje.valleyLink}
        </a>

        {/* 标题区 */}
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Quindío · Risaralda · Caldas
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {eje.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {eje.lead}
          </p>
        </header>

        {/* 概述 */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {eje.overviewTitle}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {eje.overview}
          </p>
        </section>

        {/* 目的地卡片 */}
        {destinations.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {eje.destinationsTitle}
            </h2>
            <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destinations.map((d, i) => (
                <article
                  key={i}
                  className="rounded-xl p-5 sm:p-6"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {d.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {d.text}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-3">
            {loc === 'es' ? 'Lugares para visitar en Salento' : loc === 'en' ? 'Places to visit in Salento' : '萨伦托周边景点'}
          </h2>
          <ul className="space-y-3">
            {salentoAttractions.map((place) => (
              <li key={place.key}>
                <a className="underline underline-offset-4" href={topicPath(loc, place)}>{place.title[loc]}</a>
                <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{place.lead[loc]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 交通 */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {eje.gettingTitle}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {eje.getting}
            </p>
          </div>
        </section>

        {/* 行程建议 */}
        {itinerary.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {eje.itineraryTitle}
            </h2>
            <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
            <div className="space-y-4">
              {itinerary.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    {i + 1}
                  </div>
                  <p className="flex-1 rounded-xl p-4 leading-relaxed" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 回到主攻略 CTA（主题集群反向链接） */}
        <section
          className="rounded-2xl p-6 sm:p-8 text-center"
          style={{ background: 'var(--bg-tertiary)', border: '2px solid var(--accent)' }}
        >
          <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {eje.valleyLink}
          </h2>
          <p className="text-sm mb-6 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {eje.valleyLinkSub}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {[
              { href: `${homeUrl}#faq`, label: eje.quickFaq },
              { href: `${homeUrl}#map`, label: eje.quickMap },
              { href: `${homeUrl}#reviews`, label: eje.quickReviews },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-xs px-3 py-1.5 rounded-full transition-colors hover:opacity-80"
                style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={homeUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            {homeLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-center" style={{ color: 'var(--text-muted)' }}>
          {eje.note}
        </p>
      </div>
    </div>
  );
}
