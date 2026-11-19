import type { Topic } from './topics';

export const salentoAttractions: Topic[] = [
  {
    key: 'salento-plaza',
    slug: { es: 'plaza-bolivar-salento', en: 'salento-bolivar-square', zh: 'salento-bolivar-square' },
    title: { es: 'Plaza de Bolívar de Salento', en: 'Plaza de Bolívar in Salento', zh: '萨伦托玻利瓦尔广场' },
    metaTitle: { es: 'Plaza de Bolívar de Salento: parque principal y jeeps', en: 'Salento’s Plaza de Bolívar: Main Square & Jeeps', zh: '萨伦托玻利瓦尔广场｜镇中心与山谷吉普车' },
    metaDescription: { es: 'Visita el parque principal de Salento, descubre la iglesia del Carmen y ubica la salida de los jeeps hacia Cocora.', en: 'Explore Salento’s main square, find the church of El Carmen and locate the Willys jeep departure point for Cocora Valley.', zh: '游览萨伦托镇中心广场，看看卡门圣母教堂，并找到前往可可拉山谷的威利斯吉普车。' },
    lead: { es: 'El parque principal de Salento reúne la iglesia del Carmen, la Alcaldía y el punto de partida de los jeeps hacia Cocora.', en: 'Salento’s main square brings together the church of El Carmen, the town hall and the departure point for jeeps to Cocora.', zh: '卡门圣母教堂、萨伦托镇政府和前往可可拉山谷的吉普车乘车点，都在这座镇中心广场附近。' },
    verifiedLabel: { es: 'Turismo de Colombia', en: 'Colombia tourism guide', zh: '哥伦比亚旅游指南' },
    source: { name: { es: 'ProColombia: Salento', en: 'ProColombia: Salento', zh: '哥伦比亚国家旅游推广机构：萨伦托' }, url: 'https://colombia.travel/es/salento' },
    place: {
      address: 'Parque Principal, Calle 5 con Carrera 6, Salento, Quindío, Colombia',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+Bol%C3%ADvar+Salento+Quind%C3%ADo',
      photo: { file: '/gallery/salento/plaza-bolivar.jpg', source: 'https://commons.wikimedia.org/wiki/File:Plaza_de_Bol%C3%ADvar,_Salento_01.jpg', author: 'Bernard Gagnon' },
      managementSource: 'https://cronicadelquindio.com/quindio/parque-principal-de-salento-a-trabajos-de-recuperacion-por-tres-meses/',
      management: { es: 'La administración municipal de Salento dirige las intervenciones del parque principal.', en: 'Salento’s municipal administration oversees improvements to the main square.', zh: '萨伦托市镇政府负责广场的公共空间整修。' },
      transport: { es: 'Desde el centro, llega a pie al Parque Principal. Para continuar al valle toma el Willys en la plaza y pregunta allí por el regreso.', en: 'Walk to Parque Principal from central Salento. To continue to the valley, take a Willys jeep from the square and ask about return departures.', zh: '从萨伦托镇中心步行到主广场。继续去山谷时可在广场搭乘威利斯吉普车，并在上车前询问返程时间。' },
    },
    sections: {
      es: [{ heading: 'El corazón cívico de Salento', paragraphs: ['Busca el monumento a Simón Bolívar entre los jardines. En el perímetro se encuentran la Alcaldía y la iglesia de Nuestra Señora del Carmen, cuya fachada se puede observar desde la plaza.'] }, { heading: 'Cómo recorrer la plaza', paragraphs: ['Da una vuelta por los jardines y sal por la carrera sexta para seguir por la Calle Real. Si tienes poco tiempo antes del jeep, quédate en la plaza y recorre la calle al volver del valle.'] }],
      en: [{ heading: 'Salento’s civic center', paragraphs: ['Look for the monument to Simón Bolívar among the gardens. The town hall and church of Nuestra Señora del Carmen stand around the square, where you can see the church façade.'] }, { heading: 'How to explore the square', paragraphs: ['Walk around the gardens, then leave on Carrera 6 for Calle Real. If your jeep is due soon, stay around the square and save Calle Real for the return from the valley.'] }],
      zh: [{ heading: '萨伦托的市镇中心', paragraphs: ['花园之间立着西蒙·玻利瓦尔纪念像。镇政府和卡门圣母教堂围绕广场而建，可从广场观察教堂立面。'] }, { heading: '广场怎么逛', paragraphs: ['沿花园绕行一圈，再从第六街走上皇家街。若吉普车即将出发，可以先在广场附近逛，等从山谷回来再走皇家街。'] }],
    },
    faq: {
      es: [{ q: '¿La Calle Real empieza cerca de la plaza?', a: 'Sí. Sale de una esquina del parque principal por la carrera sexta.' }],
      en: [{ q: 'Does Calle Real start near the square?', a: 'Yes. It begins at a corner of the main square on Carrera 6.' }],
      zh: [{ q: '皇家街从广场附近开始吗？', a: '是的。从主广场一角沿第六街步行，就能走上皇家街。' }],
    },
  },
  {
    key: 'salento-alto',
    slug: { es: 'mirador-alto-de-la-cruz', en: 'alto-de-la-cruz-viewpoint', zh: 'alto-de-la-cruz-viewpoint' },
    title: { es: 'Mirador Alto de la Cruz', en: 'Alto de la Cruz Viewpoint', zh: '十字山观景台' },
    metaTitle: { es: 'Mirador Alto de la Cruz: subida desde Salento', en: 'Alto de la Cruz Viewpoint: Walk from Salento', zh: '十字山观景台｜从萨伦托皇家街步行登顶' },
    metaDescription: { es: 'Sube por la Calle Real al Alto de la Cruz para ver los tejados de Salento y ubicar el paisaje hacia Cocora.', en: 'Follow Calle Real and its stairway to Alto de la Cruz for views over Salento’s rooftops and the hills toward Cocora.', zh: '从萨伦托皇家街走上十字山观景台，俯看镇上屋顶与通往可可拉山谷的山丘。' },
    lead: { es: 'Desde el extremo alto de la Calle Real, una escalinata lleva al mirador sobre los tejados de Salento.', en: 'A stairway at the uphill end of Calle Real leads to a viewpoint overlooking the rooftops of Salento.', zh: '从皇家街上端沿阶梯登顶，可以俯瞰萨伦托镇区的连片屋顶。' },
    verifiedLabel: { es: 'Turismo del Quindío', en: 'Quindío visitor information', zh: '金迪奥旅游资料' },
    source: { name: { es: 'Casa Delegada del Quindío: Salento', en: 'Quindío cultural office: Salento', zh: '金迪奥文化部门：萨伦托' }, url: 'https://cultura.quindio.gov.co/salento' },
    place: {
      address: 'Cl. 1 #5-89, Salento, Quindío, Colombia',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mirador+Alto+de+la+Cruz+Salento+Quind%C3%ADo',
      photo: { file: '/gallery/salento/alto-de-la-cruz.jpg', source: 'https://commons.wikimedia.org/wiki/File:View_of_Salento,_Colombia_01.jpg', author: 'Bernard Gagnon' },
      managementSource: 'https://epq.gov.co/index.php/en/servicios-al-ciudadano/boletines-publicaciones/2766-empresas-publicas-del-quindio-en-jornada-de-embellecimiento-en-salento-junto-a-la-alcaldia-y-la-comunidad.html',
      management: { es: 'La Alcaldía de Salento y Empresas Públicas del Quindío han colaborado en el cuidado de este sector. Consulta a la Alcaldía sobre el acceso durante obras.', en: 'Salento’s municipality and Empresas Públicas del Quindío have worked together to maintain this area. Check with the municipality if works affect access.', zh: '萨伦托市镇政府和金迪奥公共事业公司曾共同整修这一带。施工期间的通行情况可向镇政府查询。' },
      transport: { es: 'Camina desde la Plaza de Bolívar por la carrera sexta hasta la escalinata. El último tramo se hace a pie por peldaños.', en: 'Walk uphill from Plaza de Bolívar on Carrera 6 to the staircase. The last stretch is on foot up steps.', zh: '从玻利瓦尔广场沿第六街上坡到阶梯入口，最后一段需步行走台阶。' },
      rating: { score: '4.5', count: 661, source: 'https://www.google.cl/travel/hotels/entity/ChoIk8WTwsz6jIPXARoNL2cvMTFmNHd2NDl0bRAB', checked: '2026-11-19' },
    },
    sections: {
      es: [{ heading: 'Qué se ve desde arriba', paragraphs: ['Mira primero hacia el pueblo para reconocer el trazado de la Calle Real y los tejados. Con buena visibilidad puedes distinguir el paisaje hacia el Valle del Cocora y las montañas de Los Nevados.'] }, { heading: 'Cuándo subir y dónde hacer fotos', paragraphs: ['Elige un momento con buena visibilidad. Desde el tramo superior puedes encuadrar la calle entre fachadas y, desde el mirador, los tejados con las laderas al fondo. Si llueve, acorta el paseo antes de la escalinata.'] }],
      en: [{ heading: 'What you can see from the top', paragraphs: ['Look down over the rooftops to trace Calle Real through the town. When visibility is good, look toward Cocora Valley and the mountains of Los Nevados.'] }, { heading: 'When to climb and where to take photos', paragraphs: ['Choose a clear spell. From the upper approach, frame the street between painted façades. At the top, use the slopes as a backdrop for the rooftops. If rain sets in, shorten the walk before the stairs.'] }],
      zh: [{ heading: '登顶可以看到什么', paragraphs: ['先俯看镇上的屋顶，辨认皇家街在镇区的走向。能见度好时，再望向可可拉山谷和洛斯内瓦多斯一带的山地。'] }, { heading: '登山时机与拍摄位置', paragraphs: ['选择视野清楚的时段上山。接近阶梯上端时，可用两侧立面框住街景；登顶后，可将山坡作为屋顶群的背景。遇雨可在阶梯前结束散步。'] }],
    },
    faq: {
      es: [{ q: '¿Hay que subir escaleras?', a: 'Sí. El acceso desde la Calle Real termina en una escalinata.' }],
      en: [{ q: 'Are there stairs on the way up?', a: 'Yes. The route from Calle Real ends with a stairway.' }],
      zh: [{ q: '上观景台需要走台阶吗？', a: '需要。从皇家街上去的最后一段是阶梯。' }],
    },
  },
];
