<script>
    import TeamPic from "$lib/imgs/teampic.jpeg";
</script>

<div class="flex flex-row justify-center mt-10">
    <div id="container" class="flex flex-col border rounded-lg p-7 px-20 w-96 gap-3 content-center bg-slate-200">
        <h1 class="text-3xl font-bold">
            About
        </h1>
        <img src={TeamPic} alt="team pic" class="rounded"/>
        <p>
            {"Team Gradient: Daniel Cui, Bhargav Eranki, Shine Chang, Taisei De La Cruz"}
        </p>
        <p>
            {"\"I'm a kitten! kawaii!!!!\" - Bhargav"}
        </p>
    </div>

</div>


<style>
    #container {
        width: 40rem;
    }
</style>