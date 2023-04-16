<script>
    import { onMount } from "svelte";

    onMount(async() => {

    });

    //export let accidents = await API.magic();
    export let accidents;
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
  <p>Marked Crimes</p>
  <div id="map"></div>

    <script>
    function initMap() {
        var map;

        var test= {lat: 37.3, lng: -122.032};
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                maxZoom: 15,
                center: test
        });
        
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


        for (let i = 0; i < accidents.length; i++) {
            console.log(accidents[i].lat, accidents[i].lng);
                var marker = new google.maps.Marker({
                    position: {lat: accidents[i].lat, lng: accidents[i].lng},
                    map: map
                });
        }

    }  
    
    </script>

    <script async defer
    src=
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSP-Hux39o-vrRRL-u1LYugk35jPVg1I&callback=initMap">
    </script>

  <p>{accidents}</p>
</body>