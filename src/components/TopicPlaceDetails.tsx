import { SITE, type Locale } from '@/lib/site-config';
import type { TopicPlace } from '@/lib/topics';

export const valleyPlace: TopicPlace = {
  address: SITE.fullAddress,
  mapUrl: SITE.mapsShareUrl,
  managementSource: 'https://crq.gov.co/wp-content/uploads/2026/01/Estrategia-de-RdC_CRQ_doc.-ajustado_2026.pdf',
  management: {
    es: 'La Alcaldía de Salento y la Corporación Autónoma Regional del Quindío participan en la coordinación turística y ambiental. Los accesos y cobros pueden variar según el predio.',
    en: 'Salento’s municipality and the Quindío regional environmental authority help coordinate tourism and conservation. Access rules and charges can vary by property.',
    zh: '萨伦托市镇政府与金迪奥区域环境主管机构参与旅游与环保协调。各地块的通行规定和收费可能不同。',
  },
  transport: {
    es: 'Toma un Jeep Willys desde el parque principal de Salento. Confirma el punto de regreso y la última salida antes de entrar a los senderos.',
    en: 'Take a Willys jeep from Salento’s main square. Confirm the return pickup point and last departure before starting your walk.',
    zh: '从萨伦托主广场搭乘威利斯吉普车。进入步道前，确认返程上车点和当天末班车时间。',
  },
  rating: { score: SITE.googleRating, count: Number(SITE.reviewCount.replaceAll(',', '')), checked: '2026-10', source: SITE.mapsShareUrl },
};

const labels = {
  es: { management: 'Gestión del lugar', source: 'Consultar la fuente', basic: 'Datos básicos', address: 'Ubicación', map: 'Abrir en Google Maps', transport: 'Cómo llegar', reviews: 'Opiniones de visitantes', count: 'opiniones', snapshot: 'Referencia', read: 'Consultar opiniones en Google Maps' },
  en: { management: 'Site management', source: 'View source', basic: 'Basic information', address: 'Location', map: 'Open in Google Maps', transport: 'Getting there', reviews: 'Visitor reviews', count: 'reviews', snapshot: 'Snapshot', read: 'See visitor reviews on Google Maps' },
  zh: { management: '管理主体', source: '查看资料来源', basic: '基础信息', address: '地址', map: '在 Google 地图打开', transport: '交通方式', reviews: '游客评价', count: '条评价', snapshot: '资料日期', read: '在 Google 地图查看游客评价' },
};

export function TopicPlaceDetails({ locale, place, title }: { locale: Locale; place: TopicPlace; title?: string }) {
  const t = labels[locale];
  const aboutTitle = title && { es: `Acerca de ${title}`, en: `About ${title}`, zh: `关于${title}` }[locale];
  const rating = place.rating;
  const placeName = place === valleyPlace ? SITE.brandNames[locale] : undefined;
  return (
    <div className="mb-10 space-y-6 rounded-xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      <section>
        <h2 className="font-display text-xl font-semibold mb-2">{aboutTitle ?? t.management}</h2>
        <p>{place.management[locale]} <a className="underline" href={place.managementSource}>{t.source}</a></p>
      </section>
      <section>
        <h2 className="font-display text-xl font-semibold mb-2">{t.basic}</h2>
        <dl>
          <dt className="font-medium">{placeName ? `${t.address} · ${placeName}` : t.address}</dt>
          <dd>{place.address}</dd>
        </dl>
        <a className="underline" href={place.mapUrl}>{t.map}</a>
      </section>
      <section>
        <h2 className="font-display text-xl font-semibold mb-2">{t.transport}</h2>
        <p>{place.transport[locale]}</p>
      </section>
      <section>
        <h2 className="font-display text-xl font-semibold mb-2">{t.reviews}</h2>
        {rating && (
          <p className="mb-2">
            <a className="underline" href={rating.source}><strong>{rating.score} / 5</strong> · {new Intl.NumberFormat(locale).format(rating.count)} {t.count}</a>
            {' · '}{t.snapshot} <time dateTime={rating.checked}>{rating.checked}</time>
          </p>
        )}
        <a className="underline" href={place.mapUrl}>{t.read}</a>
      </section>
    </div>
  );
}
