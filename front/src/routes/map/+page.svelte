<script>
        function myMap() {
        var mapProp= {
        center:new google.maps.LatLng(37.3230, -122.0322),
        zoom:18,
        maxZoom:18
        };
        var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        }
</script>

<svelte:head>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSP-Hux39o-vrRRL-u1LYugk35jPVg1I&callback=myMap"></script>
</svelte:head> 

<div id="googleMap" style="width:600px;height:400px;"></div>