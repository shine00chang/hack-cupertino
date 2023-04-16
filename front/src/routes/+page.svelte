<script>
  import { onMount } from 'svelte';

  let latitude;
  let longitude;

  onMount(() => {
    console.log(navigator)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords)
        latitude = pos.latitude;
        longitude = pos.longitude;
      });
    }
  })
</script>

<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
  