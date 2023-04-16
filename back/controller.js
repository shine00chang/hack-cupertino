const { fetch } = require("node-fetch");
const firebase = require("./firebase.js");
const db = firebase.database();
const incidentsRef = db.ref('incidents');
require('dotenv').config();

/*schema for uploads
{
  category: string,
  img_url: string?,
  description: string,
  coords: {
    longitude: number,
    latitude: number
  },
  timestamp: number (unix timestamp)
}
*/

function validateBody(body) {
  if (typeof body.category !== "string") {console.error("no category"); return false;}
  if (typeof body.img_url !== "string" && typeof body.img_url !== "undefined") {console.error("invalid img_url"); return false;}
  if (typeof body.description !== "string") {console.error("no description"); return false;}
  if (typeof body.timestamp !== "number") {console.error("no timestamp"); return false;}
  if (!body.coords) {console.error("no coords"); return false;}
  if (typeof body.coords.longitude !== "number" || typeof body.coords.latitude !== "number") {console.error("no lat or lon"); return false;}
  return {
    category: body.category,
    img_url: body.img_url,
    description: body.description,
    coords: {
      longitude: body.coords.longitude,
      latitude:  body.coords.latitude
    }
  };
}

exports.upload = async (body) => {
  console.log("controller fetch() called.");
  const incident = validateBody(body);
  if (incident === false) return false;
  await incidentsRef.push(incident);
  return true;
}

exports.getByLocation = async (location) => {
  console.log("controller getByLocation() called.");
  // TODO
  
  return {"lala~": "dada"};
}

//image is base64 string or something
exports.uploadImage = async (image) => {
  let form_data = new URLSearchParams();
  form_data.append("image", image)
  let resp 
  try {
    resp = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    header: {
      Authorization: `Client-ID ${process.env.clientId}`
    },
    body: form_data
    });
    resp = await resp.json();
    console.log(resp);
    return resp.data.link;
  } catch (e) {
    console.log(e);
    return false;
  }
}
