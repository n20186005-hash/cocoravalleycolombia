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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href={homeHref} className="font-display text-lg font-semibold tracking-tight" style={{ color: filled ? 'var(--text-primary)' : '#fff' }}>
          {t('siteName')}
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`/${locale}/#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: filled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`${homeHref}#nearby`}
            className="shrink-0 rounded-full px-2 py-1 text-xs font-semibold sm:px-3 sm:text-sm"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
          >
            {t('nearby')}
          </a>
          <ThemeToggle />
          <LanguageToggle locale={locale} />
        </div>
      </div>
    </header>
  );
}
