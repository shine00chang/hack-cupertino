<script>
    import TeamPic from "$lib/imgs/teampic.jpeg";
    import ShinePolice from "$lib/imgs/shinepolice.gif";
</script>

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
        <div id="shinebhar">
            <img id="shine-img" src={ShinePolice} alt="shine flashing police gif"/>
            <p>
                {"\"I'm a kitten! kawaii!!!!\" - Bhargav"}
            </p>
        </div>
    </div>
    <div class="print-show">
        <p>We were hired by HP to waste your ink</p>
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