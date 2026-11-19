import type { TopicKey } from './topics';

type Text = [es: string, en: string, zh: string];
type Steps = [Text, Text, Text];

interface Visit {
  type: Text;
  area: Text;
  hours: Text;
  admission: Text;
  advice: Text;
  highlights: Text;
  steps: Steps;
  notice: Text;
  photo: Text;
  stay: Text;
  hoursSource?: string;
  ticketSource?: string;
}

const salento: Text = ['Salento, Quindío', 'Salento, Quindío', '金迪奥省萨伦托'];
const filandia: Text = ['Filandia, Quindío', 'Filandia, Quindío', '金迪奥省菲兰迪亚'];
const armenia: Text = ['Armenia, Quindío', 'Armenia, Quindío', '金迪奥省亚美尼亚市'];
const salentoStay: Text = ['Duerme cerca del Parque Principal si vas a tomar un Willys hacia Cocora al día siguiente.', 'Stay near the main square if you plan to catch a Willys jeep to Cocora the next day.', '次日要搭威利斯吉普车去山谷，可住萨伦托主广场附近。'];
const filandiaStay: Text = ['El centro de Filandia te deja cerca de la plaza y la salida hacia Quimbaya.', 'Central Filandia puts you near the square and the road toward Quimbaya.', '想兼顾广场与通往金巴亚的出镇路线，可住菲兰迪亚镇中心。'];
const northStay: Text = ['Alojarte al norte de Armenia facilita combinar el museo y el Parque de la Vida.', 'Stay in northern Armenia to pair the museum with Parque de la Vida.', '计划同一天游博物馆与生命公园，可住亚美尼亚市北部。'];
const publicAdmission: Text = ['Acceso libre al espacio público.', 'Free access to the public space.', '公共空间免费进入。'];
const publicHours: Text = ['Espacio público; consulta los desvíos y cierres temporales en el lugar.', 'Public space. Check for temporary closures or detours on site.', '公共空间，临时封闭和绕行安排以现场为准。'];
const churchHours: Text = ['La visita interior depende del horario parroquial y de las celebraciones.', 'Interior access follows the parish schedule and worship services.', '入内时段以堂区开放及礼拜安排为准。'];
const churchAdmission: Text = ['El exterior se observa desde la plaza sin pagar. Consulta a la parroquia para visitas especiales.', 'The exterior is free to view from the square. Ask the parish about special visits.', '从广场观看外观免费，特殊参观安排请向堂区查询。'];
const churches: Text = ['Templo católico', 'Catholic church', '天主教堂'];

