const CACHE="skate-v3";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin&&e.request.mode!=="navigate")return; // z. B. Supabase-API: immer direkt ins Netz
  const isShellFile=SHELL.slice(1).some(p=>url.pathname.endsWith(p.slice(1)));
  const isIndex=url.pathname.endsWith("/")||url.pathname.endsWith("/index.html");
  if(e.request.mode==="navigate"||isIndex){
    // Netzwerk zuerst: App-Updates nach git push erscheinen sofort; Cache nur als Offline-Fallback
    e.respondWith(fetch(e.request).then(res=>{
      const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
      if(res.ok&&url.origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
      return res;
    }).catch(()=>caches.match("./index.html")))
  );
});
