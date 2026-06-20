// RoStock Service Worker
const CACHE = "rostock-v1";
const ASSETS = [
  "/fruitalarm/",
  "/fruitalarm/index.html",
  "/fruitalarm/bloxfruits.html",
  "/fruitalarm/style.css",
  "/fruitalarm/app.js",
  "/fruitalarm/fruits.js",
  "/fruitalarm/icons.js",
  "/fruitalarm/manifest.json",
  "/fruitalarm/icon.svg",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
