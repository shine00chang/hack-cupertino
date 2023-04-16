<script>
  import { onMount } from "svelte";
  import crimes from "$lib/crime.json";

  let latitude;
  let longitude;

  onMount(() => {
    console.log(navigator);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords);
        latitude = pos.latitude;
        longitude = pos.longitude;
      });
    }
  });

  let title, desc;
  let categories = crimes.crimes;


  const reportHandler = (e) => {
    
  };
</script>

<div class="flex flex-row justify-center my-10">
  <form on:submit|preventDefault={reportHandler} class="flex flex-col w-96 border rounded p-5 gap-4">
    <label for="title">
      Title:
      <input name="title" type="text" bind:value={title} class="border rounded-sm" />
    </label>

    <div class="row row-col">
      <label for="desc" class="block">Description:</label>
      <textarea id="desc" name="text" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
      class="border rounded-sm w-full resize-none" bind:value={desc}></textarea>
    </div>

    <div>
      <label for="categories">Categories:</label>
      <select name="categories" class="border rounded-sm">
        {#each categories as category}
          <option value="">{category}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="image">Images</label>
      <input type="file" accept="image/png, image/jpeg"/>
    </div>

    <button type="submit" class="border rounded-sm">Report</button>
  </form>
</div>

<style>
  #desc {
    resize: none;
  }
</style>