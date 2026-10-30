/* LBL Coach PWA 55.7.3 — no caching of user data or application HTML. */
const CACHE='lbl-coach-pwa-assets-v1';
const ASSETS=['./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('lbl-coach-pwa-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!ASSETS.some(asset=>url.pathname.endsWith(asset.slice(1))))return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
