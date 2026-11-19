import { setRequestLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import CultureSection from '@/components/CultureSection';
import WeatherSection from '@/components/WeatherSection';
import RouteSection from '@/components/RouteSection';
import TopicLinks from '@/components/TopicLinks';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import MapEmbed from '@/components/MapEmbed';
import RegionCta from '@/components/RegionCta';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  buildTouristAttractionSchema,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  type Locale,
} from '@/lib/site-config';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  // 从本地化消息中读取 FAQ / meta，构建对应语言的 JSON-LD
  const messages = (await getMessages()) as any;
  const description = (messages?.meta?.description as string) || '';
  const homeLabel = messages.header.home as string;
  const faqItems = (messages?.faq?.items || []) as Array<{ q: string; a: string }>;

  const schemas: object[] = [
    buildTouristAttractionSchema(loc, description),
    buildBreadcrumbSchema(loc, homeLabel),
  ];
  if (faqItems.length > 0) {
    schemas.push(buildFaqPageSchema(faqItems));
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Header locale={loc} />
      <main>
        <Hero />
        <Intro />
        <TopicLinks locale={loc} nearby />
        <BasicInfo />
        <WeatherSection />
        <HistoryTimeline />
        <CultureSection />
        <RouteSection />
        <TopicLinks locale={loc} />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <FacilitiesSection />
        <Gallery />
        <Reviews />
        <FaqSection />
        <MapEmbed />
        <RegionCta />
      </main>
      <Footer />
    </>
  );
}
