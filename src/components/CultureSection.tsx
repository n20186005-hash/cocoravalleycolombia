'use client';

import { useTranslations } from 'next-intl';

export default function CultureSection() {
  const t = useTranslations('culture');
  const parts = t.raw('parts') as Array<{ title: string; text: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-10" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-8">
          {parts.map((part, i) => (
            <article
              key={i}
              className="rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="font-display text-2xl font-bold flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {part.title}
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                  {part.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
