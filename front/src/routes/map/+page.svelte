<script>
    import Map from "$lib/components/Map.svelte";
    import { onMount } from 'svelte';
    import {Accordion, AccordionItem} from "svelte-collapsible"
    import * as API from "$lib/api.js";
    import LatLong from "../../lib/components/LatLong.svelte";

    let accidents = [];
    let latitude, longitude;

    onMount(async () => {
      API.get_location(async coords => {
        latitude = coords.latitude;
        longitude = coords.longitude;
        accidents = await API.fetch_incidents(coords);
      });
    });
</script>

<body>
    <style>
        @media (max-width: 800px) {
          #hidden-mobile {
            display: none;
          }
        }
        
        @media (max-width: 790px) {
            #expand-mobile {
                min-width: 90vh
            }
        }
      </style>

    <div style="width: 47vw; float:left; height:90vh; margin:1vw" id="hidden-mobile">
        {#each accidents as accident}
          <div style="width: 95%; height: 50px; border-radius: 20px; background-color: silver; margin: 10px; display: block; overflow: auto; text-align: center">
              <h3>{accident.desc}</h3>
          </div>
        {/each}
    </div>
   <div style="width: 47vw; float:right; height:90vh; margin:1vw" id="expand-mobile">
        <Map/>
        <LatLong {longitude} {latitude}/>
    </div>
</body>
