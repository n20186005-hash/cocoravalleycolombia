import notes from './attraction-field-notes.json';
import type { Topic } from './topics';

const groups = [
  ['salento-plaza','quindio-carmen-salento','quindio-calle-real','salento-alto','quindio-fonda-boquia-salento'],
  ['quindio-inmaculada-filandia','quindio-calle-del-tiempo-detenido','quindio-fonda-asael-filandia','quindio-colina-iluminada','quindio-tambo-jardin-filandia'],
  ['quindio-parque-sucre-armenia','quindio-centro-comercial-cielos-abiertos','quindio-plaza-de-bolivar-armenia','quindio-catedral-armenia','quindio-teatro-azul-armenia','quindio-casa-museo-musical-del-quindio','quindio-museo-de-arte-de-armenia-y-del-quindio-maqui'],
  ['quindio-parque-de-los-fundadores-armenia','quindio-parque-de-la-vida','quindio-museo-oro-quimbaya'],
  ['quindio-jardin-botanico-quindio','quindio-ecoparque-penas-blancas','quindio-recuca'],
  ['quindio-pacea-puerto-alegre-buenavista','quindio-qinti-patas-arriba','quindio-recuca'],
  ['quindio-parque-del-cafe','quindio-kindia-park','quindio-las-bailarinas','quindio-parque-de-los-arrieros','quindio-panaca','quindio-parque-tematico-quimbayas']
];

export function getFieldNote(key: string) {
  return notes[key as keyof typeof notes];
}

export function routeNeighbours(topic: Topic, topics: Topic[]) {
  const group = groups.find(items => items.includes(topic.key));
  if (!group) return [];
  const index = group.indexOf(topic.key);
  const keys = [group[(index + group.length - 1) % group.length], group[(index + 1) % group.length]];
  return keys.flatMap(key => topics.filter(t => t.key === key));
}
