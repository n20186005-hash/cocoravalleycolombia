import { getTranslations, setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { BASE_URL, LOCALES, type Locale } from '@/lib/site-config';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'footer' });
  return {
    title: t('sources'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/sources`,
      languages: Object.fromEntries(LOCALES.map(lang => [lang, `${BASE_URL}/${lang}/sources`])),
    },
  };
}

export default async function SourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('footer');
  const links = t.raw('officialLinks') as Record<string, { name: string; url: string }>;

  return (
    <>
      <Header locale={locale} solid />
      <main className="mx-auto max-w-4xl px-5 pb-16 pt-28">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{t('sources')}</h1>
        <h2 className="mt-10 mb-4 font-display text-xl font-semibold">{t('officialResourcesTitle')}</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {Object.values(links).map(link => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 text-[var(--accent)] hover:underline">{link.name}</a>
            </li>
          ))}
        </ul>
        <h2 className="mt-10 mb-2 font-display text-xl font-semibold">{t('photos')}</h2>
        <p className="text-[var(--text-secondary)]">{t('imageCredit')}</p>
      </main>
      <Footer />
    </>
  );
}
