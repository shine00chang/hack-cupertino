<script>
</script>

<svelte:head>
    <style>
        #map {
        height: 400px;
        width: 100%;
        }
    </style>
</svelte:head>

<body>
  <center><h3>Marked Crimes</h3></center>
  <div id="map"></div>

    <script>
      async function initMap () {
        //const BACKEND_URL = "http://localhost:3000";
        const BACKEND_URL = "https://cupertino-hacks.the-yiga.repl.co";
        navigator.permissions.query({name: 'geolocation'})
                // .then((permissionStatus) => {});
        if (!navigator.geolocation) {console.error("geolocation not permitted."); return;}

        // Initialize map as callback after geolocation
        navigator.geolocation.getCurrentPosition(async pos => {
          const location = pos.coords; 

          var accidents = await fetch(BACKEND_URL+`/by-location?longitude=${location.longitude}&latitude=${location.latitude}`)
            .then(res => res.json())
            .then(res => {
              console.log("by location fetch: ", res);
              return res;
            })
            .catch(e => {
              console.error("error on fetch", e);
              return [];
            });
         
          console.log(accidents);
          var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 10,
              maxZoom: 15,
              center: location  
          });
        
          for (let i = 0; i < accidents.length; i++) {
              console.log({lat: accidents[i].latitude, lng: accidents[i].longitude});
              var marker = new google.maps.Marker({
                position: {lat: accidents[i].latitude, lng: accidents[i].longitude},
                map: map
              });
          }
        }); 
      }  
    </script>

    <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSP-Hux39o-vrRRL-u1LYugk35jPVg1I&callback=initMap">
    </script>
</body>
