<script>
    import Map from "$lib/components/Map.svelte";
    import { onMount } from "svelte";
    import * as API from "$lib/api.js";

    let accidents = [];
    let loaded = false;
    let la = 37.3;
    let ln = -122.03;

    onMount(async() => {
        accidents = await API.fetch_incidents({longitude: ln, latitude: la});

        console.log(accidents);
        loaded = true; 
    });
    

</script>

<head>
    <title>HTML div</title>
</head>
<body>
    {#if loaded}
    <div style="width: 47vw; float:left; height:90vh; margin:1vw">
        {#each accidents as accident}
            <div style="width: 95%; height: 50px; border-radius: 20px; background-color: silver; margin: 10px; display: block; overflow: auto; text-align: center">
                <h3>{accident.desc}</h3>
            </div>

        {/each}
    </div>
    <div style="width: 47vw; float:right; height:90vh; margin:1vw">
        <Map accidents={accidents}/>
    </div>

    {:else}
    <p>LOADING...prayge</p>
    {/if}
</body>
