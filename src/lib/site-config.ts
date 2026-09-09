/**
 * Cocora Valley — 单景点 SEO 实体绑定配置
 * ------------------------------------------------------------------
 * 所有名称(N)、地址(A)、电话(P)必须与 Google Maps 商家资料完全一致：
 *  Vía al Valle de Cocora, Km 11, Salento, Quindío, Colombia
 *  Cocora Valley / Valle de Cocora · +57 310 227 5091 · JGQ6+39 Salento
 * ------------------------------------------------------------------
 * 对应需求中的变量占位符：
 *  DOMAIN_NAME            => cocoravalleycolombia.com
 *  ATTRACTION_FULL_NAME   => Cocora Valley / Valle de Cocora（官方全称，随语言主名变化）
 *  ATTRACTION_SHORT_NAME  => 域名字面含义 Cocora Valley（等价名称在 altNames 中绑定）
 *  CITY_NAME              => Salento
 *  STATE_PROVINCE         => Quindío
 *  COUNTRY_NAME           => Colombia
 *  COUNTRY_CODE_2LETTER   => CO
 *  POSTAL_CODE            => 631020
 *  LATITUDE / LONGITUDE   => 4.6413864 / -75.5031952（官方 Google Maps 嵌入坐标）
 *  MAPS_SHARE_URL         => https://maps.app.goo.gl/BZN9DW5ac8TXbF3C9
 *  MAPS_EMBED_SRC         => 见 mapsEmbedSrc
 *  NEARBY_LANDMARK_1/2    => Plaza de Bolívar (Salento) / Acaime Hummingbird Sanctuary
 *  GOVT_TOURISM_URL       => https://colombia.travel/es
 */

export const DOMAIN = 'cocoravalleycolombia.com';
export const BASE_URL = `https://${DOMAIN}`;

export type Locale = 'zh' | 'en' | 'es';

export const LOCALES: Locale[] = ['zh', 'en', 'es'];

export const SITE = {
  /** 每语言下的主展示名（相当于 H1/品牌） */
  brandNames: {
    zh: '可可拉山谷',
    en: 'Cocora Valley',
    es: 'Valle de Cocora',
  } as Record<Locale, string>,

  /** Google Maps 商家资料中同时出现的两个官方名称 */
  officialNames: ['Cocora Valley', 'Valle de Cocora'] as string[],

  /** alternateName 等价名称，把域名含义(Cocora Valley)与官方全称(Valle de Cocora)等同起来 */
  altNames: {
    zh: ['Cocora Valley', 'Valle de Cocora', '可可拉山谷 Cocora Valley', 'Cocora Valley Salento'],
    en: ['Valle de Cocora', 'Cocora Valley Salento', 'Cocora Valley, Quindío', '可可拉山谷'],
    es: ['Cocora Valley', 'Valle de Cocora Salento', 'Valle de Cocora, Quindío'],
  } as Record<Locale, string[]>,

  // ----- 地址层级（地理位置归属）-----
  city: 'Salento',
  region: 'Quindío',
  country: 'Colombia',
  countryCode: 'CO',
  postalCode: '631020',

  // ----- NAP：名称-地址-电话（必须与地图资料一致）-----
  streetAddress: 'Vía al Valle de Cocora, Km 11',
  fullAddress: 'Vía al Valle de Cocora, Km 11, Salento, Quindío, Colombia',
  plusCode: 'JGQ6+39 Salento, Quindío, Colombia',
  phoneDisplay: '+57 310 227 5091',
  phoneHref: '+573102275091',

  // ----- Google Maps 展示数据 -----
  googleRating: '4.8',
  reviewCount: '26,506',
  category: 'National Park / Nature Reserve',

  // ----- 地理坐标（取自官方 Google Maps 嵌入链接：lat 4.6413864 / lng -75.5031952）-----
  latitude: 4.6413864,
  longitude: -75.5031952,

  mapsShareUrl: 'https://maps.app.goo.gl/BZN9DW5ac8TXbF3C9',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d56544.193144553734!2d-75.5031952!3d4.6413864!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38924a03c5355b%3A0x8d19427653a3da27!2sCocora%20Valley!5e1!3m2!1szh-CN!2s!4v1788951459930!5m2!1szh-CN!2s',

  // ----- 周边核心地标（语义集群）-----
  nearbyLandmarks: {
    zh: ['玻利瓦尔广场（萨伦托主广场）', 'Acaime 蜂鸟保护区'],
    en: ['Plaza de Bolívar (Salento Main Square)', 'Acaime Hummingbird Sanctuary'],
    es: ['Plaza de Bolívar (Plaza principal de Salento)', 'Santuario de Colibríes Acaime'],
  } as Record<Locale, [string, string]>,

  // ----- 权威出站链接（.gov / .travel 官方）-----
  officialLinks: {
    colombiaTravel: 'https://colombia.travel/es', // 官方旅游局门户
    nationalParks: 'https://www.parquesnacionales.gov.co/', // 国家自然公园管理局
    salentoAlcaldia: 'https://www.salento-quindio.gov.co/', // 萨伦托市政府
    quindioGov: 'https://www.quindio.gov.co/', // 金迪奥省政府
    crq: 'https://www.crq.gov.co/', // 金迪奥环境管理自治机构
  },

  // ----- 图片资产（og:image / Schema image）-----
  galleryFiles: {
    hero: 'cocora-valley (1).jpg',
    photo2: 'cocora-valley (2).jpg',
    photo3: 'cocora-valley (3).jpg',
  },
} as const;

