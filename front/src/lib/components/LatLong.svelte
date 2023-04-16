<script>
    export let latitude, longitude;
</script>

<div>
    {#if latitude === undefined || longitude === undefined}
        <div>
        <div class="w-3 h-3 rounded-full bg-red-600 border border-red-600 inline-block animate-pulse"></div>
        finding your location...
        </div>
    {:else}
        <div>
        <div class="w-3 h-3 rounded-full bg-green-600 border border-green-600 inline-block animate-pulse"></div>
        latitude: {latitude.toFixed(3)}, longitude: {longitude.toFixed(3)}
        </div>
    {/if}
</div>