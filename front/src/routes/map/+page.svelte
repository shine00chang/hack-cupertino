<script>
    let accidents = [];
    let la = 37.3;
    let ln = -122.03;

    for (let i = 0; i < 10; i++) {
        let p = {
            lat: la+Math.random()/2.0,
            lng: ln+Math.random()/2.0,
            desc: "A"
        }

        accidents.push(p);
    }

</script>

<svelte:head>
    <style>
        #map {
        height: 400px;
        width: 400px;
        }
    </style>
</svelte:head>

<body>
  <p>My Google Maps Demo</p>
  <div id="map"></div>
  <script>
    function initMap() {
      var test= {lat: 37.3, lng: -122.032};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        maxZoom: 15,
        center: test
      });
      var marker = new google.maps.Marker({
        position: test,
        map: map
      });
    }
  </script>
  <script async defer
  src=
"https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSP-Hux39o-vrRRL-u1LYugk35jPVg1I&callback=initMap">
  </script>
</body>