/* FOZ Defter service worker: çevrimdışı önbellek + bildirim tıklamaları
   Sayfa (HTML) ve takvim (JSON) önce internetten alınır; böylece yeni sürüm ve
   vergi takvimi güncellemeleri hemen gelir. İnternet yoksa önbellekten açılır. */
const CACHE = 'foz-defter-v0.2.0';
const FILES = ['./', './index.html', './jsqr.js', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './vergi-takvimi.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(FILES.map((f) => c.add(f).catch(() => null)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req) {
  return fetch(req).then((res) => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('./index.html')));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const p = url.pathname;
  if (req.mode === 'navigate' || p.endsWith('/') || p.endsWith('.html') || p.endsWith('.json')) { e.respondWith(networkFirst(req)); return; }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const data = e.notification.data || {};
  let url = './index.html';
  if (data.debtId) {
    const act = e.action === 'paid' ? 'paid' : (e.action === 'snooze' ? 'snooze' : 'open');
    url += '?action=' + act + '&debt=' + encodeURIComponent(data.debtId);
  }
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) { c.postMessage({ type: 'notif-action', url }); return c.focus(); }
      }
      return self.clients.openWindow(url);
    })
  );
});
