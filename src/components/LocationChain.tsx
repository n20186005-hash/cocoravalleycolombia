import { useLocale } from 'next-intl';
import { GEO_CHAIN, type Locale } from '@/lib/site-config';

/**
 * 地理归属层级展示（4.2）：
 * ATTRACTION_FULL_NAME → CITY_NAME → STATE_PROVINCE → COUNTRY_NAME
 * 在正文视觉上将实体与行政区划归属绑定。
 */
export default function LocationChain() {
  const locale = useLocale() as Locale;
  const chain = GEO_CHAIN[locale] || GEO_CHAIN.en;

  return (
    <nav aria-label="Geographic location" className="mb-6">
      <ol
        className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ color: 'var(--accent)' }}
      >
        {chain.map((part, i) => (
          <li key={`${part}-${i}`} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="opacity-50 text-[10px]">
                →
              </span>
            )}
            <span>{part}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
