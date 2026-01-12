if(navigator.serviceWorker){

    window.navigator.serviceWorker.register("sw.js")
        .then(w=>{
            console.log(w);
            console.log("service worker registered");
        }).catch(err=>console.log(err))


}




async function getChannels(){
    const sr = "https://api.sr.se/api/v2/channels/?format=json";
    let res = await fetch(sr);
    let data = await res.json();

    let channels = data.channels;
    console.log(channels);

    channels.forEach(c=>{

        let img = document.createElement("img");
        img.src = c.image;
        document.querySelector("main").appendChild(img);

    })


    


}

