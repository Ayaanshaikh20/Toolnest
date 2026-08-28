// ToolNest Production Service Worker
const CACHE_VERSION = 'toolnest-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Core static assets for initial offline shell
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/icon-maskable.svg'
];

// Domains to exclude from caching (analytics, ads, tracking)
const EXCLUDED_HOSTS = [
  'pagead2.googlesyndication.com',
  'googleads.g.doubleclick.net',
  'www.google-analytics.com',
  'analytics.google.com',
  'googletagmanager.com',
  'adservice.google.com'
];

// Install Event - Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache non-fatal error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean Up Stale Caches & Claim Clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Dynamic Stale-While-Revalidate & Offline Fallbacks
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension/data URLs
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Skip ads and analytics
  if (EXCLUDED_HOSTS.some(host => url.hostname.includes(host))) {
    return;
  }

  // 1. Navigation Requests (HTML pages / SPA routes)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put('/', copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline SPA fallback
          const cachedIndex = await caches.match('/') || await caches.match('/index.html');
          if (cachedIndex) return cachedIndex;
          return new Response('ToolNest is offline. Please check your internet connection.', {
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, WASM, Fonts, Images, PDF.js Workers)
  const isStaticAsset = 
    url.pathname.match(/\.(js|css|svg|png|jpg|jpeg|webp|wasm|woff2|ttf)$/) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('cdn.jsdelivr.net');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Return cached version immediately, fetch and update cache in background (Stale-While-Revalidate)
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy));
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Default Network-First with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Support manual updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
