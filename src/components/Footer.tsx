import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { EJE_PATH, SITE } from '@/lib/site-config';

export default function Footer() {
  const t = useTranslations('footer');
  const eje = useTranslations('eje');
  const locale = useLocale();
  const prefix = `/${locale}`;

  const officialLinksObj = t.raw('officialLinks') as Record<string, { name: string; url: string }>;
  const officialLinks = Object.values(officialLinksObj);

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          {/* NAP 信息：官方全称 + 地址 + 电话，与 Google Maps 商家资料完全一致 */}
          <div className="max-w-md">
            <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t('officialName')}
            </h3>
            <div className="space-y-2 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs leading-relaxed">{t('address')}</span>
              </p>
              <p className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={`tel:${SITE.phoneHref}`} className="hover:underline">
                  {t('phone')}
                </a>
              </p>
            </div>
            <a
              href={SITE.mapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline mb-5"
              style={{ color: 'var(--accent)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {t('getDirections')}
            </a>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="flex flex-col gap-2">
              {officialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
            <a
              href={`${prefix}${EJE_PATH}`}
              className="font-medium hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              {eje('ctaButton')}
            </a>
            <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
          {/* 图片产权声明 */}
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('imageCredit')}</p>
        </div>
      </div>
    </footer>
  );
}
