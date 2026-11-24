import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const links = [
    ['privacy-policy', t('privacy')],
    ['terms-of-service', t('terms')],
    ['cookie-settings', t('cookies')],
  ];

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-7 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <div className="max-w-xl">
          <p className="font-display font-semibold text-[var(--text-primary)]">{t('rights')}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{t('disclaimer')}</p>
        </div>
        <nav aria-label={t('legalNav')} className="flex flex-wrap gap-x-5 text-sm text-[var(--text-secondary)]">
          {links.map(([path, label]) => (
            <a key={path} href={`/${locale}/${path}`} className="py-2 hover:underline">{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
