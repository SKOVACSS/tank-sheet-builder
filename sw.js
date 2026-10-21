// Replaces the old TankRounds offline worker at this address. Phones and computers that
// used the old site check this file for updates; this version deletes the old offline
// copy, removes itself, and sends any open windows to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of windows) {
      const u = new URL(w.url);
      w.navigate('https://tanks.stevenks.com/' + u.search + u.hash).catch(() => {});
    }
  })());
});
// while it's still running, never serve anything from the old offline copy
self.addEventListener('fetch', () => {});
