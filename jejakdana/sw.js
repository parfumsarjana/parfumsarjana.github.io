const V="jejakdana-v1",ASSETS=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
 if(r.method!="GET"||u.origin!=location.origin)return;
 if(r.mode=="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put("index.html",c));return x}).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(r).then(c=>{const n=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(V).then(h=>h.put(r,y))}return x}).catch(()=>c);return c||n}))});
