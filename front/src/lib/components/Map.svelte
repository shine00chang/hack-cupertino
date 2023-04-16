<script>
    export var accidents; 
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
        const loadMap = () => {
        var map;

        var test= {lat: 37.3, lng: -122.032};
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                maxZoom: 15,
                center: test
        });


        for (let i = 0; i < accidents.length; i++) {
            console.log(accidents[i].lat, accidents[i].lng);
                var marker = new google.maps.Marker({
                    position: {lat: accidents[i].lat, lng: accidents[i].lng},
                    map: map
                });
        }

    }  

    function initMap() {loadMap();} 

    </script>

    <script async defer
    src=
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSP-Hux39o-vrRRL-u1LYugk35jPVg1I&callback=initMap">
    </script>

  <p>{accidents}</p>
</body>