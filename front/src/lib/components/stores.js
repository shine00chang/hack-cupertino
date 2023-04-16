import {readable} from "svelte/store";
import {writable} from "svelte/store";
import * as API from "$lib/api.js";

export const accidents = readable([], async function (set) {
  let accidents = await API.fetch_incidents({longitude: 37, latitude: -121});
  set(accidents);
});

export const showInfo = writable(false);
export const trackedPos = writable({});