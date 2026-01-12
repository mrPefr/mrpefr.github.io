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



//// Instalation

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar
  event.preventDefault();

  // Save the event so it can be triggered later
  deferredPrompt = event;

  // Show your custom install popup/button
 showInstallPopup();

});


function showInstallPopup() {
  document.getElementById('install-popup').style.display = 'block';
}

function hideInstallPopup() {
  document.getElementById('install-popup').style.display = 'none';
}


document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;
  console.log('User choice:', outcome);

  deferredPrompt = null;
  hideInstallPopup();
});