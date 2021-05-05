const cacheName = "cache-health-v1";
const offlineAsset = [
    './',
    './index.html',
    './health_icon_x72 .png',
    './health_icon_x128.png',
    './health_icon_x192.png',
    './health_icon_x512.png',
    './manifest.webmanifest',
];

// lifesycle PWA
self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(offlineAsset);
    return self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.clients.claim();
});
// ofline mode of PWA ..
self.addEventListener('fetch', function (event) {
    event.respondWith(async function () {
        try {
            var res = await fetch(event.request);
            var cache = await caches.open('cache');
            cache.put(event.request.url, res.clone());
            return res;
        }
        catch (error) {
            return caches.match(event.request);
        }
    }());
});





async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}
