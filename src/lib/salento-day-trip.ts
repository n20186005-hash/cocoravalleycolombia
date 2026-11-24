import type { Topic } from './topics';

export const salentoDayTrip: Topic = {
  key: 'salento-day-trip',
  slug: { es: 'salento-valle-del-cocora-en-un-dia', en: 'salento-cocora-valley-day-trip', zh: 'salento-cocora-valley-day-trip' },
  title: {
    es: 'Salento y Valle del Cocora en un día',
    en: 'Salento and Cocora Valley in one day',
    zh: '萨伦托与可可拉山谷一日游',
  },
  metaTitle: {
    es: 'Salento y Valle del Cocora en un día: ruta y paradas',
    en: 'Salento and Cocora Valley Day Trip: Itinerary & Stops',
    zh: '萨伦托与可可拉山谷一日游｜路线、交通与观景',
  },
  metaDescription: {
    es: 'Combina las palmas de cera del Valle del Cocora con la Plaza de Bolívar, la Calle Real y el mirador Alto de la Cruz en Salento.',
    en: 'Plan a morning among Cocora Valley’s wax palms and an afternoon on Salento’s Calle Real, from Plaza de Bolívar to Alto de la Cruz.',
    zh: '上午看可可拉山谷蜡棕榈，下午从萨伦托玻利瓦尔广场走到皇家街和十字山观景台，并为返程留出时间。',
  },
  lead: {
    es: 'Dedica la mañana a las palmas de cera y reserva la tarde para caminar por Salento. Con una visita corta al valle tendrás tiempo para almorzar en el pueblo y subir al Alto de la Cruz.',
    en: 'Spend the morning among the wax palms, then return to Salento for lunch and a walk from the main square to Alto de la Cruz. A short valley walk leaves time to enjoy the town at your own pace.',
    zh: '上午到山谷看蜡棕榈，午餐后从萨伦托镇中心走到十字山观景台。山谷选短程步道，就能在同一天从容游览小镇。',
  },
  verifiedLabel: { es: 'Referencia: ProColombia', en: 'Reference: ProColombia', zh: '参考资料：哥伦比亚国家旅游推广机构' },
  source: {
    name: { es: 'Colombia Travel: Salento', en: 'Colombia Travel: Salento', zh: '哥伦比亚旅游网：萨伦托' },
    url: 'https://colombia.travel/es/salento',
  },
  mapStops: [
    {
      name: { es: 'Plaza de Bolívar de Salento', en: 'Salento’s Plaza de Bolívar', zh: '萨伦托玻利瓦尔广场' },
      query: 'Plaza de Bolívar, Salento, Quindío, Colombia',
    },
    {
      name: { es: 'Valle del Cocora', en: 'Cocora Valley', zh: '可可拉山谷' },
      query: 'Valle del Cocora, Salento, Quindío, Colombia',
    },
    {
      name: { es: 'Calle Real', en: 'Calle Real', zh: '皇家街' },
      query: 'Calle Real, Carrera 6, Salento, Quindío, Colombia',
    },
    {
      name: { es: 'Mirador Alto de la Cruz', en: 'Alto de la Cruz viewpoint', zh: '十字山观景台' },
      query: 'Mirador Alto de la Cruz, Salento, Quindío, Colombia',
    },
  ],
  sections: {
    es: [
      { heading: '1. Sal de la Plaza de Bolívar', paragraphs: ['Toma un Jeep Willys hacia Cocora desde el parque principal de Salento. Antes de salir pregunta en el punto de despacho dónde se toma el regreso y a qué hora sale el último vehículo del día.'] },
      { heading: '2. Camina entre las palmas de cera', paragraphs: ['Si también quieres recorrer el pueblo, elige un paseo de ida y vuelta por la zona de las palmas. Pregunta en el acceso qué tramo está abierto y qué cobra cada predio que quieras visitar. Deja el circuito largo para una jornada centrada en el senderismo.'] },
      { heading: '3. Almuerza en el pueblo y recorre la Calle Real', paragraphs: ['Vuelve al parque principal para almorzar. Desde la plaza, sube por la carrera sexta, conocida como Calle Real, y fíjate en los balcones, las fachadas pintadas y los talleres de artesanía.'] },
      { heading: '4. Sube al Alto de la Cruz', paragraphs: ['La Calle Real conduce hacia la escalinata del mirador. Desde arriba se ve el pueblo y, con buena visibilidad, el paisaje hacia Cocora. Si llueve o prefieres evitar las escaleras, termina el paseo en la Calle Real.'] },
    ],
    en: [
      { heading: '1. Start at Plaza de Bolívar', paragraphs: ['Catch a Willys jeep to Cocora from Salento’s main square. Ask the dispatcher where to board for the return and when the last jeep is expected to leave that day.'] },
      { heading: '2. Walk among the wax palms', paragraphs: ['Choose a short out-and-back walk through the palms if you want the afternoon for Salento. At the entrance, check which sections are open and what each property you intend to visit charges. Save the full loop for a day focused on hiking.'] },
      { heading: '3. Return for lunch and walk Calle Real', paragraphs: ['Have lunch near the main square, then follow Carrera 6 uphill. This street, known as Calle Real, is a good place to look for painted facades, balconies and craft shops.'] },
      { heading: '4. Climb to Alto de la Cruz', paragraphs: ['At the upper end of Calle Real, take the stairs to the viewpoint. Look back over Salento and towards Cocora when visibility is good. In wet weather, or if stairs are a concern, finish the walk on Calle Real.'] },
    ],
    zh: [
      { heading: '1. 从玻利瓦尔广场出发', paragraphs: ['从萨伦托镇中心广场搭乘威利斯吉普车前往山谷。上车前问清回程乘车点和当天末班车时间。'] },
      { heading: '2. 在蜡棕榈林走一段短程步道', paragraphs: ['如果下午还想逛镇中心，可在蜡棕榈林选一段步道原路折返。到入口先确认当天开放的路段和各地块的收费。想走完整环线，可以另留一天专程徒步。'] },
      { heading: '3. 回镇午餐，沿皇家街散步', paragraphs: ['回到广场附近午餐，再沿第六街上坡。这段路也叫皇家街，沿途可以看彩绘立面、阳台和手工艺店。'] },
      { heading: '4. 登上十字山观景台', paragraphs: ['皇家街上端有通往观景台的台阶。到顶可俯瞰小镇，能见度好时还可望向可可拉山谷。遇雨或不便走台阶，在皇家街结束散步即可。'] },
    ],
  },
  faq: {
    es: [
      { q: '¿Se puede visitar Salento y Cocora el mismo día?', a: 'Sí. Haz un paseo corto en el valle por la mañana y deja la tarde para la plaza, la Calle Real y el mirador.' },
      { q: '¿Dónde conviene alojarse para seguir esta ruta?', a: 'El centro de Salento permite llegar a pie a la plaza de salida y regresar caminando después del paseo por el pueblo.' },
      { q: '¿Qué parte puedo acortar si el regreso del valle se retrasa?', a: 'Mantenga el retorno al parque principal en el Willys confirmado. Al llegar, recorra la Calle Real hasta el pie de la escalinata y deje el Alto de la Cruz para otra mañana si ya falta luz.' },
    ],
    en: [
      { q: 'Can I visit Salento and Cocora Valley on the same day?', a: 'Yes. Take a short valley walk in the morning and reserve the afternoon for the square, Calle Real and the viewpoint.' },
      { q: 'Where should I stay for this itinerary?', a: 'Central Salento puts you within walking distance of the jeep departure point and the town’s afternoon stops.' },
      { q: 'Which part can I shorten if the valley return runs late?', a: 'Keep the confirmed Willys return to the main square. Once back, walk Calle Real to the foot of the steps and leave Alto de la Cruz for another morning if daylight is running short.' },
    ],
    zh: [
      { q: '一天可以游览萨伦托和可可拉山谷吗？', a: '可以。上午在山谷走短程路线，下午安排广场、皇家街和观景台。' },
      { q: '按这条路线游览，住在哪里方便？', a: '住在萨伦托镇中心，可步行到广场搭车，下午逛完小镇也方便走回住处。' },
      { q: '如果从山谷回镇的时间较晚，应该缩短哪一段？', a: '优先搭上已经确认的威利斯吉普车回主广场。回镇后只沿皇家街走到阶梯底部；若已接近天黑，就把登十字山观景台留给另一天早晨。' },
    ],
  },
};
