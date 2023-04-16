<script>
    import TeamPic from "$lib/imgs/teampic.jpeg";
    import ShinePolice from "$lib/imgs/shinepolice.gif";
    import ShinePolicemen from "$lib/imgs/shinepolicemen.png";
    
    let shine_titles = ["hello o_o", "hows it going", "assault is the threat to inflict physical harm, while the battery is the actual harm", "cupertino has 4 twin cities"];
    let shine_title = "hello o_o";
    setInterval(function() {
        shine_title = shine_titles[Math.floor(Math.random() * shine_titles.length)];
    }, 5000);
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="flex flex-row justify-center mt-10" id="about">
    <div id="container" class="flex flex-col border rounded-lg p-7 px-20 w-96 gap-3 content-center bg-slate-200">
        <h1 class="text-3xl font-bold">
            About
        </h1>
        <img src={TeamPic} alt="team pic" class="rounded"/>
        <p>
            {"Team Gradient: Daniel Cui, Bhargav Eranki, Shine Chang, Taisei De La Cruz"}
        </p>
        <p>
            {"We made this project with the goal of helping spread awareness of problems in communities, in a transparent way."}
        </p>
        <p>
            {"The frontend was made using Svelte and Tailwind, while backend was a Express.js server connected to a Firebase backend. We also used the geolocation, Imgur, and Google Maps APIs."}
        </p>
        <div id="shinebhar">
            <img id="shine-img" title={shine_title} src={ShinePolice} alt="shine flashing police gif"/>
        </div>
    </div>
    <div class="print-show">
        <p>We were hired by HP to waste your ink</p>
        <img src={ShinePolicemen} alt="shine police line"/>
    </div>
</div>


<style>
    #about {
        margin-left: 10px;
        margin-right: 10px;
    }
    #shine-img {
        width: 20%;
    }
    .print-show {
        display: none;
    }
    #container {
        width: 40rem;
    }
    #shinebhar {
        text-align: center;
        margin: auto;
    }
    #shinebhar img {
        margin: auto;
    }
    @media print {
        .print-show {
            display: block;
        }
    }
</style>