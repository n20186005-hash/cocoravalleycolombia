import { useTranslations, useMessages } from 'next-intl';

/**
 * FAQ 板块：正文问题以 h3 结构化输出，配合页面内 FAQPage JSON-LD
 * 获取 Featured Snippet / AI Overview 卡片机会
 */
export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as Array<{ q: string; a: string }>;

  if (items.length === 0) return null;

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-xl p-6 sm:p-7"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3
                className="font-display text-lg sm:text-xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.q}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
