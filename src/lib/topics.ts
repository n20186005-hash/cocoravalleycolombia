import type { Locale } from './site-config';
import { salentoAttractions } from './salento-attractions';
import { salentoDayTrip } from './salento-day-trip';

export type TopicKey = 'fees' | 'hiking' | 'getting' | 'salento-day-trip' | 'salento-plaza' | 'salento-alto';

export interface TopicSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface TopicFaq {
  q: string;
  a: string;
}

export interface TopicPlace {
  address: string;
  mapUrl: string;
  management: Record<Locale, string>;
  managementSource: string;
  transport: Record<Locale, string>;
  photo?: { file: string; source: string; author: string };
  rating?: { score: string; count: number; source: string; checked: string };
}

export interface Topic {
  key: TopicKey;
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  lead: Record<Locale, string>;
  verifiedLabel: Record<Locale, string>;
  source: { name: Record<Locale, string>; url: string };
  place?: TopicPlace;
  mapStops?: { name: Record<Locale, string>; query: string }[];
  sections: Record<Locale, TopicSection[]>;
  faq: Record<Locale, TopicFaq[]>;
}

export const TOPICS: Topic[] = [
  {
    key: 'fees',
    slug: { es: 'entradas-precios-horarios', en: 'entrance-fees', zh: 'entrance-fees' },
    title: {
      es: 'Entradas, Precios y Horarios del Valle de Cocora',
      en: 'Cocora Valley Entrance Fees & Opening Hours',
      zh: '可可拉山谷门票价格与开放时间',
    },
    metaTitle: {
      es: 'Entradas y Horarios Valle de Cocora 2026 (Salento) — Guía de Precios',
      en: 'Cocora Valley Entrance Fees & Hours 2026 (Salento) — Price Guide',
      zh: '可可拉山谷 2026 门票价格与开放时间（萨伦托）— 费用指南',
    },
    metaDescription: {
      es: 'Precios de entrada del Valle de Cocora en 2026: cuánto cuesta, pagos en efectivo por tramos, horarios diarios 08:00–18:00 y cómo reservar. Todo lo que necesitas saber antes de ir.',
      en: 'Cocora Valley entrance fees in 2026: how much it costs, cash payments by segment, daily 08:00–18:00 opening hours and whether you can book online. Everything you need before you go.',
      zh: '2026 年可可拉山谷门票费用：价格多少、沿途分段现金支付、每日 08:00–18:00 开放时间，以及是否需要在线预订。出发前必读。',
    },
    lead: {
      es: 'El Valle de Cocora no funciona como un parque nacional con taquilla única. La mayor parte de los senderos atraviesa fincas privadas, por lo que el acceso se paga en efectivo por tramos. Esta guía reúne los precios y horarios verificados en octubre de 2026 para que planees sin sorpresas.',
      en: 'Cocora Valley is not run like a national park with a single ticket office. Most of the trails cross private farmland, so access is paid in cash by segment. This guide gathers the prices and hours verified in October 2026 so you can plan without surprises.',
      zh: '可可拉山谷并不像封闭式国家公园那样设有统一售票处。大部分徒步路线穿越私人土地，因此门票需沿途分段以现金支付。本页汇总了 2026 年 10 月核实的价格与开放时间，让你安心规划行程。',
    },
    verifiedLabel: {
      es: 'Verificado en octubre de 2026',
      en: 'Verified October 2026',
      zh: '已于 2026 年 10 月核实',
    },
    source: {
      name: {
        es: 'Parques Nacionales Naturales de Colombia',
        en: 'Colombia National Natural Parks',
        zh: '哥伦比亚国家自然公园管理局',
      },
      url: 'https://www.parquesnacionales.gov.co/',
    },
    sections: {
      es: [
        {
          heading: '¿Cuánto cuesta entrar?',
          paragraphs: [
            'No existe un boleto único que incluya todo el recorrido. En 2026 el costo total aproximado para recorrer las rutas principales ronda los COP $30.000 – $50.000 por persona, pagado en varios puntos de control a lo larada del camino.',
            'Los montos se cobran por tramo y a los propietarios privados: el bosque principal de palmas de cera, la Finca El Portón y el santuario de colibríes Acaime tienen cobros separados. Lleva efectivo suficiente en Salento antes de subir.',
          ],
          list: [
            'Bosque de Palmas de Cera (miradores principales): pago en el puesto de entrada privado.',
            'Santuario de Colibríes Acaime: tarifa de ingreso adicional + consumo opcional (chocolate con queso).',
            'Cabalgata: recorrido a caballo con guías locales, se cotiza aparte.',
          ],
        },
        {
          heading: 'Horarios de acceso',
          paragraphs: [
            'El acceso al valle está abierto todos los días de 08:00 a 18:00. Los puestos de control privados pueden cerrar antes del cierre general, sobre todo en temporada baja, así que conviene llegar temprano.',
            'La mejor hora para entrar es al amanecer: hay más probabilidad de cielo despejado y menos lluvia, y los jeeps Willys desde Salento empiezan a salir cerca de las 6:00 a.m.',
          ],
        },
        {
          heading: '¿Se puede reservar o comprar en línea?',
          paragraphs: [
            'No hay venta oficial de entradas por internet ni reserva obligatoria para caminar por el valle. El pago se hace directamente en los puestos de control el día de la visita.',
            'El transporte en jeep Willys tampoco requiere reserva: se paga al subir, en efectivo. En temporada alta (festivos y fines de semana) puede haber fila, así que salir temprano desde Salento ayuda.',
          ],
        },
        {
          heading: 'Consejos de pago',
          list: [
            'Retira efectivo en Salento: dentro del valle no hay cajeros y el pago con tarjeta es poco fiable.',
            'Lleva billetes pequeños; los cobradores privados pueden no tener cambio.',
            'El estacionamiento en la entrada suele ser aparte y puede tener su propio cobro.',
          ],
        },
      ],
      en: [
        {
          heading: 'How much does it cost?',
          paragraphs: [
            'There is no single all-inclusive ticket. In 2026 the total approximate cost to walk the main routes is about COP $30,000 – $50,000 per person, paid at several checkpoints along the way.',
            'Fees are charged per segment to private landowners: the main wax palm forest, Finca El Portón and the Acaime hummingbird sanctuary each have separate charges. Withdraw enough cash in Salento before you go up.',
          ],
          list: [
            'Wax Palm forest (main viewpoints): paid at the private entrance booth.',
            'Acaime Hummingbird Sanctuary: separate entrance fee + optional food (hot chocolate with cheese).',
            'Horseback ride: arranged with local guides, priced separately.',
          ],
        },
        {
          heading: 'Opening hours',
          paragraphs: [
            'Valley access is open every day from 08:00 to 18:00. Private checkpoints may close before the general closing time, especially in low season, so it is best to arrive early.',
            'The best time to enter is at sunrise: clearer skies and less rain are more likely, and the Willys jeeps from Salento start leaving around 6:00 a.m.',
          ],
        },
        {
          heading: 'Can you book or buy online?',
          paragraphs: [
            'There is no official online ticket sale and no mandatory reservation to walk the valley. Payment is made directly at the checkpoints on the day of your visit.',
            'The Willys jeep transport also needs no booking: you pay on board, in cash. In high season (holidays and weekends) there can be a queue, so leaving early from Salento helps.',
          ],
        },
        {
          heading: 'Payment tips',
          list: [
            'Withdraw cash in Salento: there are no ATMs inside the valley and card payment is unreliable.',
            'Bring small bills; private collectors may not have change.',
            'Parking at the entrance is usually separate and may have its own charge.',
          ],
        },
      ],
      zh: [
        {
          heading: '门票价格是多少？',
          paragraphs: [
            '这里没有包含全程的统一套票。2026 年走完主要路线的人均总费用大约为 30,000–50,000 哥伦比亚比索，需沿路在多个检查站分别支付。',
            '费用按路段向私人土地所有者收取：主要的蜡棕榈林、El Portón 农庄以及 Acaime 蜂鸟保护区各有单独的收费。出发上山前请在萨伦托取足现金。',
          ],
          list: [
            '蜡棕榈林（主要观景台）：在私人入口岗亭付费。',
            'Acaime 蜂鸟保护区：单独的入园费 + 可选的餐饮（奶酪热巧克力）。',
            '骑马：由当地向导安排，单独计价。',
          ],
        },
        {
          heading: '开放时间',
          paragraphs: [
            '山谷每日 08:00–18:00 开放。私人检查站可能比统一闭园时间更早关闭，淡季尤其如此，因此建议尽早到达。',
            '最佳入园时间是日出时分：更可能遇到晴朗少雨的天气，而且从萨伦托出发的吉普车大约早上 6:00 就开始发车。',
          ],
        },
        {
          heading: '可以在线预订或购票吗？',
          paragraphs: [
            '没有官方在线售票，徒步山谷也无需强制预约。费用在参观当天的检查站现场支付即可。',
            'Willys 吉普车也无需预约：上车付现金即可。旺季（节假日和周末）可能需要排队，所以早点从萨伦托出发更稳妥。',
          ],
        },
        {
          heading: '支付小贴士',
          list: [
            '在萨伦托取现金：山谷内没有 ATM，刷卡也不可靠。',
            '带小面额钞票，私人收费员可能没有零钱。',
            '入口停车通常单独收费，且可能另有计费。',
          ],
        },
      ],
    },
    faq: {
      es: [
        { q: '¿Cuánto cuesta la entrada al Valle de Cocora en 2026?', a: 'No hay un boleto único. El costo total aproximado es COP $30.000 – $50.000 por persona, pagado en efectivo por tramos a lo largo del sendero (bosque de palmas, Acaime, Finca El Portón).' },
        { q: '¿Se paga con tarjeta?', a: 'Casi siempre se paga en efectivo a propietarios privados. Retira efectivo en Salento antes de subir; las tarjetas rara vez funcionan en los puestos del valle.' },
        { q: '¿A qué hora abre el Valle de Cocora?', a: 'Todos los días de 08:00 a 18:00. Los puestos privados pueden cerrar antes; la mejor hora para entrar es al amanecer.' },
        { q: '¿Puedo comprar la entrada por internet?', a: 'No. El acceso se paga en los puestos de control el día de la visita. Tampoco se requiere reserva para caminar por el valle.' },
      ],
      en: [
        { q: 'How much is the entrance fee to Cocora Valley in 2026?', a: 'There is no single ticket. The total approximate cost is COP $30,000 – $50,000 per person, paid in cash by segment along the trail (wax palm forest, Acaime, Finca El Portón).' },
        { q: 'Can I pay by card?', a: 'Almost always cash to private landowners. Withdraw cash in Salento before going up; cards rarely work at the valley booths.' },
        { q: 'What time does Cocora Valley open?', a: 'Every day from 08:00 to 18:00. Private booths may close earlier; the best time to enter is at sunrise.' },
        { q: 'Can I buy the ticket online?', a: 'No. Access is paid at the checkpoints on the day of your visit. No reservation is required to walk the valley.' },
      ],
      zh: [
        { q: '2026 年可可拉山谷门票多少钱？', a: '这里没有统一门票。人均总费用大约为 30,000–50,000 比索，需沿步道分段以现金支付（蜡棕榈林、Acaime、El Portón 农庄）。' },
        { q: '可以刷卡吗？', a: '几乎都是向私人土地所有者支付现金。上山前请在萨伦托取现金；山谷内的刷卡机很少能用。' },
        { q: '可可拉山谷几点开放？', a: '每日 08:00–18:00。私人岗亭可能更早关闭；最佳入园时间是日出时分。' },
        { q: '可以在线购买门票吗？', a: '不可以。费用在参观当天的检查站现场支付，徒步山谷也无需预约。' },
      ],
    },
  },

  {
    key: 'hiking',
    slug: { es: 'senderismo-rutas', en: 'hiking-trails', zh: 'hiking-trails' },
    title: {
      es: 'Rutas de Senderismo en el Valle de Cocora',
      en: 'Cocora Valley Hiking Trails',
      zh: '可可拉山谷徒步路线',
    },
    metaTitle: {
      es: 'Senderismo Valle de Cocora 2026: Rutas, Distancia y Dificultad',
      en: 'Cocora Valley Hiking Trails 2026: Routes, Distance & Difficulty',
      zh: '可可拉山谷徒步路线 2026：路线、距离与难度',
    },
    metaDescription: {
      es: 'Compara el circuito completo (12–15 km) y la ruta corta (2–3 km) del Valle de Cocora: distancia, desnivel, tiempo, estado del sendero y qué llevar. Guía práctica para la caminata.',
      en: 'Compare the full loop (12–15 km) and the short route (2–3 km) of Cocora Valley: distance, elevation, time, trail conditions and what to bring. A practical hiking guide.',
      zh: '对比可可拉山谷的大环线（12–15 公里）与精华短线（2–3 公里）：距离、爬升、耗时、路况与装备清单。实用徒步指南。',
    },
    lead: {
      es: 'El Valle de Cocora ofrece dos formas principales de caminar entre las palmas de cera más altas del mundo. Esta guía compara ambas rutas con datos verificados en octubre de 2026 para que elijas según tu tiempo y condición física.',
      en: 'Cocora Valley offers two main ways to walk among the tallest wax palms on Earth. This guide compares both routes with data verified in October 2026 so you can choose based on your time and fitness.',
      zh: '可可拉山谷提供两种主要走法，穿行于世界上最高的蜡棕榈之间。本指南对比两条路线，数据于 2026 年 10 月核实，方便你按时间和体力选择。',
    },
    verifiedLabel: {
      es: 'Verificado en octubre de 2026',
      en: 'Verified October 2026',
      zh: '已于 2026 年 10 月核实',
    },
    source: {
      name: {
        es: 'Parques Nacionales Naturales de Colombia',
        en: 'Colombia National Natural Parks',
        zh: '哥伦比亚国家自然公园管理局',
      },
      url: 'https://www.parquesnacionales.gov.co/',
    },
    sections: {
      es: [
        {
          heading: 'Comparación rápida',
          list: [
            'Circuito completo: 12–15 km · 5–6 h · desnivel 600–800 m · dificultad moderada-alta.',
            'Ruta corta: 2–3 km · 1.5–2 h · desnivel suave · dificultad fácil.',
          ],
        },
        {
          heading: 'El Circuito Completo (antihorario)',
          paragraphs: [
            'Arranca en la Puerta Azul, a la derecha de la entrada. Primero cruzas el bosque nuboso denso y cinco o seis puentes colgantes sobre ríos rápidos; luego una subida fuerte hasta Finca La Montaña, el punto más alto, y bajas por el Bosque de Palmas de Cera. Hacerlo en sentido antihorario deja las palmas para el final y cuida las rodillas.',
            'El desnivel acumulado es de 600–800 m y la altitud va de ~2.400 m hasta ~2.860 m. Por eso la ruta corta es la mejor opción si llueve fuerte o si vas con niños o menos preparación.',
          ],
        },
        {
          heading: 'La Ruta Corta (horaria)',
          paragraphs: [
            'Desde la entrada vas directo por el camino principal hacia la izquierda hasta los miradores 1 y 2. Es empinada pero corta, ideal para fotos con la luz de la mañana y para quienes tienen poco tiempo.',
          ],
        },
        {
          heading: 'Estado del sendero y clima',
          paragraphs: [
            'El valle recibe lluvia todo el año; los senderos suelen estar muy embarrados. Rentar botas de goma en la entrada o en Salento es casi obligatorio.',
            'La niebla y la lluvia llegan después del mediodía. Empieza temprano: a las 6–7 a.m. las posibilidades de cielo despejado son mayores.',
          ],
        },
        {
          heading: 'Qué llevar',
          list: [
            'Efectivo para las entradas y el jeep.',
            'Botas de goma o zapatos de suela agresiva.',
            'Impermeable, porque la lluvia es frecuente.',
            'Agua y un snack; los tramos remotos no venden nada.',
            'Protección solar y gorra: la radiación UV es fuerte a 2.400 m.',
          ],
        },
      ],
      en: [
        {
          heading: 'Quick comparison',
          list: [
            'Full loop: 12–15 km · 5–6 h · 600–800 m elevation gain · moderate-hard.',
            'Short route: 2–3 km · 1.5–2 h · gentle elevation · easy.',
          ],
        },
        {
          heading: 'The Full Loop (counter-clockwise)',
          paragraphs: [
            'It starts at the Blue Gate on the right of the entrance. First you cross the dense cloud forest and five or six suspension bridges over fast rivers; then a steep climb to Finca La Montaña, the highest point, and you descend through the Wax Palm forest. Going counter-clockwise saves the palms for the end and is easier on the knees.',
            'The accumulated elevation gain is 600–800 m and the altitude runs from ~2,400 m up to ~2,860 m. That is why the short route is the better choice in heavy rain or with children or less preparation.',
          ],
        },
        {
          heading: 'The Short Route (clockwise)',
          paragraphs: [
            'From the entrance go straight left along the main road to Viewpoints 1 and 2. It is steep but short, ideal for morning-light photos and for those short on time.',
          ],
        },
        {
          heading: 'Trail conditions and weather',
          paragraphs: [
            'The valley gets rain all year; the trails are usually very muddy. Renting rubber boots at the entrance or in Salento is almost mandatory.',
            'Fog and rain arrive after midday. Start early: at 6–7 a.m. the chance of clear sky is higher.',
          ],
        },
        {
          heading: 'What to bring',
          list: [
            'Cash for entrance fees and the jeep.',
            'Rubber boots or shoes with aggressive tread.',
            'A rain jacket, because rain is frequent.',
            'Water and a snack; remote sections sell nothing.',
            'Sun protection and a cap: UV is strong at 2,400 m.',
          ],
        },
      ],
      zh: [
        {
          heading: '快速对比',
          list: [
            '大环线：12–15 公里 · 5–6 小时 · 爬升 600–800 米 · 难度中高。',
            '精华短线：2–3 公里 · 1.5–2 小时 · 爬升平缓 · 难度轻松。',
          ],
        },
        {
          heading: '大环线（逆时针）',
          paragraphs: [
            '从入口右侧的蓝门出发。先穿越茂密的云雾森林，走过五六座横跨湍急河流的悬索桥；随后是一段陡峭爬升到达最高点 Finca La Montaña，再沿蜡棕榈林下山。逆时针走可以把棕榈林留到最后，也更护膝盖。',
            '累计爬升约 600–800 米，海拔从约 2,400 米上升到约 2,860 米。因此大雨天、带小孩或体力一般时，短线是更好的选择。',
          ],
        },
        {
          heading: '精华短线（顺时针）',
          paragraphs: [
            '从入口沿主路向左直达 1 号和 2 号观景台。路线陡峭但短，适合清晨光线拍照，也适合时间紧张的游客。',
          ],
        },
        {
          heading: '路况与天气',
          paragraphs: [
            '山谷全年多雨，路面通常非常泥泞。在入口或萨伦托租用橡胶雨靴几乎必不可少。',
            '中午之后常起雾下雨。尽早出发：早上 6–7 点遇到晴朗天空的概率更高。',
          ],
        },
        {
          heading: '装备清单',
          list: [
            '用于门票和吉普车的现金。',
            '橡胶雨靴或抓地力强的鞋子。',
            '雨衣，因为降雨频繁。',
            '水和零食；偏远路段没有售卖。',
            '防晒和帽子：2,400 米海拔紫外线很强。',
          ],
        },
      ],
    },
    faq: {
      es: [
        { q: '¿Cuánto mide el circuito completo del Valle de Cocora?', a: 'Aproximadamente 12–15 km en 5–6 horas, con 600–800 m de desnivel, saliendo de ~2.400 m hasta ~2.860 m.' },
        { q: '¿La ruta corta vale la pena?', a: 'Sí si tienes poco tiempo: 2–3 km y 1.5–2 h hasta los miradores de las palmas, con buena luz matutina para fotos.' },
        { q: '¿Está muy embarrado el sendero?', a: 'Casi siempre. Por lluvia todo el año, renta botas de goma en la entrada o Salento.' },
        { q: '¿Se puede ir a caballo?', a: 'Sí, guías locales ofrecen cabalgata por tramos; se cotiza aparte de la entrada a pie.' },
      ],
      en: [
        { q: 'How long is the full Cocora Valley loop?', a: 'About 12–15 km in 5–6 hours, with 600–800 m of elevation gain, from ~2,400 m up to ~2,860 m.' },
        { q: 'Is the short route worth it?', a: 'Yes if you are short on time: 2–3 km and 1.5–2 h to the palm viewpoints, with good morning light for photos.' },
        { q: 'Is the trail very muddy?', a: 'Almost always. It rains all year, so rent rubber boots at the entrance or in Salento.' },
        { q: 'Can I go on horseback?', a: 'Yes, local guides offer horseback rides on sections; this is priced separately from the walking entrance.' },
      ],
      zh: [
        { q: '可可拉山谷大环线有多长？', a: '大约 12–15 公里，需 5–6 小时，累计爬升 600–800 米，海拔从约 2,400 米上升到约 2,860 米。' },
        { q: '精华短线值得走吗？', a: '时间紧的话很值得：2–3 公里、1.5–2 小时即可到达棕榈观景台，清晨光线也很适合拍照。' },
        { q: '步道很泥泞吗？', a: '几乎一直如此。这里全年多雨，建议在入口或萨伦托租用橡胶雨靴。' },
        { q: '可以骑马吗？', a: '可以，当地向导提供分段骑马，费用与步行门票分开计算。' },
      ],
    },
  },

  {
    key: 'getting',
    slug: { es: 'como-llegar-desde-salento', en: 'getting-there', zh: 'getting-there' },
    title: {
      es: 'Cómo Llegar al Valle de Cocora desde Salento',
      en: 'How to Get to Cocora Valley from Salento',
      zh: '如何从萨伦托前往可可拉山谷',
    },
    metaTitle: {
      es: 'Cómo Llegar al Valle de Cocora desde Salento 2026 — Jeep Willys y Parqueo',
      en: 'How to Get to Cocora Valley from Salento 2026 — Willys Jeep & Parking',
      zh: '如何从萨伦托前往可可拉山谷 2026 — Willys 吉普与停车',
    },
    metaDescription: {
      es: 'Cómo ir al Valle de Cocora desde Salento: jeep Willys desde la Plaza de Bolívar, horarios, precio aproximado, parqueo en la entrada y ruta en coche. Guía práctica verificada.',
      en: 'How to reach Cocora Valley from Salento: shared Willys jeep from Plaza de Bolívar, schedule, approximate price, entrance parking and driving route. A practical, verified guide.',
      zh: '如何从萨伦托前往可可拉山谷：玻利瓦尔广场乘坐 Willys 吉普、发车时间、参考价格、入口停车与自驾路线。实用核实指南。',
    },
    lead: {
      es: 'Salento es la puerta de entrada al Valle de Cocora. La forma más común y económica es el jeep Willys compartido que sale de la plaza principal. Aquí los detalles verificados en octubre de 2026.',
      en: 'Salento is the gateway to Cocora Valley. The most common and affordable way up is the shared Willys jeep from the main square. Here are the details verified in October 2026.',
      zh: '萨伦托是可可拉山谷的门户。最常见也最省钱的交通方式是从主广场搭乘拼车的 Willys 吉普。以下是 2026 年 10 月核实的细节。',
    },
    verifiedLabel: {
      es: 'Verificado en octubre de 2026',
      en: 'Verified October 2026',
      zh: '已于 2026 年 10 月核实',
    },
    source: {
      name: {
        es: 'Alcaldía de Salento',
        en: 'Salento Municipality',
        zh: '萨伦托市政府',
      },
      url: 'https://www.salento-quindio.gov.co/',
    },
    sections: {
      es: [
        {
          heading: 'En jeep Willys desde Salento',
          paragraphs: [
            'Los jeeps Willys salen de la Plaza de Bolívar, en el centro de Salento, directo a la entrada del valle. El viaje dura unos 25–30 minutos por una carretera de montaña.',
            'No necesitas reserva: pagas al subir, en efectivo. Los primeros jeeps salen cerca de las 6:00 a.m. y siguen durante el día hasta la tarde; el regreso se toma en el mismo punto de la entrada.',
          ],
          list: [
            'Punto de abordaje: Plaza de Bolívar (centro de Salento).',
            'Tarifa aproximada: COP $8.000 – $10.000 por persona, por trayecto (confirmar en el lugar).',
            'Horario: desde ~6:00 a.m.; regreso durante el día.',
          ],
        },
        {
          heading: 'En coche particular',
          paragraphs: [
            'Desde Salento sigue la carretera unos 11 km hasta la entrada del valle. La condición de la vía varía con el clima; conduce con cuidado.',
            'Puedes dejar el carro en los parqueaderos y espacios junto a la vía cerca de la entrada. Se llenan rápido los fines de semana y festivos: llega temprano y no dejes objetos de valor a la vista.',
          ],
        },
        {
          heading: 'Desde los aeropuertos (Armenia o Pereira)',
          paragraphs: [
            'El aeropuerto más cercano es El Edén (Armenia) o Matecaña (Pereira). Desde allí primero debes llegar a Salento (bus o taxi) y luego tomar el jeep Willys al valle.',
          ],
        },
        {
          heading: 'Parqueo y consejos',
          list: [
            'El estacionamiento en la entrada suele tener un cobro aparte.',
            'Retira efectivo en Salento antes de subir.',
            'Si vas en temporada alta, sal temprano para evitar filas en el jeep.',
          ],
        },
      ],
      en: [
        {
          heading: 'By shared Willys jeep from Salento',
          paragraphs: [
            'The Willys jeeps leave from Plaza de Bolívar, in the centre of Salento, straight to the valley entrance. The ride takes about 25–30 minutes along a mountain road.',
            'No booking needed: you pay on board, in cash. The first jeeps leave around 6:00 a.m. and run through the day into the afternoon; the return is picked up at the same entrance point.',
          ],
          list: [
            'Boarding point: Plaza de Bolívar (Salento centre).',
            'Approximate fare: COP $8,000 – $10,000 per person, per ride (confirm on site).',
            'Schedule: from ~6:00 a.m.; returns through the day.',
          ],
        },
        {
          heading: 'By private car',
          paragraphs: [
            'From Salento follow the road about 11 km to the valley entrance. Road condition varies with the weather; drive carefully.',
            'You can leave the car in the lots and roadside spaces near the entrance. They fill up quickly on weekends and holidays: arrive early and do not leave valuables in sight.',
          ],
        },
        {
          heading: 'From the airports (Armenia or Pereira)',
          paragraphs: [
            'The nearest airport is El Edén (Armenia) or Matecaña (Pereira). From there you must first reach Salento (bus or taxi) and then take the Willys jeep to the valley.',
          ],
        },
        {
          heading: 'Parking and tips',
          list: [
            'Parking at the entrance is usually charged separately.',
            'Withdraw cash in Salento before going up.',
            'In high season, leave early to avoid jeep queues.',
          ],
        },
      ],
      zh: [
        {
          heading: '从萨伦托乘坐 Willys 吉普',
          paragraphs: [
            'Willys 吉普从萨伦托镇中心的玻利瓦尔广场（Plaza de Bolívar）发车，直达山谷入口。车程约 25–30 分钟，走的是山路。',
            '无需预约：上车付现金即可。头班车大约早上 6:00 发出，白天一直运营到下午；回程也在入口同一地点乘车。',
          ],
          list: [
            '上车点：玻利瓦尔广场（萨伦托镇中心）。',
            '参考票价：每人单程约 8,000–10,000 比索（以现场为准）。',
            '时间：约早上 6:00 起；回程白天持续发车。',
          ],
        },
        {
          heading: '自驾前往',
          paragraphs: [
            '从萨伦托沿公路行驶约 11 公里即到山谷入口。路况会随天气变化，请小心驾驶。',
            '车辆可停在入口附近的停车场和路边空地。周末和节假日很快停满：尽早到达，且不要把贵重物品留在车内。',
          ],
        },
        {
          heading: '从机场（阿曼尼亚或佩雷拉）出发',
          paragraphs: [
            '最近的机场是阿曼尼亚的 El Edén 或佩雷拉的 Matecaña。抵达后需先到萨伦托（巴士或出租车），再换乘 Willys 吉普前往山谷。',
          ],
        },
        {
          heading: '停车与建议',
          list: [
            '入口停车通常单独收费。',
            '上山前请在萨伦托取现金。',
            '旺季请早点出发，以免吉普车排队。',
          ],
        },
      ],
    },
    faq: {
      es: [
        { q: '¿Cómo llego al Valle de Cocora desde Salento?', a: 'En jeep Willys desde la Plaza de Bolívar: 25–30 min, pagas al subir en efectivo, primeros jeeps cerca de las 6:00 a.m.' },
        { q: '¿Cuánto cuesta el jeep a Cocora?', a: 'Aproximadamente COP $8.000 – $10.000 por persona por trayecto; confirma el monto en el lugar, puede variar.' },
        { q: '¿Puedo ir en mi propio carro?', a: 'Sí, son 11 km desde Salento. Hay parqueo en la entrada (cobro aparte) que se llena rápido los fines de semana.' },
        { q: '¿Desde qué aeropuerto llego más fácil?', a: 'El Edén (Armenia) o Matecaña (Pereira); luego bus/taxi a Salento y jeep al valle.' },
      ],
      en: [
        { q: 'How do I get to Cocora Valley from Salento?', a: 'By Willys jeep from Plaza de Bolívar: 25–30 min, pay on board in cash, first jeeps around 6:00 a.m.' },
        { q: 'How much is the jeep to Cocora?', a: 'Approximately COP $8,000 – $10,000 per person per ride; confirm the amount on site, it can vary.' },
        { q: 'Can I drive my own car?', a: 'Yes, it is 11 km from Salento. There is parking at the entrance (charged separately) that fills up quickly on weekends.' },
        { q: 'Which airport is easiest?', a: 'El Edén (Armenia) or Matecaña (Pereira); then bus/taxi to Salento and jeep to the valley.' },
      ],
      zh: [
        { q: '如何从萨伦托前往可可拉山谷？', a: '从玻利瓦尔广场乘坐 Willys 吉普：25–30 分钟，上车付现金，头班车约早上 6:00。' },
        { q: '去可可拉山谷的吉普车多少钱？', a: '每人单程大约 8,000–10,000 比索；以现场金额为准，可能有所变动。' },
        { q: '可以自驾吗？', a: '可以，从萨伦托约 11 公里。入口有停车场（单独收费），周末很快停满。' },
        { q: '从哪个机场最方便？', a: '阿曼尼亚的 El Edén 或佩雷拉的 Matecaña；之后乘巴士/出租车到萨伦托，再换吉普进山谷。' },
      ],
    },
  },
  salentoDayTrip,
  ...salentoAttractions,
];

export function getTopic(locale: Locale, slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug[locale] === slug);
}

export function topicPath(locale: Locale, topic: Topic): string {
  return `/${locale}/${topic.slug[locale]}`;
}
