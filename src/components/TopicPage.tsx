import HeroBackdrop from "./HeroBackdrop";
import Header from './Header';
import Footer from './Footer';
import { useTranslations } from 'next-intl';
import NearbyVisitDetails, { NearbyVisitHours } from './NearbyVisitDetails';
import { nearbyVisits } from '@/lib/nearby-visits';
import { SITE, BASE_URL, type Locale } from '@/lib/site-config';
import { TopicPlaceDetails, valleyPlace } from './TopicPlaceDetails';
import { getFieldNote, routeNeighbours } from '@/lib/attraction-notes';
import { TOPICS, type Topic } from '@/lib/topics';

function TopicSectionBlock({ heading, paragraphs, list }: { heading: string; paragraphs?: string[]; list?: string[] }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {heading}
      </h2>
      {paragraphs?.map((p, i) => (
        <p key={i} className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {p}
        </p>
      ))}
      {list && list.length > 0 && (
        <ul className="space-y-2">
          {list.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function TopicPage({ locale, topic }: { locale: Locale; topic: Topic }) {
  const t = topic;
  const place = t.place ?? valleyPlace;
  const expandedVisit = nearbyVisits[t.key];
  const heroPhoto = t.place?.photo;
  const note = getFieldNote(t.key);
  const index = { es: 0, en: 1, zh: 2 }[locale];
  const nearbyPlaces = routeNeighbours(t, TOPICS);
  const selfUrl = `${BASE_URL}/${locale}/${t.slug[locale]}`;
  const homeUrl = `${BASE_URL}/${locale}`;
  const ejePath = `/${locale}/eje-cafetero`;

  const accessQuestion = { es: `¿Cómo llego a ${t.title.es}?`, en: `How do I reach ${t.title.en}?`, zh: `如何抵达${t.title.zh}？` };
  const managerQuestion = { es: `¿Quién informa sobre la visita a ${t.title.es}?`, en: `Who handles visitor enquiries for ${t.title.en}?`, zh: `${t.title.zh}的现场参观由谁负责？` };
  const questions = topic.place ? [
    ...t.faq[locale],
    ...(note ? [{ q: note.question[index], a: note.answer[index] }] : []),
    { q: accessQuestion[locale], a: topic.place.transport[locale] },
    { q: managerQuestion[locale], a: topic.place.management[locale] },
  ] : t.faq[locale];
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE.brandNames[locale], item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.title[locale], item: selfUrl },
    ],
  };

  const related = TOPICS.filter((x) => x.key !== topic.key && !x.key.startsWith('quindio-'));
  const copy = useTranslations('topic');

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header locale={locale} solid />
      {/* Hero */}
      <section className={heroPhoto ? "place-photo-hero relative min-h-[75vh] flex items-end overflow-hidden pt-28 pb-12 sm:pb-20" : "section-padding pt-20 sm:pt-24"}>
        {heroPhoto && <HeroBackdrop src={heroPhoto.file} alt={t.title[locale]} />}
        <div className={heroPhoto ? "relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6" : "max-w-3xl mx-auto"}>
          <nav className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            <a href={homeUrl} className="hover:underline">{SITE.brandNames[locale]}</a>
            <span className="mx-2">/</span>
            <span>{t.title[locale]}</span>
          </nav>
          <nav aria-label={locale === 'zh' ? '本景点的其他语言' : locale === 'es' ? 'Idiomas de esta página' : 'Languages for this place'} className="flex flex-wrap gap-3 mb-4 text-sm">
            {(['es', 'en', 'zh'] as const).map((language) => (
              <a key={language} href={`/${language}/${t.slug[language]}`} lang={language} hrefLang={language}
                aria-current={language === locale ? 'page' : undefined}
                className={language === locale ? 'font-semibold' : 'underline'}>{({es: 'Español', en: 'English', zh: '中文'})[language]}</a>
            ))}
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-4xl" style={{ color: 'var(--text-primary)' }}>
            {t.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            {t.lead[locale]}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              {t.verifiedLabel[locale]}
            </span>
            <a
              href={t.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.source.name[locale]}
            </a>
          </div>
          {expandedVisit && (
            <div className="mt-4 flex flex-wrap gap-3 text-sm max-w-3xl">
              <a className="underline underline-offset-4" href={place.mapUrl}>{copy('mapLocation')}</a>
              <NearbyVisitHours locale={locale} topic={t} />
              {!place.rating && place.photo && <a className="underline" href={place.mapUrl}>{({ es: 'Consultar reseñas del lugar', en: 'See place reviews', zh: '查看本景点评价' })[locale]}</a>}
              {place.rating && (
                <a className="underline underline-offset-4" href={place.rating.source}>{place.rating.score} / 5 · Google</a>
              )}
            </div>
          )}
        </div>
      </section>

      {t.place?.photo && (
        <figure className="max-w-3xl mx-auto px-4 sm:px-6 mb-6">
          <a href={t.place.photo.file} className="underline text-sm">{({ es: 'Ver la fotografía completa', en: 'View the full photograph', zh: '查看完整实景照片' })[locale]}</a>
          <figcaption className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <a href={t.place.photo.source} className="underline">{t.place.photo.author && `${t.place.photo.author} · `}{t.place.photo.provider ?? 'Wikimedia Commons'}</a>
          </figcaption>
        </figure>
      )}

      {/* Content */}
      <section className="section-padding pt-4">
        <div className="max-w-3xl mx-auto">
          {expandedVisit ? (
            <NearbyVisitDetails locale={locale} topic={t} place={place} />
          ) : (
            <>
              <TopicPlaceDetails locale={locale} place={place} title={t.place ? t.title[locale] : undefined} />
              {t.sections[locale].map((s, i) => (
                <TopicSectionBlock key={i} heading={s.heading} paragraphs={s.paragraphs} list={s.list} />
              ))}
            </>
          )}

          {t.mapStops && (
            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold mb-4">
                {copy('mapStops')}
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                {t.mapStops.map((stop) => (
                  <li key={stop.query}>
                    <a
                      className="underline underline-offset-4"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {stop.name[locale]}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQ */}
          <div className="mt-4 mb-12">
            <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              {copy('faq')}
            </h2>
            <div className="space-y-4">
              {questions.map((f, i) => (
                <details
                  key={i}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  <summary className="font-medium cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                    {f.q}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {nearbyPlaces.length > 0 && (
            <section id="nearby-places" className="my-10 rounded-xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
              <h2 className="font-display text-2xl font-semibold mb-3">{({ es: 'Lugares cercanos para continuar', en: 'Nearby places to visit next', zh: '周边景点与接续游线' })[locale]}</h2>
              <p className="mb-4">{({ es: 'Use las direcciones de cada guía para distinguir un tramo a pie de un traslado entre localidades.', en: 'Check each guide’s directions to distinguish a walk from a transfer between towns.', zh: '请结合各页的详细地址安排下一站，区分可步行接续的街区和需要搭车前往的乡间景点。' })[locale]}</p>
              <ul className="space-y-4">{nearbyPlaces.map(r => <li key={r.key}><a className="font-semibold underline underline-offset-4" href={`/${locale}/${r.slug[locale]}`}>{r.title[locale]}</a><p className="mt-1 text-sm">{r.place?.transport[locale]}</p></li>)}</ul>
            </section>
          )}
          {/* Related */}
          <div className="border-t pt-8" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {copy('related')}
            </h3>
            <a className="inline-block underline underline-offset-4 mb-4" href={`/${locale}#nearby`}>{copy('allNearby')}</a>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <a
                  key={r.key}
                  href={`/${locale}/${r.slug[locale]}`}
                  className="block rounded-xl p-5 transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{r.title[locale]}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{r.lead[locale].slice(0, 80)}…</div>
                </a>
              ))}
              <a
                href={ejePath}
                className="block rounded-xl p-5 transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {copy('coffeeRegion')}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {copy('coffeeTowns')}
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </div>
  );
}
