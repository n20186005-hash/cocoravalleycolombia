import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cocoravalleycolombia.com';
  const locales = ['zh', 'en', 'es'];

  // [主页, 是否周更优先], 周边词
  const routes: Array<{ path: string; freq: 'weekly' | 'monthly'; priority: number }> = [
    { path: '', freq: 'weekly', priority: 1 },
    { path: '/eje-cafetero', freq: 'monthly', priority: 0.8 },
    { path: '/privacy-policy', freq: 'monthly', priority: 0.2 },
    { path: '/terms-of-service', freq: 'monthly', priority: 0.2 },
    { path: '/cookie-settings', freq: 'monthly', priority: 0.1 },
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.freq,
        priority: route.priority,
      });
    }
  }

  return sitemap;
}
