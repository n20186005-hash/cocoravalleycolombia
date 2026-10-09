// Cloudflare Workers Static Assets 入口（配合 wrangler.jsonc）
// 职责：
//   1) 规范化主机：www → 非 www、http → https（301 永久重定向）；
//   2) 优先把请求交给 ASSETS（静态文件直出，保留缓存头）；
//   3) Next.js 静态导出产生的是扁平 .html（out/es.html、out/es/eje-cafetero.html），
//      这里把干净 URL（/es、/es/eje-cafetero、/es/…）映射到对应 .html 文件；
//   4) 真正不存在的路径返回 out/404.html（HTTP 404）；
//   5) 给所有响应追加基础安全头（HSTS 等）。
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;

    // 1) 主机规范化：www → 非 www
    if (host.startsWith('www.')) {
      const target = new URL(request.url);
      target.hostname = host.slice(4);
      return Response.redirect(target.toString(), 301);
    }

    // 2) 强制 HTTPS（Cloudflare 通常会终止 TLS；此处兜底）
    if (url.protocol === 'http:') {
      const target = new URL(request.url);
      target.protocol = 'https:';
      return Response.redirect(target.toString(), 301);
    }

    // 3) 能直接命中的静态资源直接返回
    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404) {
      return secure(direct);
    }

    // 4) 尝试 “整洁 URL → 扁平 .html” 映射
    const pathname = url.pathname;
    const clean = pathname.replace(/\/+$/, '') || '/';
    const candidate = clean === '/' ? '/index.html' : `${clean}.html`;
    const mapped = await env.ASSETS.fetch(
      new Request(new URL(candidate, url), {
        method: request.method,
        headers: request.headers,
      })
    );
    if (mapped.status !== 404) {
      return secure(mapped);
    }

    // 5) 兜底：渲染静态 404 页面并返回真实 404 状态码
    const notFoundPage = await env.ASSETS.fetch(new Request(new URL('/404.html', url)));
    const headers = new Headers(notFoundPage.headers);
    if (!headers.get('content-type')) {
      headers.set('content-type', 'text/html; charset=utf-8');
    }
    return new Response(notFoundPage.body, { status: 404, headers });
  },
};

function secure(res) {
  const headers = new Headers(res.headers);
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}
