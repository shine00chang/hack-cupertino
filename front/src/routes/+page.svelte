<script>
  import { onMount } from "svelte";
  import crimes from "$lib/crime.json";

  import * as API from "$lib/api.js";
  import { goto } from "$app/navigation";
  let latitude;
  let longitude;

  onMount(() => {
    API.get_location(coords => {
      latitude = coords.latitude;
      longitude = coords.longitude;
    });
  });

  let title;
  $: {
    if (title) {
      //title cannot be more than 100 chars
      title = title.slice(0, 100);
    }
  }
  let desc = "";
  let category = "none";
  let files = [];
  let categories = crimes.crimes;


  const reportHandler = (e) => {
    const cb = async (img_url) => {
      await API.post_incident({
        title:     title,
        description: desc,
        category:  category,
        img_url:   img_url,
        longitude: longitude,
        latitude:  latitude,
        timestamp: Date.now() 
      });
      goto("/map");
    }

    // const file = files[0]; 
    console.log(files)
    if (files.length >= 1) {
      API.get_img_url(files[0], cb);
    } else {
      cb();
    }
  };
</script>

<div class="flex flex-row justify-center my-10">
  <form on:submit|preventDefault={reportHandler} class="flex flex-col w-96 border rounded p-5 gap-4">
    <h1 class="text-3xl font-bold">
      Report A Crime
    </h1>

    <label for="title">
      Title:
      <input name="title" type="text" bind:value={title} class="border rounded-sm w-full p-1" required/>
    </label>

    <div class="row row-col">
      <label for="desc" class="block">Description:</label>
      <textarea id="desc" name="text" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' required
      class="border rounded-sm w-full resize-none p-1" bind:value={desc}></textarea>
    </div>

    <div>
      <label for="categories">Categories:</label>
      <select id="category-input" bind:value={category} name="categories" class="border rounded-sm">
        {#each categories as cat}
          <option value={cat}>{cat}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="image">Images:</label>
      <input type="file" bind:files accept="image/png, image/jpeg"/>
    </div>

    
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

    <button type="submit" class="border rounded-lg py-2 hover:bg-red-600 hover:text-white ease-in-out duration-100">Report</button>
  </form>
</div>

<style>
  #category-input {
    padding-left: 3px;
  }
  #desc {
    resize: none;
    max-height: 230px;
  }
</style>
