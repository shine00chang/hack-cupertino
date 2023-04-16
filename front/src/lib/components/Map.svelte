<script>
  import { onMount } from "svelte";
  import * as API from "$lib/api.js";


  let container;
	let map;

  onMount(async () => {
    //const BACKEND_URL = "http://localhost:3000";
    const BACKEND_URL = "https://cupertino-hacks.the-yiga.repl.co";
    navigator.permissions.query({name: 'geolocation'})
            // .then((permissionStatus) => {});
    if (!navigator.geolocation) {console.error("geolocation not permitted."); return;}

    // Initialize map as callback after geolocation
    let location = { latitude: 37.326, longitude: -122.043 };
    let incidents = [];
    await API.get_location(async coords => {
      location = coords;
      await fetch(BACKEND_URL+`/by-location?longitude=${location.longitude}&latitude=${location.latitude}`)
           .then(res => res.json())
           .then(res => {
             console.log("by location fetch: ", res);
             
            incidents = res;
            map = new google.maps.Map(container, {
                zoom: 16,
                maxZoom: 20,
                center: {lat: location.latitude, lng: location.longitude}  
            });

            let marker = new google.maps.Marker({
                position: {lat: location.latitude, lng: location.longitude},
                map,
                icon: {
                  anchor: google.maps.Point(location.latitude, location.longitude),
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: "blue",
                  fillOpacity: 1,
                  strokeWeight: 1,
                  rotation: 0,
                  scale: 5,
                  strokeColor: "blue"
              },
              draggable: false
            });
            
            for (let i = 0; i < incidents.length; i++) {
                console.log({lat: incidents[i].latitude, lng: incidents[i].longitude});
                let marker = new google.maps.Marker({
                  position: {lat: incidents[i].latitude, lng: incidents[i].longitude},
                  map,
                  icon: {
                    anchor: google.maps.Point(incidents[i].latitude, incidents[i].longitude),
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: "red",
                    fillOpacity: 0.1,
                    strokeWeight: 1,
                    rotation: 0,
                    scale: 20,
                    strokeColor: "red"
                },
                draggable: false
                });
            }
           })
           .catch(e => {
             console.error("error on fetch", e);
             return [];
           });
    });
     
      console.log(incidents);
      console.log(incidents.length);
     


//       for (let i = 0; i < accidents.length; i++) {
//               console.log({lat: accidents[i].latitude, lng: accidents[i].longitude});
//               var marker = new google.maps.Marker({
//                 position: {lat: accidents[i].latitude, lng: accidents[i].longitude},
//                 map: map,
//                 icon: {
//                     anchor: google.maps.Point(item.location.latitude, item.location.longitude),
//                     path: google.maps.SymbolPath.CIRCLE,
//                     fillColor: "red",
//                     fillOpacity: 2, 
//                     strokeWeight: 1,
//                     rotation: 0,
//                     scale: 6
//                 },
//                 draggable: false
//               });
// }
    });


</script>

<style>
  .full-screen {
      width: 50vw;
      height: 50vh;
  }
  </style>

<div>
  <div class="full-screen" bind:this={container}></div>
</div>
