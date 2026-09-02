const CACHE_NAME = 'bookkeeping-v1.8.0';
const PRECACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/xlsx.full.min.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

// Every network fetch inside this worker bypasses the browser HTTP cache
// (cache:'no-store'), so the worker always sees the true bytes on the server.
// Without this, a release could be masked by a stale HTTP-cached copy and the
// update would silently never land — which is exactly the bug we are guarding
// against. The worker's own Cache API is the only cache we trust.
const NET = { cache: 'no-store' };

// Install: cache the app shell, so the very first cold start already has a copy
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(PRECACHE.map((url) =>
        fetch(url, NET).then((r) => r.ok && cache.put(url, r)).catch(() => null)
      ))
    ).then(() => self.skipWaiting())
  );
});

// Activate: drop older caches so a new release cannot be shadowed by stale files
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

function cacheAndReturn(request, response) {
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

// cache-first for static files: answer from the worker cache, network only on a miss
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request, NET);
  return cacheAndReturn(request, response);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // The service worker script itself must never come from cache, otherwise an
  // old worker keeps serving its own copy and the app can never update.
  if (isSameOrigin && url.pathname.endsWith('/sw.js')) {
    event.respondWith(fetch(request, NET));
    return;
  }

  if (request.mode === 'navigate') {
    // The page itself stays network-first: it is small, and a fresh copy is what
    // makes a new release get picked up on the very next launch. Only the heavy
    // assets below are served from cache. If the network is down (airplane mode)
    // we fall back to the cached shell so the app still opens.
    event.respondWith(
      fetch(request, NET)
        .then((response) => cacheAndReturn(request, response))
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(request, { ignoreSearch: true }))
            || (await cache.match('./index.html'));
        })
    );
    return;
  }

  // Own assets and cross-origin CDN files: cache first, network as fallback.
  event.respondWith(
    cacheFirst(request).catch(() => (request.mode === 'navigate' ? caches.match('./index.html') : null))
  );
});
