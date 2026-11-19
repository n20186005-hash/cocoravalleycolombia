import type { Topic } from './topics';

type Trilingual = [es: string, en: string, zh: string];
const localize = ([es, en, zh]: Trilingual) => ({ es, en, zh });
const salentoSource = 'https://cultura.quindio.gov.co/salento';
const filandiaSource = 'https://cultura.quindio.gov.co/filandia';
const dioceseSource = 'https://diocesisarmenia.org/quienes-somos.html';

interface Landmark {
  key: string;
  city: string;
  name: Trilingual;
  address: string;
  photo: string;
  source: string;
  managementSource?: string;
  lead: Trilingual;
  management: Trilingual;
  history: Trilingual;
  access: Trilingual;
  transport: Trilingual;
  route: Trilingual;
  photoTip: Trilingual;
  question: Trilingual;
  answer: Trilingual;
}

const landmarks: Landmark[] = [
  {
    key: 'calle-real', city: 'Salento',
    name: ['Calle Real de Salento', 'Calle Real in Salento', '萨伦托皇家街'],
    address: 'Carrera 6, entre calles 2 y 6, Salento, Quindío, Colombia',
    photo: 'Carrera 6, Salento 01.jpg', source: salentoSource,
    lead: ['La carrera sexta conecta el parque principal con la escalinata al Alto de la Cruz.', 'Carrera 6 links the main square with the steps to Alto de la Cruz.', '皇家街是萨伦托的第六街，连接镇中心主广场和十字山阶梯。'],
    management: ['Es una calle del casco urbano de Salento. La Alcaldía es el punto de consulta para obras y circulación; cada comercio maneja su horario.', 'This street lies within urban Salento. Consult the municipality about works and traffic arrangements; shops set their own hours.', '皇家街属于萨伦托镇区街道。施工和交通安排可向镇政府查询，沿街店铺各自营业。'],
    history: ['Las casas de colores conservan rasgos de la arquitectura tradicional antioqueña. Observa los balcones, la carpintería y cómo cambia la pendiente entre cuadras.', 'The painted houses retain features of traditional Antioquian architecture. Look for balconies, woodwork and changes in the gradient from block to block.', '彩色房屋保留了安蒂奥基亚传统建筑的特征。沿街留意阳台、木作以及不同街段的坡度变化。'],
    access: ['El paseo por la calle es libre; consulta por separado el horario de tiendas y talleres.', 'Walking the street is free. Shops and workshops have their own opening hours.', '街道可免费步行，店铺和工坊的开放时间各自独立。'],
    transport: ['Desde el Parque Principal, entra por la carrera sexta y sigue cuesta arriba.', 'From the main square, enter Carrera 6 and walk uphill.', '从萨伦托主广场进入第六街，沿坡向上步行。'],
    route: ['Empieza en la plaza, detente en las cuadras de artesanías y decide al pie de la escalinata si continúas al mirador.', 'Start at the square, pause near the craft shops and decide at the stairway if you want to continue to the viewpoint.', '从广场起步，经过手工艺店街段，到阶梯底部再决定是否继续登顶。'],
    photoTip: ['Desde una esquina, encuadra dos fachadas y deja que la pendiente marque la profundidad de la calle.', 'From a corner, frame façades on both sides and use the slope to show the street’s depth.', '从街角取景，把两侧立面和坡道同时纳入画面，拍出街道的纵深。'],
    question: ['¿El paseo obliga a subir escaleras?', 'Does the street walk require stairs?', '走皇家街一定要爬楼梯吗？'],
    answer: ['Puedes recorrer la calle hasta el pie de la escalinata y volver por el mismo camino.', 'You can walk as far as the foot of the stairway and return the way you came.', '可以走到阶梯底部后原路返回。'],
  },
  {
    key: 'carmen-salento', city: 'Salento',
    name: ['Iglesia Nuestra Señora del Carmen de Salento', 'Our Lady of Mount Carmel Church, Salento', '萨伦托卡门圣母教堂'],
    address: 'Parque Principal, Salento, Quindío, Colombia',
    photo: 'Iglesia de Nuestra Señora del Carmen, Salento 01.jpg', source: 'https://colombia.travel/es/salento',
    managementSource: dioceseSource,
    lead: ['El templo parroquial domina uno de los costados del parque principal de Salento.', 'This parish church faces Salento’s main square.', '这座堂区教堂面向萨伦托主广场，是辨认镇中心格局的地标。'],
    management: ['La parroquia Nuestra Señora del Carmen organiza la actividad religiosa. Consulta allí las misas y el acceso al interior.', 'The parish of Nuestra Señora del Carmen organizes worship. Ask the parish about services and access to the interior.', '宗教活动由卡门圣母堂区安排。入内开放和弥撒时间可向堂区查询。'],
    history: ['La iglesia forma parte del núcleo cívico y religioso del pueblo. Desde los jardines se distinguen la fachada frontal y la torre; acércate para observar cómo se alinean los vanos y la entrada.', 'The church forms part of the town’s civic and religious core. From the gardens, study the façade and tower, then look closer at the arrangement of the openings and entrance.', '教堂与广场共同构成小镇的公共与宗教中心。先从花园看正立面与塔身，再近看门窗和入口的排列。'],
    access: ['La fachada se puede ver desde la plaza. Para entrar, respeta el horario parroquial y las celebraciones.', 'You can see the façade from the square. Interior visits depend on the parish schedule and services.', '从广场即可看外观。入内参观须遵守堂区开放与礼拜安排。'],
    transport: ['Camina hasta el Parque Principal de Salento; la iglesia se encuentra frente a los jardines.', 'Walk to Salento’s main square. The church faces the gardens.', '步行至萨伦托主广场，从花园一侧可直接看到教堂。'],
    route: ['Mira la fachada desde el centro de la plaza, acércate al atrio si está despejado y vuelve por los jardines hacia la Calle Real.', 'View the façade from the center of the square, approach the forecourt if clear, then cross the gardens toward Calle Real.', '从广场中心看全景，前庭通畅时走近，再沿花园转往皇家街。'],
    photoTip: ['Fotografía la fachada completa desde el lado opuesto de la plaza y deja libres los accesos.', 'Photograph the full façade from across the square and keep the entrances clear.', '从广场对面拍完整立面，拍照时给出入口留出通道。'],
    question: ['¿Puedo hacer fotos durante la misa?', 'Can I take photos during Mass?', '弥撒期间可以拍照吗？'],
    answer: ['Durante el culto, quédate en la plaza para fotografiar el exterior o consulta a la parroquia.', 'During worship, photograph the exterior from the square or ask the parish.', '礼拜期间可留在广场拍外观，入内拍摄请先询问堂区。'],
  },
  {
    key: 'inmaculada-filandia', city: 'Filandia',
    name: ['Iglesia de la Inmaculada Concepción de Filandia', 'Immaculate Conception Church, Filandia', '菲兰迪亚圣母无原罪教堂'],
    address: 'Parque Bolívar, Filandia, Quindío, Colombia',
    photo: 'Iglesia de la Inmaculada Concepción, Filandia 01.jpg', source: filandiaSource,
    managementSource: dioceseSource,
    lead: ['El templo parroquial se asoma al Parque Bolívar de Filandia, entre casas de balcones pintados.', 'The parish church overlooks Filandia’s Parque Bolívar amid houses with painted balconies.', '菲兰迪亚堂区教堂面向玻利瓦尔广场，周围是带彩色阳台的镇屋。'],
    management: ['La parroquia de la Inmaculada Concepción organiza el culto y el acceso al templo.', 'The Immaculate Conception parish organizes services and controls access to the church.', '教堂的礼拜和入内开放由圣母无原罪堂区安排。'],
    history: ['La iglesia es un referente del centro histórico de Filandia. Observa la torre desde los jardines y compara la escala de la fachada con las viviendas de balcones que bordean la plaza.', 'The church is a landmark of Filandia’s historic center. Look at its tower from the gardens and compare the scale of the façade with the balcony houses around the square.', '教堂是菲兰迪亚历史镇区的地标。从花园观察塔身，再把高大的立面与广场周边带阳台的民居作比较。'],
    access: ['El exterior se visita desde Parque Bolívar; para el interior consulta el horario parroquial.', 'See the exterior from Parque Bolívar and check with the parish before visiting inside.', '外观可从玻利瓦尔广场观看，入内前请查询堂区开放安排。'],
    transport: ['Desde Salento toma transporte por carretera hasta Filandia. Una vez en el centro, sigue a pie hasta Parque Bolívar.', 'Travel by road from Salento to Filandia, then walk to Parque Bolívar from the center.', '从萨伦托经公路到菲兰迪亚，抵达镇中心后步行至玻利瓦尔广场。'],
    route: ['Rodea la plaza para ver el templo desde dos ángulos y sigue por las calles de balcones hacia el centro de Filandia.', 'Circle the square to see two angles of the church, then explore the balcony-lined streets around the center.', '绕广场一圈，从两个角度看教堂，再沿带阳台的街道继续逛镇中心。'],
    photoTip: ['Usa una esquina del parque para incluir la torre y la hilera de casas sin bloquear el atrio.', 'From a corner, include the tower and a row of houses while keeping the forecourt clear.', '从广场一角取景，把塔身和一排镇屋一起拍入，同时避开前庭通道。'],
    question: ['¿La iglesia queda junto al mirador?', 'Is the church next to the tower viewpoint?', '教堂就在观景塔旁边吗？'],
    answer: ['La iglesia está en el parque central. El Mirador Colina Iluminada queda en la salida hacia Quimbaya.', 'The church is on the central square. Colina Iluminada is on the road out toward Quimbaya.', '教堂在镇中心广场，光明山观景塔位于往金巴亚方向的出镇道路。'],
  },
  {
    key: 'colina-iluminada', city: 'Filandia',
    name: ['Mirador Colina Iluminada', 'Colina Iluminada Viewpoint', '菲兰迪亚光明山观景塔'],
    address: 'Vía Filandia–Quimbaya, sector Cerro del Mico, Filandia, Quindío, Colombia',
    photo: 'Mirador-0142.jpg', source: filandiaSource,
    managementSource: 'https://filandia-quindio.bancodeproyectos.co/proyectos_detalle/55',
    lead: ['La torre en el Cerro del Mico permite orientarse sobre los valles y poblaciones que rodean Filandia.', 'This tower on Cerro del Mico looks out across the valleys and towns around Filandia.', '观景塔立在塞罗德尔米科山丘上，可以辨认菲兰迪亚周边的山谷和城镇。'],
    management: ['La Alcaldía de Filandia mantiene el mirador por medio de proyectos municipales y contrata apoyo para su operación.', 'Filandia’s municipal government maintains the viewpoint through public projects and contracts support for its operation.', '菲兰迪亚镇政府通过市政项目维护观景塔，并安排运营支援。'],
    history: ['La estructura del Cerro del Mico se convirtió en un emblema turístico local. Los balcones elevados permiten comparar la vista hacia el casco urbano y las laderas abiertas.', 'The Cerro del Mico tower has become a local tourism landmark. Its elevated decks let you compare views toward town and across the open slopes.', '这座山丘观景塔已成为当地旅游地标。登上观景平台，可比较镇区方向与开阔山坡的景色。'],
    access: ['Consulta en la taquilla la tarifa y el último ingreso. La visibilidad cambia con la nubosidad.', 'Check the ticket desk for prices and last admission. Visibility changes with cloud cover.', '票价和最后入场时间以售票点为准，远眺范围随云雾变化。'],
    transport: ['Desde el centro de Filandia, toma la salida hacia Quimbaya y sigue la señalización del mirador.', 'From central Filandia, take the road toward Quimbaya and follow signs for the viewpoint.', '从菲兰迪亚中心走往金巴亚方向的出镇道路，跟随观景塔标识。'],
    route: ['Reconoce primero la torre desde el acceso, sube si hay buena visibilidad y recorre los balcones para cambiar de orientación.', 'Look at the tower from the entrance, climb if visibility is good and walk around the decks to change your bearing.', '先在入口观察塔身，视野良好时上塔，再绕观景平台分方向远眺。'],
    photoTip: ['Desde abajo, incluye la torre y la ladera; arriba, usa el horizonte para separar montañas y nubes.', 'From below, frame the tower with the slope. From the deck, use the horizon to separate mountains and clouds.', '塔下把塔身和山坡一起构图；塔上可用地平线区分山脉与云层。'],
    question: ['¿Conviene subir si hay niebla?', 'Is it worth climbing in fog?', '起雾时还值得登塔吗？'],
    answer: ['Si buscas panorámicas, espera a que se abra el cielo o recorre primero el centro de Filandia.', 'For panoramas, wait for a clearer spell or explore downtown Filandia first.', '想拍全景可等云雾散开，或者先游览菲兰迪亚镇中心。'],
  },
  {
    key: 'museo-oro-quimbaya', city: 'Armenia',
    name: ['Museo del Oro Quimbaya', 'Quimbaya Gold Museum', '金巴亚黄金博物馆'],
    address: 'Avenida Bolívar #40 Norte-80, Armenia, Quindío, Colombia',
    photo: 'Museo del Oro Quimbaya.jpg', source: 'https://enciclopedia.banrepcultural.org/Museo_del_Oro_Quimbaya',
    lead: ['En el norte de Armenia, la colección arqueológica ocupa un centro cultural diseñado por Rogelio Salmona.', 'An archaeological collection occupies a cultural center designed by Rogelio Salmona in northern Armenia.', '博物馆位于亚美尼亚市北部，考古藏品陈列在罗赫利奥·萨尔莫纳设计的文化中心内。'],
    management: ['El Banco de la República abrió el museo en 1986 y lo integra en su red cultural de Armenia.', 'Banco de la República opened the museum in 1986 and operates it through its cultural network in Armenia.', '哥伦比亚共和国银行于 1986 年开设博物馆，并将其纳入亚美尼亚市的文化机构网络。'],
    history: ['Además de las piezas de orfebrería, merece atención la arquitectura de ladrillo de Salmona. Observa cómo patios y recorridos exteriores organizan la llegada a las salas.', 'Alongside the goldwork, look at Salmona’s brick architecture. The courtyards and outdoor paths shape how you approach the galleries.', '除了金工藏品，也值得看萨尔莫纳的砖建筑。留意庭院和室外动线如何引导访客进入展厅。'],
    access: ['Consulta la agenda del Banco de la República para los horarios de las salas y las condiciones de las visitas guiadas.', 'Check Banco de la República’s visitor information for gallery hours and guided-tour arrangements.', '展厅时间与导览安排请以共和国银行文化机构发布的信息为准。'],
    transport: ['En Armenia, toma transporte urbano o taxi hacia la Avenida Bolívar con Avenida 19 de Enero y confirma la entrada al centro cultural.', 'In Armenia, take local transport or a taxi to Avenida Bolívar and Avenida 19 de Enero, then look for the cultural center entrance.', '在亚美尼亚市搭市区交通或计程车到玻利瓦尔大道与一月十九日大道交会处，再找文化中心入口。'],
    route: ['Empieza en el acceso de ladrillo, recorre las salas abiertas y deja tiempo para observar los patios al salir.', 'Start at the brick entrance, visit the open galleries and allow time for the courtyards on your way out.', '从砖砌入口进入，参观开放展厅，离开前留一点时间看庭院。'],
    photoTip: ['Desde el exterior busca las líneas del ladrillo y los cambios de nivel. Consulta las reglas de fotografía en las salas.', 'Outside, look for lines in the brickwork and changes in level. Check the gallery photography rules.', '在室外寻找砖墙线条和地面高差，入展厅拍摄请先查看规定。'],
    question: ['¿Vale la pena visitar el edificio además de las salas?', 'Is the building worth visiting as well as the galleries?', '展厅之外，建筑本身值得看吗？'],
    answer: ['Sí. Reserva tiempo para ver los patios y el acceso del conjunto diseñado por Salmona.', 'Yes. Set aside time for the courtyards and entrance of Salmona’s complex.', '值得。可以专门留时间看萨尔莫纳设计的庭院和入口。'],
  },
  {
    key: 'jardin-botanico-quindio', city: 'Calarcá',
    name: ['Jardín Botánico del Quindío', 'Quindío Botanical Garden', '金迪奥植物园'],
    address: 'Km 3, vía Calarcá–Valle del Cauca, Calarcá, Quindío, Colombia',
    photo: 'Mariposario de Calarcá.JPG', source: 'https://jardinbotanicoquindio.org/preguntas-frecuentes/',
    lead: ['Bosque, colecciones botánicas y un mariposario forman parte de la visita, a las afueras de Calarcá.', 'A forest, botanical collections and a butterfly house are part of the visit just outside Calarcá.', '植物园位于卡拉尔卡郊外，可沿林间步道看植物收藏和蝴蝶馆。'],
    management: ['La Fundación Jardín Botánico del Quindío gestiona el jardín y publica las condiciones de entrada.', 'The Quindío Botanical Garden Foundation runs the garden and publishes admission information.', '金迪奥植物园基金会负责园区运营，并发布入园信息。'],
    history: ['El jardín combina conservación y educación. Contrasta el ambiente del bosque con el recinto protegido del mariposario y fíjate en las etiquetas de las colecciones.', 'The garden combines conservation and education. Compare the forest with the enclosed butterfly house and read the labels in the plant collections.', '植物园兼具保育与教育功能。可对比林地和有围护的蝴蝶馆环境，并留意植物收藏的标示。'],
    access: ['El sitio del jardín indica atención diaria de 9:00 a 15:30 y compra en taquilla. Consulta el precio y los avisos antes de viajar.', 'The garden lists daily hours of 09:00–15:30 and tickets at the gate. Check prices and notices before traveling.', '园方列出的开放时间为每天 09:00–15:30，可现场购票。出发前请查看票价和临时公告。'],
    transport: ['Desde Calarcá, sigue la vía hacia el Valle del Cauca hasta el kilómetro 3 y desciende en la entrada del jardín.', 'From Calarcá, follow the road toward Valle del Cauca to kilometer 3 and get off at the garden entrance.', '从卡拉尔卡沿往考卡山谷省的公路到 3 公里处，在植物园入口下车。'],
    route: ['Pregunta en recepción por el recorrido del día, camina por el bosque y deja tiempo para observar sin prisa en el mariposario.', 'Ask reception about the day’s route, walk through the forest and leave time to linger in the butterfly house.', '入园先询问当天的游览路线，走过林地后在蝴蝶馆留足观察时间。'],
    photoTip: ['En el mariposario, prepara el encuadre antes de acercarte y evita tocar mariposas y plantas.', 'In the butterfly house, compose before moving closer and avoid touching butterflies or plants.', '在蝴蝶馆先选好构图再靠近，避免触碰蝴蝶和植物。'],
    question: ['¿Puedo comprar la entrada al llegar?', 'Can I buy a ticket on arrival?', '可以到现场买票吗？'],
    answer: ['El jardín indica que vende entradas en taquilla; revisa sus avisos para tu fecha.', 'The garden lists ticket sales at the gate. Check its notices for your visit date.', '园方说明可在售票处购票，出发前可查看当天公告。'],
  },
  {
    key: 'parque-del-cafe', city: 'Montenegro',
    name: ['Parque del Café', 'Parque del Café', '哥伦比亚咖啡公园'],
    address: 'Km 6, vía Montenegro–Pueblo Tapao, Montenegro, Quindío, Colombia',
    photo: 'Parque del Cafe Entrada.jpg', source: 'https://parquedelcafe.co/',
    managementSource: 'https://parquedelcafe.com/quienes-somos/',
    lead: ['En la zona rural de Montenegro, el parque reúne recorridos sobre café, espectáculos y atracciones mecánicas.', 'In rural Montenegro, the park combines coffee-themed walks, shows and rides.', '咖啡公园位于蒙特内格罗乡间，结合咖啡主题游览、表演和游乐设施。'],
    management: ['La Fundación Parque de la Cultura Cafetera opera el parque y publica el calendario de apertura y los pasaportes.', 'The Fundación Parque de la Cultura Cafetera operates the park and publishes its opening calendar and ticket options.', '咖啡文化公园基金会负责园区运营，并公布开放日历和票种。'],
    history: ['El parque se creó para divulgar la cultura cafetera. Compara las áreas de cultivo y exhibición con los espacios de espectáculos; ofrecen formas distintas de acercarse al paisaje cafetero.', 'The park was created to share coffee culture. Compare the planting and exhibition areas with the performance venues for different perspectives on the coffee region.', '公园设立的目标之一是传播咖啡文化。可分别逛种植展示区和表演区，从不同角度了解咖啡产区。'],
    access: ['Consulta el calendario y las opciones de pasaporte para tu fecha. Verifica las restricciones de las atracciones que te interesan.', 'Check the opening calendar and ticket options for your date. Review the restrictions for the rides you want.', '按日期查看开放日历与票种，并提前核对想玩的设施有哪些限制。'],
    transport: ['Desde Montenegro, sigue la vía a Pueblo Tapao hasta el km 6. Usa la entrada oficial como destino de navegación.', 'From Montenegro, follow the road to Pueblo Tapao to kilometer 6. Navigate to the park entrance.', '从蒙特内格罗沿往普韦布洛塔保的公路到 6 公里处，导航选园区入口。'],
    route: ['Elige primero un espectáculo o recorrido cafetero y organiza las demás paradas alrededor de su horario.', 'Pick a show or coffee-themed route first, then plan your other stops around its schedule.', '先选一场表演或一段咖啡主题路线，再依时段安排其他游玩点。'],
    photoTip: ['Desde los senderos señalizados, combina las hileras de café con las laderas del fondo.', 'From the marked paths, frame rows of coffee plants against the slopes behind them.', '在标示步道上把咖啡树行列和背景山坡一起入镜。'],
    question: ['¿Todos los pasaportes cubren las mismas atracciones?', 'Do all tickets cover the same rides?', '不同票种包含的设施一样吗？'],
    answer: ['Compara la descripción de los pasaportes del parque antes de comprar.', 'Compare the park’s ticket descriptions before buying.', '购买前请对照园方的票种及包含项目。'],
  },
  {
    key: 'parque-de-la-vida', city: 'Armenia',
    name: ['Parque de la Vida de Armenia', 'Parque de la Vida, Armenia', '亚美尼亚生命公园'],
    address: 'Avenida Bolívar, sector Avenida 19 Norte, Armenia, Quindío, Colombia',
    photo: 'Parque de la Vida.JPG', source: 'https://www.smparmenia.com/parque',
    lead: ['Un parque arbolado al norte de Armenia con senderos, agua y espacios de descanso.', 'A wooded park in northern Armenia with paths, water features and places to pause.', '这座城市公园位于亚美尼亚市北部，可散步看树荫、池水和水瀑。'],
    management: ['La Sociedad de Mejoras Públicas de Armenia administra el parque y publica sus datos de visita.', 'The Sociedad de Mejoras Públicas de Armenia manages the park and publishes visitor information.', '亚美尼亚公共改善协会管理公园，并发布参观信息。'],
    history: ['La Federación Nacional de Cafeteros donó la construcción para el centenario de Armenia en 1989. Los caminos permiten ver cómo el agua y la vegetación se integran al parque urbano.', 'The National Federation of Coffee Growers donated its construction for Armenia’s centenary in 1989. The paths show how water and vegetation are woven into the urban park.', '哥伦比亚全国咖啡种植者联合会为亚美尼亚建城百年纪念捐建公园。沿步道可看水景与林地如何融入城市公园。'],
    access: ['Revisa con la Sociedad de Mejoras Públicas el horario y la tarifa de acceso antes de ir.', 'Confirm opening hours and admission with the park operator before visiting.', '出发前请向公园管理方查询开放时间与入园费用。'],
    transport: ['Desde el centro de Armenia, toma transporte hacia el sector norte de la Avenida Bolívar y baja en el acceso del parque.', 'From central Armenia, take local transport north along Avenida Bolívar and get off at the park entrance.', '从亚美尼亚市中心搭车往玻利瓦尔大道北段，在公园入口下车。'],
    route: ['Entra por la avenida, baja hacia el agua por los senderos habilitados y vuelve a la entrada por el recorrido que prefieras.', 'Enter from the avenue, follow the open paths down toward the water and return at your own pace.', '从大道入口入园，沿开放步道下到水边，再按体力选择回程。'],
    photoTip: ['Busca un ángulo desde el sendero donde se vean los reflejos y la vegetación de la orilla.', 'Find a path-side angle showing the reflections and vegetation along the water.', '从步道选择能同时拍到倒影和岸边植被的角度。'],
    question: ['¿Puede combinarse con el Museo del Oro?', 'Can I combine it with the Gold Museum?', '可以和黄金博物馆同一天逛吗？'],
    answer: ['Sí. Ambos quedan en el norte de Armenia; verifica por separado el horario y el acceso de cada sitio.', 'Yes. Both are in northern Armenia. Check opening hours and access for each separately.', '可以，两处都在亚美尼亚市北部，开放时段和入园条件请分别核对。'],
  },
  {
    key: 'catedral-armenia', city: 'Armenia',
    name: ['Catedral de la Inmaculada Concepción de Armenia', 'Immaculate Conception Cathedral, Armenia', '亚美尼亚圣母无原罪主教座堂'],
    address: 'Plaza de Bolívar, Armenia, Quindío, Colombia',
    photo: 'Catedral de armenia.jpg',
    source: 'https://quindio.gov.co/home/docs/items/item_189/2019/Inicio_cultura/LISTADO_DOCUMENTOS_CENTRO_DE_DOCUMENTACION_DEL_PATRIMONIO_CULTURAL/Armenia_Patrimonial.pdf',
    managementSource: dioceseSource,
    lead: ['La catedral de Armenia presenta una silueta geométrica junto a la Plaza de Bolívar.', 'Armenia’s cathedral has a geometric silhouette beside Plaza de Bolívar.', '主教座堂毗邻亚美尼亚市玻利瓦尔广场，以几何轮廓为辨识点。'],
    management: ['Es la sede catedralicia de la Diócesis de Armenia. La comunidad parroquial organiza las celebraciones y el acceso al templo.', 'This is the cathedral of the Diocese of Armenia. The parish community organizes services and visitor access.', '这里是天主教亚美尼亚教区的主教座堂，礼拜与入内开放由堂区安排。'],
    history: ['El edificio actual abrió en 1972 y forma parte del centro cívico de Armenia. Observa los planos inclinados y la forma angular de la cubierta desde la plaza antes de acercarte.', 'The current building opened in 1972 and forms part of Armenia’s civic center. From the square, study the sloping surfaces and angular roofline before approaching.', '现有建筑于 1972 年启用，是亚美尼亚市中心公共空间的一部分。走近前先从广场观察倾斜表面与折线屋顶。'],
    access: ['La plaza permite ver el exterior. Consulta el horario litúrgico para visitar el interior.', 'See the exterior from the square. Check the service schedule before visiting inside.', '广场可观看外观。想入内参观，请先查询礼拜安排。'],
    transport: ['En el centro de Armenia, baja cerca de la Plaza de Bolívar y continúa a pie hasta el templo.', 'In central Armenia, get off near Plaza de Bolívar and walk to the cathedral.', '在亚美尼亚市中心靠玻利瓦尔广场处下车，然后步行到座堂。'],
    route: ['Cruza la plaza para ver el edificio completo, rodea la fachada si el paso está libre y vuelve hacia el centro de la plaza.', 'Cross the square for a full view, look along the façade if the way is clear and return toward the center of the square.', '穿过广场看建筑全貌，通道开放时沿立面走一段，再回到广场中央。'],
    photoTip: ['Prueba un encuadre diagonal desde la plaza para destacar la inclinación de la cubierta.', 'Try a diagonal view from the square to emphasize the slope of the roof.', '从广场斜向拍摄，更容易表现屋顶的坡度和折线。'],
    question: ['¿Es la misma iglesia que la de Filandia?', 'Is this the same church as the one in Filandia?', '这和菲兰迪亚的同名教堂是同一处吗？'],
    answer: ['La catedral está en Armenia. En Filandia hay una iglesia parroquial con la misma advocación.', 'The cathedral is in Armenia. Filandia has a separate parish church with the same dedication.', '座堂在亚美尼亚市。菲兰迪亚另有一座奉同一名号的堂区教堂。'],
  },
];

