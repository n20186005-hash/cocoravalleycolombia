// Cloudflare Workers Static Assets 入口（配合 wrangler.jsonc）
// 职责：
//   1) 优先把请求交给 ASSETS（静态文件直出，保留缓存头）；
//   2) Next.js 静态导出产生的是扁平 .html（out/es.html、out/es/eje-cafetero.html），
//      这里把干净 URL（/es、/es/eje-cafetero、/es/…）映射到对应 .html 文件；
//   3) 真正不存在的路径返回 out/404.html（HTTP 404）。
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1) 能直接命中的静态资源直接返回
    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404) {
      return direct;
    }

    // 2) 尝试 “整洁 URL → 扁平 .html” 映射
    const clean = pathname.replace(/\/+$/, '') || '/';
    const candidate = clean === '/' ? '/index.html' : `${clean}.html`;
    const mapped = await env.ASSETS.fetch(
      new Request(new URL(candidate, url), {
        method: request.method,
        headers: request.headers,
      })
    );
    if (mapped.status !== 404) {
      return mapped;
    }

    // 3) 兜底：渲染静态 404 页面并返回真实 404 状态码
    const notFoundPage = await env.ASSETS.fetch(new Request(new URL('/404.html', url)));
    const headers = new Headers(notFoundPage.headers);
    if (!headers.get('content-type')) {
      headers.set('content-type', 'text/html; charset=utf-8');
    }
    return new Response(notFoundPage.body, { status: 404, headers });
  },
};
