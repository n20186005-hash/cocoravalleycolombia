'use client';

import { useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { LOCALES, type Locale } from '@/lib/site-config';
import { TOPICS } from '@/lib/topics';

const LANGUAGE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  zh: '中文',
};

function translatePath(pathname: string, from: Locale, to: Locale): string {
  const topic = TOPICS.find((t) => t.slug[from] === pathname);
  if (!topic) return pathname;
  return `/${topic.slug[to]}`;
}

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLanguageChange = (targetLocale: Locale) => {
    const newPath = translatePath(pathname, locale, targetLocale);
    window.location.href = `/${targetLocale}${newPath}`;
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        style={{
          background: 'var(--bg-tertiary)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-color)',
        }}
        aria-label="Change language"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{LANGUAGE_NAMES[locale]}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-xl py-2 shadow-lg z-50"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          {LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className="w-full text-left px-4 py-2 text-sm transition-colors hover:opacity-80"
              style={{
                color: loc === locale ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: loc === locale ? 600 : 400,
              }}
            >
              {LANGUAGE_NAMES[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
