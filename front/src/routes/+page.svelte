<script>
  import { onMount } from "svelte";

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

  const reportHandler = (e) => {};
</script>

<div class="flex flex-row justify-center my-10">
  <form
    on:submit|preventDefault={reportHandler}
    class="flex flex-col w-96 border rounded p-5 gap-4"
  >
    <label for="title"
      >Title:
      <input name="title" type="text" value="" class="border rounded-sm" />
    </label>

    <div class="row row-col">
      <label for="desc" class="block">Description:</label>
      <textarea id="desc" name="text" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
      class="border rounded-sm w-full resize-none"></textarea>
    </div>

    <div>
      <label for="categories">Categories:</label>
      <select name="categories" class="border rounded-sm">
        <option value="">Assault and Pepper</option>
        <option value="">Sexual Assault</option>
        <option value="">Armed Assault</option>
        <option value="">Amber Alert Sighting</option>
        <option value="">Burglary</option>
      </select>
    </div>

    <button type="submit" class="border rounded-sm">Report</button>
  </form>
</div>

<style>
  #desc {
    resize: none;
  }
</style>