import { SITE, BASE_URL, type Locale } from '@/lib/site-config';
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
  const selfUrl = `${BASE_URL}/${locale}/${t.slug[locale]}`;
  const homeUrl = `${BASE_URL}/${locale}`;
  const ejePath = `/${locale}/eje-cafetero`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq[locale].map((f) => ({
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

  const related = TOPICS.filter((x) => x.key !== topic.key);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="section-padding pt-20 sm:pt-24">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            <a href={homeUrl} className="hover:underline">{SITE.brandNames[locale]}</a>
            <span className="mx-2">/</span>
            <span>{t.title[locale]}</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {t.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
        </div>
      </section>

      {/* Content */}
      <section className="section-padding pt-4">
        <div className="max-w-3xl mx-auto">
          {t.sections[locale].map((s, i) => (
            <TopicSectionBlock key={i} heading={s.heading} paragraphs={s.paragraphs} list={s.list} />
          ))}

          {/* FAQ */}
          <div className="mt-4 mb-12">
            <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              FAQ
            </h2>
            <div className="space-y-4">
              {t.faq[locale].map((f, i) => (
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

          {/* Related */}
          <div className="border-t pt-8" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {locale === 'es' ? 'También te puede interesar' : locale === 'en' ? 'You might also like' : '你可能还想知道'}
            </h3>
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
                  {locale === 'es' ? 'Eje Cafetero' : locale === 'en' ? 'Coffee Axis' : '咖啡文化区'}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {locale === 'es' ? 'Salento, Filandia, Armenia y Pereira.' : locale === 'en' ? 'Salento, Filandia, Armenia and Pereira.' : '萨伦托、菲兰迪亚、阿曼尼亚与佩雷拉。'}
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </div>
  );
}
