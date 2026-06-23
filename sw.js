const CACHE_NAME = 'bp-pitstop-v3';
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Lato:wght@400;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Always go network-first for the Anthropic API
  if (e.request.url.includes('anthropic.com')) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      if (resp && resp.status === 200 && resp.type === 'basic') {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return resp;
    })).catch(() => caches.match('./index.html'))
  );
});
