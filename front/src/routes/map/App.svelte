<script>
	import Map from '$lib/components/Map.svelte';
	export let ready;
</script>

<svelte:head>
	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSP-Hux39o-vrRRL-u1LYugk35jPVg1I&callback=initMap">
	</script>
</svelte:head>

<style>
:global(body) {
	padding: 0;
}
</style>

{ #if ready }
<Map></Map>
{ /if }