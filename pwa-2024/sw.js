let static_assets = "static-v2";
let dynamic_assets = "dynamic-v1";

let assets = [
    "/",
    "index.html",
    "header.html",
    "style.css",
    "assets/bild1.jpg",
    "main.js"
]

self.addEventListener("install", install);
self.addEventListener("activate", activate);
self.addEventListener("fetch", handleFetch);


function install(e){

    console.log(e)

    e.waitUntil(

        caches.open(static_assets).then(cache=>{
            cache.addAll(assets).then(()=>{
                console.log("static assets added")
            });
           
        })
        .then(()=>{
            self.skipWaiting();
        })
        .catch(err=>{
            console.log("error")
        })



    );


}

function activate(e){


    caches.keys().then(keys=>{

        keys.forEach(cache=>{

            if(cache != static_assets && cache != dynamic_assets)
            {
                caches.delete(cache).then(()=>{
                    console.log(cache, " deleted");
                })
                .catch(()=>{
                    console.log("Nothing deleted");
                });
            }
        });
    })



}


function handleFetch(e){

    e.respondWith(

        fetch(e.request)
        .then(response=>{

           return caches.open(dynamic_assets).then(cache=>{

                cache.put(e.request.url, response.clone())
                return response;
            })
        })
        .catch(err=>{
            console.log("Cache is used")
          return caches.match(e.request)
        })



    );



}