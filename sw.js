const { cache } = require("react");

//copy pasted from My Runs
const CACHE_VERSION = '#69'
const CACHE_NAME = `${CACHE_VERSION}th Cevent Version`; 

self.addEventListener('install', (event) => {
const BASE = self.location.origin + '/Cevent/';
const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'admin.html',
  BASE + 'manifest.json',
  BASE + 'announcements.json',
  BASE + 'ceventBody.js',
  BASE + 'adminInJS.js',
  BASE + 'cevent.css',
  BASE + 'sw.js',
  BASE + 'Images/cevent_icon_option_a.png',
  BASE + 'Images/admin_panel.png'
];

//downloads new cache if detected
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log('Cached:', url);
        } catch (err) {
          console.error('Failed to cache:', url, err);
        }
      }
    })
  );
  self.skipWaiting();
});
//auto updates to new cache
self.addEventListener('activate', event => {

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

//if user is offline
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
           const copy = response.clone();
           event.waitUntil(
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
           );
          return response;
           
        })
        .catch(() => {
          console.warn("I'm serving the offline.html version.");
          return caches.match(self.location.origin + '/Cevent/offline.html');
  })
);
  } else {
     event.respondWith(
      caches.match(event.request)
      .then(response => response || fetch(event.request))

      )
    
  }
});
//handles cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    const bussing = event.data.url;
    const key = self.location.origin + '/Cevent/announcements.json';
    caches.open(CACHE_NAME).then(cache => {
      try{
        const response = await fetch(bussing, {cache: 'no-store'});
        if(response && response.ok){
          await cache.put(key, response.clone());
          console.log(key,"'s update.");
        } else{
          console.warn("It failed :( ", bussing, response && response.status);
        }
      } catch(err){
        console.error("Couldn't update", bussing, err);
      }
    });
  }
});