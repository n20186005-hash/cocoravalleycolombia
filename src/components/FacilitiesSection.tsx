'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

const ICONS: Record<string, ReactNode> = {
  wc: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 21v-7a2 2 0 0 1 2-2h3v-4h4l2 6h3l1 2v5M7 21v-3M4 6l2 2M2 4h4" />
    </svg>
  ),
  parking: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 17V7h3a3 3 0 0 1 0 6h-3" />
    </svg>
  ),
  dining: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 2v6a2 2 0 0 0 4 0V2M6 2v20M16 2c-1.5 2-2 4.5-2 7a3 3 0 0 0 4 0v-1h2v14" />
    </svg>
  ),
  lodging: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 21V9l9-6 9 6v12M3 21h18M9 21v-6h6v6M12 9v.01" />
    </svg>
  ),
  shopping: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16l-1.5 13h-13L4 7zM8 10V6a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  fuel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9h2a2 2 0 0 1 2 2v2M18 11l2-1M4 21h14M11 7h-2M11 11h-2M11 15h-2" />
    </svg>
  ),
};

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const categories = t.raw('categories') as Array<{ id: string; title: string; text: string }>;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <p
          className="text-xs rounded-xl p-4 mb-10 max-w-3xl"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
        >
          {t('note')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <article
              key={cat.id}
              className="rounded-xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0"
                style={{ color: 'var(--accent)', border: '1px solid var(--border-color)' }}
              >
                {ICONS[cat.id] ?? null}
              </span>
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {cat.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {cat.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
