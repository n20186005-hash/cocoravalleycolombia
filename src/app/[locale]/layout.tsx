import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { BASE_URL, OG_IMAGE_URL, SITE, localizedPageUrl, type Locale } from '@/lib/site-config';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const GA4_ID = 'G-HXM22WWPKP';
const GA4_SCRIPT = `(function() {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  // Google 同意模式 v2：默认拒绝统计/广告存储，读取用户偏好后更新
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
  try {
    var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
    if (prefs.analytics) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  } catch (e) {}
  gtag('config', '${GA4_ID}', { anonymize_ip: true });
})();`;

const THEME_SCRIPT = `(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch(e) {}
})();`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const brand = SITE.brandNames[loc];
  const selfUrl = localizedPageUrl(loc);

  const languages: Record<string, string> = {
    zh: localizedPageUrl('zh'),
    en: localizedPageUrl('en'),
    es: localizedPageUrl('es'),
    'x-default': localizedPageUrl('es'),
  };

  return {
    metadataBase: new URL(BASE_URL),
    title: messages.meta.title as string,
    description: messages.meta.description as string,
    applicationName: 'Cocora Valley',
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: messages.meta.title as string,
      description: messages.meta.description as string,
      url: selfUrl,
      siteName: brand,
      locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: OG_IMAGE_URL,
          alt: `${brand} in ${SITE.city}, ${SITE.country}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title as string,
      description: messages.meta.description as string,
      images: [OG_IMAGE_URL],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [{ url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }],
      apple: [{ url: '/icons/icon-512.png', sizes: '180x180', type: 'image/png' }],
    },
    appleWebApp: {
      capable: true,
      title: brand,
      statusBarStyle: 'black-translucent',
    },
    category: 'travel',
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a3a24',
  colorScheme: 'light dark',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    es: 'es',
  };

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: GA4_SCRIPT }} />
        {/* 首屏主题防闪烁 */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
