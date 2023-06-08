var APP_PREFIX = 'mf-track';
var VERSION = 'version_01';
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = [
  '/mf-track/',
  '/mf-track/index.html'
];

this.addEventListener('fetch', function(e) {
  console.log('fetch request: ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(request) {
      if (request) {
        console.log('responding with cache: ' + e.request.url);
        return request;
      } else {
        console.log('file is not cached, fetching: ' + e.request.url);
        return fetch(e.request);
      }
    })
  );
});

this.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('installing cache: ' + CACHE_NAME);
      return cache.addAll(URLS);
    })
  );
});

this.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      var cacheWhitelist = keyList.filter(function(key) {
        return key.indexOf(APP_PREFIX) === 0;
      });
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log('deleting cache: ' + key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});
