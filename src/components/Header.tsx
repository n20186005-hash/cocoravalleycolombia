'use client';

import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/site-config';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ locale, solid = false }: { locale: Locale; solid?: boolean }) {
  const t = useTranslations('header');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const filled = solid || scrolled;
  const homeHref = `/${locale}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: filled ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: filled ? '1px solid var(--border-color)' : 'none',
        backdropFilter: filled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 sm:px-6 md:h-16 md:grid-cols-[1fr_auto_1fr]">
        <a href={homeHref} className="font-display text-lg font-semibold tracking-tight" style={{ color: filled ? 'var(--text-primary)' : '#fff' }}>
          {t('siteName')}
        </a>

        <nav className="col-span-2 row-start-2 flex items-center justify-center gap-4 sm:gap-6 md:col-span-1 md:col-start-2 md:row-start-1">
          {(['gallery', 'reviews', 'map', 'nearby'] as const).map((section) => (
            <a
              key={section}
              href={`/${locale}#${section}`}
              className="inline-flex min-h-10 items-center whitespace-nowrap text-sm font-medium transition-colors hover:underline underline-offset-4"
              style={{ color: filled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="col-start-2 row-start-1 flex min-h-12 items-center justify-end gap-2 md:col-start-3">
          <ThemeToggle />
          <LanguageToggle locale={locale} />
        </div>
      </div>
    </header>
  );
}
