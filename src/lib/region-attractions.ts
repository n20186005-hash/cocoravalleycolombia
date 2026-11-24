import places from './quindio-region.json';
import type { Topic } from './topics';

const locales = ['es', 'en', 'zh'] as const;
const source = { es: 'Información del lugar', en: 'Visitor information', zh: '景点资料' };
const heading = { es: 'Recorrido a pie', en: 'Walking route', zh: '步行游线' };

export const regionAttractions: Topic[] = places.map((p) => ({
  key: `quindio-${p.slug}`,
  slug: { es: p.slug, en: p.slug, zh: p.slug },
  title: p.name,
  metaTitle: p.name,
  metaDescription: p.history,
  lead: p.history,
  verifiedLabel: source,
  source: { name: source, url: p.source },
  place: {
    address: p.address,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name.es + ', ' + p.address + ', Quindío, Colombia')}`,
    management: p.management,
    managementSource: p.source,
    transport: p.approach,
    photo: { file: `/gallery/quindio/${p.slug}.webp`, source: p.photoSource, provider: p.imageCredit },
  },
  sections: Object.fromEntries(locales.map((l) => [l, [
    { role: 'route', heading: heading[l], paragraphs: [p.route[l]] },
  ]])) as Topic['sections'],
  faq: Object.fromEntries(locales.map((l) => [l, [
    { q: p.question[l], a: p.answer[l] },
  ]])) as Topic['faq'],
}));
