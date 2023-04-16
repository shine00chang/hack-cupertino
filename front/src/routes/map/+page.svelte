<script>
    import Map from "$lib/components/Map.svelte";
    import { onMount } from 'svelte';
    import {Accordion, AccordionItem} from "svelte-collapsible"
    import * as API from "$lib/api.js";

    let accidents = [];
    onMount(async () => {
      accidents = await API.fetch_incidents({latitude: 37, longitude: -121});
    });
</script>

<head>
    <title>HTML div</title>
</head>
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
    </div>
</body>
