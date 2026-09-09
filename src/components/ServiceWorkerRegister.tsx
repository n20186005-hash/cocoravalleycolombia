'use client';

import { useEffect } from 'react';

/**
 * PWA 支持：在客户端注册 Service Worker（静态导出 /sw.js）
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      window.location.protocol !== 'https:'
    ) {
      return;
    }
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          /* 注册失败静默处理，不影响正常访问 */
        });
    });
  }, []);

  return null;
}
