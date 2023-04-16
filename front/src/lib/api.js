const BACKEND_URL = "";

async function get_img_url(img_b64) {
  //call image uploading api
}

async function post_incident(incident_info) {
  await fetch(BACKEND_URL+"/upload", {
    method: "POST",
    body: JSON.stringify(incident_info)
  });
}
