<script>
  import { onMount } from "svelte";
  import crimes from "$lib/crime.json";

  import * as API from "$lib/api.js";
  import { goto } from "$app/navigation";
    import LatLong from "../lib/components/LatLong.svelte";
  let latitude, longitude;

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
  let category = "assault";
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

<svelte:head>
  <title>Report - Main Page</title>
  <meta name="description" content="Report incidents, and learn about safety in your community.">
  <meta name="keywords" content="Community, Safety, Crime,, Report">
</svelte:head>

<div class="flex flex-row justify-center my-10">
  <form on:submit|preventDefault={reportHandler} class="flex flex-col w-96 border rounded p-5 gap-4">
    <h1 class="text-3xl font-bold">
      Report A Crime
    </h1>

    <noscript>
      Please enable javascript for the page to work!
    </noscript>

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

    
    <LatLong {latitude} {longitude}/>

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
