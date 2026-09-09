'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { EJE_PATH } from '@/lib/site-config';

/**
 * 首页区域 CTA：引导访问者从单页攻略进入 Eje Cafetero 主题集群页，
 * 建立“景点页 -> 区域页”的内链闭环（P2 区域词 cluster）。
 */
export default function RegionCta() {
  const t = useTranslations('eje');
  const locale = useLocale();
  const topics = (t.raw('ctaTopics') as unknown as string[]) || [];
  const target = `/${locale}${EJE_PATH}`;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden p-8 sm:p-12 text-center"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* 装饰圆点 */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full opacity-10"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          />

          <p className="text-3xl mb-3" aria-hidden="true">☕</p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('ctaTitle')}
          </h2>
          <p className="text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('ctaText')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
            {topics.map((topic, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
              >
                {topic}
              </span>
            ))}
          </div>

          <a
            href={target}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <span>{t('ctaButton')}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
