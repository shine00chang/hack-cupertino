const BACKEND_URL = "";

async function get_img_url(file) {
  let file_reader = new FileReader();
  file_reader.readAsDataURL(file);
  file_reader.addEventListener("load", async () => {
    //call image uploading api
    let form_data = new FormData();
    form_data.append("image", file_reader.result);
    let resp = await fetch(BACKEND_URL+"/image", {
      method: "POST",
      body: form_data
    });
    resp = await resp.json();
    document.dispatchEvent(new CustomEvent("image_url_loaded", {
      detail: resp.image_url
    }));
  }); 
}

async function post_incident(incident_info) {
  await fetch(BACKEND_URL+"/upload", {
    method: "POST",
    body: JSON.stringify(incident_info)
  });
}