export const nearbyVisits: Partial<Record<TopicKey, Visit>> = {
  'salento-plaza': {
    type: ['Plaza cívica', 'Civic square', '市镇广场'], area: salento, hours: publicHours, admission: publicAdmission,
    advice: ['Si llegas para tomar un Willys, ubica primero el despacho y pasea mientras esperas.', 'If you are catching a Willys jeep, find the departure point before walking around.', '赶着搭威利斯吉普车时先找乘车点，再利用候车时间逛广场。'],
    highlights: ['Jardines, monumento a Simón Bolívar y un borde cívico formado por la Alcaldía y el templo del Carmen.', 'Gardens, the Simón Bolívar monument and a civic frontage formed by the town hall and El Carmen church.', '花园和玻利瓦尔纪念像位于广场中央，镇政府和卡门圣母教堂围合出市镇公共空间。'],
    steps: [['Entra por el borde de la plaza.', 'Enter at the edge of the square.', '从广场边缘进入。'], ['Rodea los jardines y detente ante el monumento.', 'Loop around the gardens and stop at the monument.', '绕过花园，在纪念像前停留。'], ['Cruza hacia la iglesia o toma la carrera sexta.', 'Cross toward the church or continue along Carrera 6.', '走向教堂，或接第六街继续前往皇家街。']],
    notice: ['Mantén libre la zona de carga de los jeeps.', 'Keep the jeep loading area clear.', '不要在吉普车上客区停留拍照。'],
    photo: ['Desde el borde de los jardines, encuadra la torre de la iglesia con parte de la plaza.', 'Frame the church tower with part of the square from the garden edge.', '从花园边缘拍教堂塔和广场，交代二者的位置关系。'], stay: salentoStay,
  },
  'salento-alto': {
    type: ['Mirador urbano', 'Town viewpoint', '市镇观景台'], area: salento,
    hours: ['El directorio local recomienda el acceso diurno; consulta el estado de la escalinata.', 'The local directory lists daytime access. Check the state of the stairs.', '当地旅游目录列为白天开放，出发前留意阶梯入口情况。'],
    admission: ['El directorio local indica acceso gratuito.', 'The local visitor directory lists free access.', '当地旅游目录列为免费开放。'],
    hoursSource: 'https://www.salentoalamano.com/paginas-pautantes/mirador-alto-de-la-cruz/',
    advice: ['Prioriza un rato despejado y deja tiempo para bajar por las mismas escaleras.', 'Choose a clear spell and leave time to descend the same steps.', '挑视野清楚的时段，并为原路下台阶留时间。'],
    highlights: ['Desde la ladera se distingue el trazado de la Calle Real entre los tejados.', 'From the hillside you can trace Calle Real through the rooftops.', '从山坡可以沿连片屋顶辨认皇家街的走向。'],
    steps: [['Sal de la plaza por la carrera sexta.', 'Leave the square along Carrera 6.', '从广场走第六街。'], ['Localiza la escalinata al final de la Calle Real.', 'Find the stairway at the end of Calle Real.', '在皇家街上端找阶梯入口。'], ['Mira primero hacia el pueblo y vuelve por la escalera.', 'Look toward town first, then return by the steps.', '先俯看镇区，再沿台阶返回。']],
    notice: ['Si los peldaños están mojados, acorta la visita en la Calle Real.', 'If the steps are wet, finish your walk on Calle Real.', '台阶湿滑时可在皇家街结束散步。'],
    photo: ['Usa los tejados como primer plano y la ladera como fondo.', 'Use the rooftops as the foreground and the hillside as the backdrop.', '用屋顶群作前景，山坡作背景。'], stay: salentoStay,
  },
  'quindio-calle-real': {
    type: ['Calle patrimonial', 'Historic street', '历史街道'], area: salento, hours: publicHours, admission: publicAdmission,
    advice: ['Sube sin prisa entre la plaza y la escalinata. Deja las compras para el regreso si quieres subir al mirador.', 'Take your time between the square and the stairs. Save shopping for the return if you are climbing to the viewpoint.', '从广场慢慢上坡。若还要登观景台，可以下山时再逛店。'],
    highlights: ['Carpintería pintada, balcones y comercios de artesanía a lo largo de la carrera sexta.', 'Painted woodwork, balconies and craft shops along Carrera 6.', '第六街沿线有彩绘木作、阳台和手工艺店。'],
    steps: [['Entra desde el Parque Principal.', 'Start at the main square.', '从主广场进入。'], ['Camina por la carrera sexta y observa los balcones.', 'Follow Carrera 6 and look at the balconies.', '沿第六街看两侧阳台。'], ['Da la vuelta al pie de la escalera o sube al Alto de la Cruz.', 'Turn back at the stairs or climb to Alto de la Cruz.', '在阶梯底部折返，或继续登十字山。']],
    notice: ['La subida es gradual pero hay tramos más inclinados y accesos a negocios.', 'The street climbs gradually, with steeper stretches and storefront entrances.', '街道整体向上，部分路段较陡，停留时避开店铺入口。'],
    photo: ['Elige una esquina cuesta arriba para mostrar la profundidad de la calle.', 'Use an uphill corner to frame the depth of the street.', '在上坡街角取景，拍出街道纵深。'], stay: salentoStay,
  },
  'quindio-carmen-salento': {
    type: churches, area: salento, hours: churchHours, admission: churchAdmission,
    advice: ['Combina el exterior con el paseo por la plaza. Deja el interior para un momento sin celebraciones.', 'Pair the exterior with a walk around the square. Plan an interior visit around worship.', '可与主广场一起看外观，想入内则避开礼拜时段。'],
    highlights: ['La torre y el frente del templo son referencias para leer la disposición de la plaza.', 'The tower and front of the church help orient you around the square.', '塔身和正立面是辨认广场格局的参照。'],
    steps: [['Empieza en el centro del Parque Principal.', 'Start in the middle of the main square.', '从主广场中央开始。'], ['Acércate a la fachada sin bloquear el atrio.', 'Approach the façade without blocking the forecourt.', '走近正立面，留出前庭通道。'], ['Regresa por el jardín hacia la Calle Real.', 'Return through the garden toward Calle Real.', '穿过花园前往皇家街。']],
    notice: ['Evita el flash, las conversaciones altas y el tránsito por el templo durante la misa.', 'Avoid flash, loud conversation and walking around inside during Mass.', '弥撒期间避免闪光灯、高声交谈和在堂内走动。'],
    photo: ['Desde el lado opuesto de la plaza cabe la torre completa.', 'The opposite side of the square frames the whole tower.', '从广场对侧可拍入完整塔身。'], stay: salentoStay,
  },
  'quindio-inmaculada-filandia': {
    type: churches, area: filandia, hours: churchHours, admission: churchAdmission,
    advice: ['Incluye la iglesia en una caminata por el centro de Filandia y deja el mirador para otro tramo.', 'Include the church in your walk through central Filandia and treat the viewpoint as a separate stop.', '把教堂排进菲兰迪亚镇中心步行路线，再另行前往观景塔。'],
    highlights: ['La altura de la torre contrasta con las hileras de casas bajas de balcones pintados.', 'The tower rises above rows of low houses with painted balconies.', '塔身与周围带彩色阳台的低层镇屋形成高度对比。'],
    steps: [['Entra en Parque Bolívar.', 'Enter Parque Bolívar.', '进入菲兰迪亚玻利瓦尔广场。'], ['Rodea el jardín para ver el templo de frente y en diagonal.', 'Circle the garden to see the church head-on and diagonally.', '绕过花园，分别从正面和斜角看教堂。'], ['Sigue por las calles del casco histórico.', 'Continue through the streets of the historic center.', '接着沿历史镇区街道散步。']],
    notice: ['Mantén despejadas las puertas si hay actos parroquiales.', 'Keep the doors clear during parish events.', '有堂区活动时保持出入口通畅。'],
    photo: ['Desde una esquina de Parque Bolívar, incluye torre y balcones.', 'Include the tower and surrounding balconies from a corner of Parque Bolívar.', '从广场一角同框拍摄塔身与周边阳台。'], stay: filandiaStay,
  },
  'quindio-colina-iluminada': {
    type: ['Torre panorámica', 'Panoramic tower', '全景观景塔'], area: filandia,
    hours: ['Consulta con la Alcaldía de Filandia el horario de la torre y los cierres por mantenimiento.', 'Check tower hours and maintenance closures with Filandia’s municipality.', '塔楼营业时间和维修关闭安排可向菲兰迪亚镇政府查询。'],
    admission: ['Pregunta en la taquilla por el precio vigente antes de subir.', 'Ask at the ticket desk for the current price before climbing.', '登塔前向现场售票处查询当期票价。'],
    advice: ['Si el cerro está cubierto de nubes, recorre primero el casco urbano.', 'If the hill is clouded in, explore the town center first.', '山丘被云雾遮住时，先逛菲兰迪亚镇中心。'],
    highlights: ['La estructura sobre el Cerro del Mico ofrece balcones con vistas a distintas laderas.', 'The Cerro del Mico tower has decks with views across different slopes.', '塞罗德尔米科山丘上的塔楼可从不同观景平台望向各侧山坡。'],
    steps: [['Llega por la salida hacia Quimbaya.', 'Approach on the road toward Quimbaya.', '沿往金巴亚方向的出镇路到入口。'], ['Consulta en taquilla y sube por el acceso abierto.', 'Check in at the ticket desk and use the open access route.', '先到售票处，再沿开放通道上塔。'], ['Recorre los balcones y vuelve por el acceso señalizado.', 'Walk around the decks and return via the marked exit.', '环走观景平台，再按出口标示返回。']],
    notice: ['Respeta las indicaciones en escaleras y balcones, especialmente con viento o lluvia.', 'Follow posted directions on stairs and decks, especially in wind or rain.', '起风或下雨时，尤其要留意楼梯和平台告示。'],
    photo: ['Abajo, muestra la torre sobre la ladera; arriba, usa el horizonte para orientar la panorámica.', 'Below, frame the tower against its hillside. Above, use the horizon to orient the panorama.', '塔下拍塔与山坡的关系，塔上用地平线组织全景。'], stay: filandiaStay,
  },
  'quindio-museo-oro-quimbaya': {
    type: ['Museo arqueológico', 'Archaeology museum', '考古博物馆'], area: armenia,
    hours: ['Lunes a sábado 10:00–18:00; cierra domingos y festivos.', 'Monday–Saturday 10:00–18:00. Closed Sundays and public holidays.', '周一至周六 10:00–18:00，周日及公共假日闭馆。'],
    admission: ['Entrada general gratuita según la guía de Armenia.', 'General admission is free according to Armenia’s visitor guide.', '亚美尼亚市旅游指南列为免费入场。'],
    hoursSource: 'https://www.banrep.gov.co/es/sucursales/armenia-cultural',
    ticketSource: 'https://armenia.gov.co/wp-content/uploads/2025/ECONOMICO_2025/Rutas_y_Recorridos_de_Armenia_.pdf',
    advice: ['Deja tiempo también para el edificio: los patios ayudan a entender el recorrido de Salmona.', 'Leave time for the building too. The courtyards help explain how Salmona laid out the visitor route.', '给建筑本身留出时间。顺着庭院走，可看出萨尔莫纳如何组织参观动线。'],
    highlights: ['Orfebrería arqueológica, patios de ladrillo y jardín arqueobotánico.', 'Archaeological goldwork, brick courtyards and an archaeobotanical garden.', '考古金器、砖砌庭院和考古植物园。'],
    steps: [['Ubica el ingreso al centro cultural.', 'Find the cultural center entrance.', '找到文化中心入口。'], ['Recorre las salas abiertas del museo.', 'Visit the open museum galleries.', '参观当天开放的展厅。'], ['Al salir, detente en los patios y el jardín si está abierto.', 'On the way out, pause in the courtyards and garden if open.', '离开时在庭院停留，植物园开放的话也可顺道参观。']],
    notice: ['Pregunta por las normas de fotografía y por el horario de las visitas guiadas.', 'Ask about photography rules and guided tour times.', '留意展厅摄影规则，想参加导览可先询问时段。'],
    photo: ['Encuadra desde el exterior los cambios de nivel y las líneas del ladrillo.', 'From outside, frame the changes in level and the lines of the brickwork.', '从室外拍砖墙线条与地面高差。'], stay: northStay,
  },
  'quindio-jardin-botanico-quindio': {
    type: ['Jardín botánico y mariposario', 'Botanical garden and butterfly house', '植物园与蝴蝶馆'], area: ['Calarcá, Quindío', 'Calarcá, Quindío', '金迪奥省卡拉尔卡'],
    hours: ['Todos los días 09:00–15:30 según el jardín.', 'Daily 09:00–15:30, according to the garden.', '园方公布每天 09:00–15:30 开放。'],
    admission: ['Entrada de pago. El jardín ofrece compra en taquilla y anticipada.', 'Paid admission. The garden offers tickets at the gate and in advance.', '需购票，园方提供现场及预购选项。'],
    hoursSource: 'https://jardinbotanicoquindio.org/preguntas-frecuentes/',
    ticketSource: 'https://jardinbotanicoquindio.org/producto/entrada-compras-anticipadas/',
    advice: ['Planea llegar con margen para seguir la ruta que indique el jardín.', 'Arrive with enough time to follow the route suggested by the garden.', '预留足够时间，按园方当天建议的路线走。'],
    highlights: ['Bosque, colecciones de plantas y un recinto para observar mariposas.', 'Forest, plant collections and an enclosure for observing butterflies.', '林地、植物收藏以及可观察蝴蝶的馆区。'],
    steps: [['Llega a la entrada del km 3 y pasa por taquilla.', 'Arrive at the kilometer 3 entrance and check in at the desk.', '到 3 公里处入口，在售票处办理入园。'], ['Sigue el recorrido indicado entre bosque y colecciones.', 'Follow the designated route through the forest and collections.', '沿指定路线看林地和植物收藏。'], ['Reserva tiempo en el mariposario antes de salir.', 'Leave time for the butterfly house before exiting.', '离开前留时间在蝴蝶馆观察。']],
    notice: ['Permanece en los senderos y evita tocar las plantas y mariposas.', 'Stay on the paths and avoid touching plants or butterflies.', '沿步道行走，避免触碰植物与蝴蝶。'],
    photo: ['Busca una mariposa posada y compón desde el sendero sin acercarte de golpe.', 'Look for a resting butterfly and compose from the path without sudden movement.', '找停在花叶上的蝴蝶，从步道取景，避免突然靠近。'],
    stay: ['Calarcá acorta el traslado al jardín; Armenia funciona como base para combinar más visitas.', 'Calarcá shortens the trip to the garden. Armenia is a useful base for several stops.', '想缩短到植物园的车程可住卡拉尔卡，想兼顾多处景点可住亚美尼亚市。'],
  },
  'quindio-parque-del-cafe': {
    type: ['Parque temático', 'Theme park', '主题公园'], area: ['Montenegro, Quindío', 'Montenegro, Quindío', '金迪奥省蒙特内格罗'],
    hours: ['El horario cambia según el calendario del parque. Confirma tu fecha antes de salir.', 'Hours vary by the park calendar. Check your date before traveling.', '开放日与时段按园方日历安排，出发前按日期确认。'],
    admission: ['Entrada de pago. Compara los pasaportes por estatura, edad y actividades incluidas.', 'Paid admission. Compare passes by height, age and included activities.', '需购票。按身高、年龄及包含项目比较票种。'],
    hoursSource: 'https://parquedelcafe.co/',
    ticketSource: 'https://parquedelcafe.co/pasaportes-y-tarifas/',
    advice: ['Elige un espectáculo o ruta del café antes de distribuir el resto del día.', 'Pick a show or a coffee route before planning the rest of the day.', '先选定一场表演或一段咖啡路线，再排其余项目。'],
    highlights: ['Las zonas de cultivo y exhibición conviven con espectáculos y atracciones mecánicas.', 'Coffee planting and exhibition areas sit alongside shows and rides.', '种植展示与表演、机械游乐设施安排在同一园区。'],
    steps: [['Entra por el acceso oficial de la vía a Pueblo Tapao.', 'Enter at the official gate on the road to Pueblo Tapao.', '从往普韦布洛塔保公路的正式入口进园。'], ['Revisa el mapa del parque y ve hacia tu primer espectáculo o sendero.', 'Check the park map and head to your first show or path.', '先看园区地图，再前往第一场表演或第一段步道。'], ['Agrupa las atracciones cercanas y vuelve a la salida con margen.', 'Group neighboring attractions and leave time to return to the gate.', '就近串联游玩，留时间回到出口。']],
    notice: ['Revisa las restricciones de cada atracción antes de hacer fila.', 'Check each ride’s restrictions before joining the line.', '排队前核对设施的身高、年龄及其他乘坐条件。'],
    photo: ['Desde un sendero señalizado, busca un encuadre con hileras de café y la ladera.', 'From a marked path, frame rows of coffee plants against the slope.', '在标示步道上把咖啡树行列和山坡拍进同一画面。'],
    stay: ['Montenegro o Pueblo Tapao quedan cerca del acceso; Armenia facilita combinar otros destinos.', 'Montenegro and Pueblo Tapao are near the entrance. Armenia works for a broader itinerary.', '蒙特内格罗和普韦布洛塔保靠近入口，若要串联多处景点可住亚美尼亚市。'],
  },
  'quindio-parque-de-la-vida': {
    type: ['Parque urbano', 'Urban park', '城市公园'], area: armenia,
    hours: ['Todos los días 07:00–18:00 según el operador.', 'Daily 07:00–18:00, according to the operator.', '运营方公布每天 07:00–18:00 开放。'],
    admission: ['El operador publica COP 5.000 de entrada general desde los 3 años. Consulta la tarifa vigente.', 'The operator lists general admission at COP 5,000 from age three. Check the current rate.', '运营方公布普通门票为 5,000 哥伦比亚比索，适用于 3 岁起的访客。以当期票价为准。'],
    hoursSource: 'https://www.smparmenia.com/parque', ticketSource: 'https://www.smparmenia.com/parque',
    advice: ['Combina un paseo por el parque con el museo si visitas el norte de Armenia.', 'Pair a walk here with the museum if you are visiting northern Armenia.', '已经到亚美尼亚市北部时，可把公园与黄金博物馆排在同一天。'],
    highlights: ['Agua, vegetación y senderos en el parque donado para el centenario de Armenia.', 'Water, greenery and paths in a park donated for Armenia’s centenary.', '为亚美尼亚建城百年捐建的公园，以水景、林地和步道为主。'],
    steps: [['Entra desde la avenida y consulta qué senderos están habilitados.', 'Enter from the avenue and check which paths are open.', '从大道入口入园，确认开放步道。'], ['Baja hacia el agua por el sendero habilitado.', 'Follow the open path down toward the water.', '沿开放步道下到水边。'], ['Regresa por el recorrido señalizado que prefieras.', 'Return along your preferred marked route.', '按体力选择一条标示路线返回。']],
    notice: ['Las superficies junto al agua pueden estar húmedas; permanece en los senderos.', 'Surfaces by the water may be wet. Stay on the paths.', '水边路面可能潮湿，沿步道通行。'],
    photo: ['Incluye los reflejos y la vegetación desde el borde del sendero.', 'Include reflections and waterside plants from the path edge.', '从步道边缘拍水面倒影与岸边植被。'], stay: northStay,
  },
  'quindio-catedral-armenia': {
    type: ['Catedral católica', 'Catholic cathedral', '天主教主教座堂'], area: armenia, hours: churchHours, admission: churchAdmission,
    advice: ['Empieza al otro lado de la plaza para apreciar la cubierta completa. Si hay misa, mantén la visita en el exterior.', 'Start across the square for a full view of the roof. During Mass, stay outside.', '先从广场对侧看完整屋顶。遇到弥撒时，留在户外参观。'],
    highlights: ['La cubierta angular y los planos inclinados distinguen el templo del resto de la plaza.', 'The angular roof and sloping planes set the building apart from its surroundings.', '折线屋顶与倾斜立面是从广场辨认这座建筑的关键。'],
    steps: [['Llega por la Plaza de Bolívar de Armenia.', 'Approach via Armenia’s Plaza de Bolívar.', '从亚美尼亚市玻利瓦尔广场抵达。'], ['Observa la cubierta desde el otro extremo de la plaza.', 'Look at the roofline from the opposite end of the square.', '在广场另一端观察屋顶轮廓。'], ['Acércate al templo respetando las celebraciones.', 'Approach the church while respecting any ongoing service.', '走近座堂，留意是否正在礼拜。']],
    notice: ['Mantén silencio en el interior y no bloquees el acceso desde la plaza.', 'Keep quiet inside and leave the entrance from the square clear.', '入内保持安静，勿阻挡广场通往座堂的入口。'],
    photo: ['Desde una diagonal de la plaza se aprecia mejor el contraste entre el techo y la torre.', 'From a diagonal across the square, capture the contrast between the roof and tower.', '从广场斜角取景，可以表现屋顶和塔身的反差。'],
    stay: ['Alojarte en el centro de Armenia facilita visitar la plaza a pie.', 'Central Armenia is convenient if you want to reach the square on foot.', '想步行游览广场和座堂，可住亚美尼亚市中心。'],
  },
};