const headings = {
  history: localize(['Historia y qué observar', 'History and what to look for', '历史背景与观察重点']),
  access: localize(['Apertura y entrada', 'Opening and admission', '开放与入场']),
  route: localize(['Recorrido sugerido', 'Suggested route', '建议游览路线']),
  photo: localize(['Dónde hacer fotos', 'Where to take photos', '拍摄机位']),
};

const locales = ['es', 'en', 'zh'] as const;

export const quindioAttractions: Topic[] = landmarks.map((item) => {
  const name = localize(item.name);
  const lead = localize(item.lead);
  const sourceTitle = localize(['Información del lugar', 'Visitor information', '景点资料']);
  const slug = item.key;
  return {
    key: `quindio-${slug}`,
    slug: { es: slug, en: slug, zh: slug },
    title: name,
    metaTitle: name,
    metaDescription: lead,
    lead,
    verifiedLabel: localize(['Fuentes de visita', 'Visit sources', '游览资料']),
    source: { name: sourceTitle, url: item.source },
    place: {
      address: item.address,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name.es}, ${item.city}, Quindío, Colombia`)}`,
      management: localize(item.management),
      managementSource: item.managementSource ?? item.source,
      transport: localize(item.transport),
      photo: {
        file: `/gallery/quindio/${slug}.webp`,
        source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(item.photo.replaceAll(' ', '_'))}`,
      },
    },
    sections: Object.fromEntries(locales.map((locale, index) => [locale, [
      { heading: headings.history[locale], paragraphs: [item.history[index]] },
      { heading: headings.access[locale], paragraphs: [item.access[index]] },
      { heading: headings.route[locale], paragraphs: [item.route[index]] },
      { heading: headings.photo[locale], paragraphs: [item.photoTip[index]] },
    ]])) as Topic['sections'],
    faq: {
      es: [{ q: item.question[0], a: item.answer[0] }],
      en: [{ q: item.question[1], a: item.answer[1] }],
      zh: [{ q: item.question[2], a: item.answer[2] }],
    },
  };
});
