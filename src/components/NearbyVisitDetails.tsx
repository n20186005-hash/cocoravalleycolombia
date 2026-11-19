import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { SITE, type Locale } from '@/lib/site-config';
import { nearbyVisits } from '@/lib/nearby-visits';
import type { Topic, TopicPlace } from '@/lib/topics';

const localeIndex = { es: 0, en: 1, zh: 2 } as const;

function VisitSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-8">
      <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div className="space-y-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </section>
  );
}

function Reference({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="underline underline-offset-4">{children}</a>;
}

export function NearbyVisitHours({ locale, topic }: { locale: Locale; topic: Topic }) {
  const visit = nearbyVisits[topic.key];
  if (!visit) return null;
  return <a href="#opening-hours" className="underline underline-offset-4">{visit.hours[localeIndex[locale]]}</a>;
}

export default function NearbyVisitDetails({ locale, topic, place }: { locale: Locale; topic: Topic; place: TopicPlace }) {
  const visit = nearbyVisits[topic.key];
  const t = useTranslations('nearbyVisit');
  if (!visit) return null;
  const index = localeIndex[locale];
  const lead = topic.lead[locale];
  const details = topic.sections[locale];
  const extra = (role: 'access' | 'route' | 'photo') =>
    details.filter((section) => section.role === role).flatMap((section) => section.paragraphs ?? [])
      .map((paragraph) => <p key={paragraph}>{paragraph}</p>);
  const facts = [
    [t('name'), topic.place ? topic.title[locale] : SITE.brandNames[locale]],
    [t('type'), visit.type[index]],
    [t('area'), visit.area[index]],
    [t('address'), place.address],
    [t('hours'), visit.hours[index]],
    [t('admission'), visit.admission[index]],
    ...(place.rating ? [[t('reviews'), `${place.rating.score} / 5 · ${new Intl.NumberFormat(locale).format(place.rating.count)} ${t('reviewCount')}`]] : []),
    [t('management'), place.management[locale]],
  ];
  return (
    <>
      <VisitSection title={t('explore')}>
        <p>{lead}</p>
        <h3 className="font-display text-lg font-semibold">{t('advice')}</h3>
        <p>{visit.advice[index]}</p>
        <h3 className="font-display text-lg font-semibold">{t('highlights')}</h3>
        <p>{visit.highlights[index]}</p>
      </VisitSection>

      <VisitSection title={t('about')}>
        <p>{place.management[locale]} <Reference href={place.managementSource}>{t('source')}</Reference></p>
      </VisitSection>

      <VisitSection title={t('basic')}>
        <dl className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
          {facts.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-4" style={{ borderColor: 'var(--border-color)' }}>
              <dt className="font-semibold">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </VisitSection>

      <VisitSection id="opening-hours" title={t('hours')}>
        <p>{visit.hours[index]}</p>
        {extra('access')}
        {visit.hoursSource && <Reference href={visit.hoursSource}>{t('source')}</Reference>}
      </VisitSection>

      <VisitSection title={t('admission')}>
        <p>{visit.admission[index]}</p>
        {visit.ticketSource && <Reference href={visit.ticketSource}>{t('source')}</Reference>}
      </VisitSection>

      <VisitSection title={t('transport')}>
        <p>{place.transport[locale]}</p>
      </VisitSection>

      <VisitSection title={t('charm')}>
        {details.filter((section) => !section.role).map((section) => (
          <div key={section.heading} className="space-y-2">
            <h3 className="font-display text-lg font-semibold">{section.heading}</h3>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.list?.length ? <ul className="list-disc pl-5">{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
          </div>
        ))}
      </VisitSection>

      <VisitSection title={t('route')}>
        <ol className="list-decimal space-y-2 pl-6">{visit.steps.map((step) => <li key={step[index]}>{step[index]}</li>)}</ol>
        {extra('route')}
      </VisitSection>

      <VisitSection title={t('notice')}><p>{visit.notice[index]}</p></VisitSection>
      <VisitSection title={t('photo')}>
        <p>{visit.photo[index]}</p>
        {extra('photo')}
      </VisitSection>
      <VisitSection title={t('stay')}><p>{visit.stay[index]}</p></VisitSection>

      <VisitSection title={t('reviews')}>
        {place.rating && (
          <p>
            <Reference href={place.rating.source}>
              <strong>{place.rating.score} / 5</strong> · {new Intl.NumberFormat(locale).format(place.rating.count)} {t('reviewCount')}
            </Reference>
            {' · '}{t('reviewed')} <time dateTime={place.rating.checked}>{place.rating.checked}</time>
          </p>
        )}
        <Reference href={place.mapUrl}>{t('readReviews')}</Reference>
      </VisitSection>

      <VisitSection title={t('directions')}>
        <p>{place.address}</p>
        <Reference href={place.mapUrl}>{t('map')}</Reference>
      </VisitSection>
    </>
  );
}
