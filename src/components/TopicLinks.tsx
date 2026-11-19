import { useTranslations } from 'next-intl';
import { type Locale } from '@/lib/site-config';
import { TOPICS } from '@/lib/topics';

export default function TopicLinks({ locale, nearby = false }: { locale: Locale; nearby?: boolean }) {
  const t = useTranslations('topicLinks');

  const topics = TOPICS.filter((topic) => Boolean(topic.place) === nearby);

  return (
    <section id={nearby ? 'nearby' : undefined} className="section-padding scroll-mt-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t(nearby ? 'nearby' : 'guides')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <a
              key={topic.key}
              href={`/${locale}/${topic.slug[locale]}`}
              className="block rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <div className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {topic.title[locale]}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                {topic.lead[locale]}
              </p>
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                {t('more')} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