/** Eje Cafetero 主题集群页路径（所有语言共享同一 slug） */
export const EJE_PATH = '/eje-cafetero';

/** 页面在 GitHub Pages/静态托管上的地理归属链（4.2 面包屑层级展示） */
export const GEO_CHAIN: Record<Locale, string[]> = {
  zh: ['可可拉山谷', '萨伦托 (Salento)', '金迪奥省 (Quindío)', '哥伦比亚'],
  en: ['Cocora Valley', 'Salento', 'Quindío', 'Colombia'],
  es: ['Valle de Cocora', 'Salento', 'Quindío', 'Colombia'],
};

/** 规范化单页 URL：https://cocoravalleycolombia.com/zh */
export function localizedPageUrl(locale: Locale, path = ''): string {
  return `${BASE_URL}/${locale}${path}`;
}

/** 将 public 下图片文件转为绝对 URL（自动做 URL 编码，兼容空格/括号文件名） */
export function assetUrl(file: string): string {
  return `${BASE_URL}/gallery/${file
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')}`;
}

/** OG/首图固定为 Hero 图 */
export const OG_IMAGE_URL = assetUrl(SITE.galleryFiles.hero);

/** 构造 TouristAttraction 结构化数据（含 @id / image / isAccessibleForFree） */
export function buildTouristAttractionSchema(locale: Locale, description: string) {
  const name = SITE.brandNames[locale];
  const canonical = localizedPageUrl(locale);
  // 页面可见的 Google Maps 评分（Hero/Reviews 同源展示），转换为 Schema 数值
  const ratingValue = parseFloat(SITE.googleRating);
  const reviewCount = parseInt(SITE.reviewCount.replace(/[^\d]/g, ''), 10) || 0;

  return {
    '@context': 'https://schema.org',
    // 双类型声明： TouristAttraction 满足旅游意图，Park 满足“公园/门票”实体识别
    '@type': ['TouristAttraction', 'Park'],
    '@id': `${BASE_URL}/#attraction`,
    name,
    alternateName: SITE.altNames[locale],
    description,
    url: canonical,
    image: [
      assetUrl(SITE.galleryFiles.hero),
      assetUrl(SITE.galleryFiles.photo2),
      assetUrl(SITE.galleryFiles.photo3),
    ],
    isAccessibleForFree: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.mapsShareUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating: 5,
      reviewCount,
    },
    sameAs: [
      SITE.mapsShareUrl,
      SITE.officialLinks.colombiaTravel,
      SITE.officialLinks.nationalParks,
      SITE.officialLinks.salentoAlcaldia,
      SITE.officialLinks.quindioGov,
    ],
  };
}

/** 构造 FAQPage 结构化数据（Featured Snippet / AI Overview） */
export function buildFaqPageSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** 构造 BreadcrumbList（Home > Cocora Valley in Salento, Quindío） */
export function buildBreadcrumbSchema(locale: Locale, homeLabel: string) {
  const name = SITE.brandNames[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${BASE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${name} (${SITE.city}, ${SITE.region})`,
        item: localizedPageUrl(locale),
      },
    ],
  };
}
