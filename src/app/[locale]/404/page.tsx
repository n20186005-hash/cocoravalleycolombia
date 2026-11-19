import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/site-config';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'error404' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
    openGraph: { title: t('title'), description: t('description') },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function MissingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('error404');
  const header = await getTranslations('header');

  return (
    <main className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-semibold">404</h1>
        <p className="mt-3">{t('description')}</p>
        <a href={`/${locale}`} className="inline-block mt-5 underline">{header('backToHome')}</a>
      </div>
    </main>
  );
}
