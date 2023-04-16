const BACKEND_URL = "https://cupertino-hacks.the-yiga.repl.co";
//const BACKEND_URL = "http://localhost:3000";

export async function fetch_incidents (location) {
  console.log("Fetching from location: ", location);
  return await fetch(BACKEND_URL+`/by-location?longitude=${location.longitude}&latitude=${location.latitude}`)
    .then(res => res.json())
    .then(res => {
      console.log("by location fetch: ", res);
      return res;
    })
    .catch(e => {
      console.error("error on fetch", e);
      return [];
    });
}

export function get_img_url(file, cb = () => {}) {
  let file_reader = new FileReader();
  file_reader.readAsDataURL(file);
  file_reader.onload = async () => {    //call image uploading api
    let resp = await fetch(BACKEND_URL+"/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({image: file_reader.result.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "").replace("data:image/jpg;base64,", "")}) 
    });

    resp = await resp.json();
    console.log(resp);
    cb(resp.image_url);
  }; 
}

export async function post_incident(incident_info) {
  await fetch(BACKEND_URL+"/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(incident_info)
  });
}
