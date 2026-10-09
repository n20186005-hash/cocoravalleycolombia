import { type Locale } from '@/lib/site-config';
import { TOPICS } from '@/lib/topics';

export default function TopicLinks({ locale }: { locale: Locale }) {
  const heading =
    locale === 'es' ? 'Guías prácticas del Valle de Cocora' : locale === 'en' ? 'Practical Cocora Valley guides' : '可可拉山谷实用指南';

  const more =
    locale === 'es' ? 'Leer más' : locale === 'en' ? 'Read more' : '阅读更多';

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {heading}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TOPICS.map((t) => (
            <a
              key={t.key}
              href={`/${locale}/${t.slug[locale]}`}
              className="block rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <div className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {t.title[locale]}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                {t.lead[locale].slice(0, 110)}…
              </p>
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                {more} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
