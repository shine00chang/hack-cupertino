<script>
    export let incident;

    let opened = false;
    let minElapsed = parseInt(Math.floor((Date.now() - incident.timestamp) / 1000 % 60));
    let hrsElapsed = parseInt(Math.floor((Date.now() - incident.timestamp) / 1000 / 60 % 60));
    let daysElapsed = parseInt(Math.floor((Date.now() - incident.timestamp) / 1000 / 60 / 60 / 24));

    let text = "";
    if (minElapsed > 0) {
        text = minElapsed + ((minElapsed === 1) ? " minute ago" : " minutes ago");
    } else if (hrsElapsed > 0) {
        text = hrsElapsed + ((hrsElapsed === 1) ? " hour ago" : " hours ago");
    } if (daysElapsed > 0) {
        text = daysElapsed + ((daysElapsed === 1) ? " day ago" : " days ago");
    }

    const clickHandler = () => {
        opened = !opened;
    }
</script>

<button class="border p-4 rounded flex flex-col gap-2" on:click={clickHandler}>
    <h1 class="text-lg font-bold">
        {incident.title}
    </h1>
   
    {#if opened}
        <div class="text-left">
            {#if incident.img_url !== ""}
                <img src={incident.img_url} alt="" class="w-72 rounded mt-2"/>
            {/if}
            <h3 class="mt-2">Description:</h3>
            <p>{incident.description}</p>
        </div>
        
    {/if}

    <div class="self-end flex flex-row gap-2 mt-2">
        <span class="border border-slate-800 rounded-lg bg-slate-300 px-1">{incident.category}</span>
        <span>{ text }</span>
    </div>
</button>