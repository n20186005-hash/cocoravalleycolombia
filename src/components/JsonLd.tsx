/**
 * 将 JSON-LD 结构化数据安全注入 HTML（服务端组件）
 */
export default function JsonLd({ data }: { data: object }) {
  if (!data) return null;
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
