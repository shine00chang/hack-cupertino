<script>
    import Map from "$lib/components/Map.svelte";
    import { onMount } from "svelte";
    import * as API from "$lib/api.js";

    let accidents = [];
    let loaded = false;
    let la = 37.3;
    let ln = -122.03;

    onMount(async() => {
        //accidents = await API.fetch_incidents({longitude: ln, latitude: la});
        
        for (let i = 0; i < 10; i++) {
            accidents.push({lat: la+Math.random()/10.0, lng: ln+Math.random()/10.0});
        }

        console.log(accidents);
        loaded = true; 
    });
    

</script>

<head>
    <title>HTML div</title>
</head>
<body>
    {#if loaded}

    <style>
        @media (max-width: 900px) {
          #hidden-mobile {
            display: none;
          }
        }
        
        @media (max-width: 700px) {
            #expand-mobile {
                min-width: 90vh
            }
        }
      </style>

    <div style="width: 47vw; float:left; height:90vh; margin:1vw" id="hidden-mobile">
        {#each accidents as accident}
            <Accordion>
                {#each accidents as accident}
                    <AccordionItem key={accident.key}>
                        <div style="width: 95%; height: 50px; border-radius: 20px; background-color: silver; margin: 10px; display: block; overflow: auto; text-align: center">
                            <h3>{accident.desc}</h3>
                        </div>
                    </AccordionItem>
                {/each}
            </Accordion>
        {/each}
    </div>
    <div style="width: 47vw; float:right; height:90vh; margin:1vw" id="expand-mobile">
        <Map accidents={accidents}/>
    </div>

    {:else}
    <p>LOADING...prayge</p>
    {/if}
</body>
