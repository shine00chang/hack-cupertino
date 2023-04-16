<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Map from "$lib/components/Map.svelte";

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

<Navbar/>

<head>
    <title>HTML div</title>
</head>
<body>
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
</body>