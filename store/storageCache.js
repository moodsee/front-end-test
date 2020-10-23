
export default {
    setCache(response, cacheName, url){
        caches.open(cacheName).then(function (cache) {
            cache.put(url, new Response(response));
        });
    },

    async getData(cacheName, url) {
        let cachedData = await this.getCachedData( cacheName, url );
     
        if ( cachedData ) {
           return cachedData;
        }
         
        const cacheStorage = await caches.open( cacheName );
        await cacheStorage.add( url );
        cachedData = await this.getCachedData( cacheName, url );
        await deleteOldCaches( cacheName );
     
        return cachedData;
    },
     
     // Get data from the cache.
    async getCachedData( cacheName, url ) {
        const cacheStorage   = await caches.open( cacheName );
        const cachedResponse = await cacheStorage.match( url );
     
        if ( ! cachedResponse || ! cachedResponse.ok ) {
           return false;
        }
     
        return await cachedResponse.json();
    }
     
}