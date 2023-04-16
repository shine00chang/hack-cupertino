<script>
  import { onMount } from "svelte";
  import crimes from "$lib/crime.json";
  import * as API from "$lib/api.js";
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
  let category;
  let files;
  let categories = crimes.crimes;


  const reportHandler = (e) => {
    const cb = (img_url) => {
      API.post_incident({
        title:     title,
        description: desc,
        category:  category,
        img_url:   img_url,
        longitude: longitude,
        latitude:  latitude,
        timestamp: Date.now() 
      })
    }

    const file = files[0]; 
    if (file !== undefined) {
      API.get_img_url(file, cb);
    } else {
      cb();
    }
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
      <select bind:value={category} name="categories" class="border rounded-sm">
        {#each categories as category}
          <option value="">{category}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="image">Images</label>
      <input type="file" bind:files accept="image/png, image/jpeg"/>
    </div>

    <button type="submit" class="border rounded-sm">Report</button>
  </form>
</div>

<style>
  #desc {
    resize: none;
  }
</style>
