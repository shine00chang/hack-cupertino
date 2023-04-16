<svelte:head>
    <script defer async
     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSP-Hux39o-vrRRL-u1LYugk35jPVg1I&callback=initMap">
    </script>

  <title>Map</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { showInfo } from "$lib/components/stores.js";
    import { trackedPos } from "$lib/components/stores.js";
    import * as API from "$lib/api.js";
    import LatLong from "$lib/components/LatLong.svelte";
    import Incident from "$lib/components/Incident.svelte";
    import App from "./App.svelte";

    let pos;
    let show;

    let incidents = [];
    let latitude, longitude;

    onMount(async () => {
      API.get_location(async coords => {
        latitude = coords.latitude;
        longitude = coords.longitude;
        incidents = await API.fetch_incidents(coords);
      });

      const app = new App({
        target: document.getElementById("map"),
        props: {
          ready: false,
        }
      });
    });

    var incident;

    trackedPos.subscribe(async info => {
        let location = {
            latitude: info.lat,
            longitude: info.lng
        };
        incident = (await API.fetch_incidents(location, 0.001))[0];
        console.log(incident);
    })

    showInfo.subscribe(info => {
        show = info;
    })

</script>

<style>
  #list {
    width: 40vw;
  }

  @media (max-width: 800px) {
    #list {
      display: none;
    }

    #map {
      width: 100vw;
      right: -2px;
      padding-left: 100px;
    }
  }
</style>

<div class="flex flex-row gap-24 m-5">
    
    
    {#if show && incident !== undefined}
        <div>
            <Incident {incident} />
        </div>
    {:else}
        <div id="list" class="flex flex-col gap-3">
            <h1 class="text-2xl font-bold">
                Incidents
            </h1>
            {#each incidents as incident}
                <Incident {incident}/>
            {/each}
        </div>
    {/if}
   <div id="map" class="flex flex-col gap-2 fixed right-8">
    <h1 class="text-2xl font-bold">
      Map
    </h1>
      <App ready={true}/>
        <!-- <Map/> -->
        <LatLong {longitude} {latitude}/>
    </div>
</div>
