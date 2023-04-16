const fetch = require("node-fetch");
const firebase = require("./firebase.js");
const db = firebase.database();
const incidentsRef = db.ref('incidents');
require('dotenv').config();

/*schema for uploads
{
  title: string,
  category: string,
  img_url: string?,
  description: string,
  longitude: number,
  latitude: number
  timestamp: number (unix timestamp)
}
*/

function validateIncident(body) {
  if (typeof body.category !== "string")    {console.error("no category"); return false;}
  if (typeof body.img_url !== "string" && typeof body.img_url !== "undefined") {console.error("invalid img_url"); return false;}
  if (body.img_url === undefined) {
    body.img_url = "";
  }
  if (typeof body.description !== "string") {console.error("no description"); return false;}
  if (typeof body.timestamp !== "number")   {console.error("no timestamp"  ); return false;}
  if (typeof body.longitude !== "number" || typeof body.latitude !== "number") {console.error("no lat or lon");   return false;}
  return {
    category: body.category,
    img_url:  body.img_url,
    description: body.description,
    longitude: body.longitude,
    latitude:  body.latitude
  };
}

function validateLocation(query) {
  if (typeof parseInt(query.longitude) !== "number") {console.error("no longitude"); return false;}
  if (typeof parseInt(query.latitude)  !== "number") {console.error("no latitude "); return false;}
  return { 
    longitude: parseInt(query.longitude),
    latitude:  parseInt(query.latitude),
  };
}

/* Use this to test:
fetch("/upload", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        category: "gang violence",
        img_url: "https://stkittsvet.co.uk/wp-content/uploads/2013/11/senior-rabbit.jpg",
        description: "the wrong signs at the wrong hood :pensive:",
        longitude: 32,
        latitude: -121,
        timestamp: Date.now()
    })
}).then(res => {
    console.log(res);
})
 */
exports.upload = async (body) => {
  console.log("controller fetch() called.");
  const incident = validateIncident(body);
  if (incident === false) return false;
  await incidentsRef.push(incident);
  return true;
}


/* Use this to test: 
fetch("/by-location?longitude=32&latitude=-121").then(res => res.json()).then(res => console.log(res));
 */ 
exports.getByLocation = async (query) => {
  console.log("controller getByLocation() called.");
  const location = validateLocation(query);
  if (location === false) return false;
  console.log(location);
  const result = []; 
  const D = 5;
  // Sort & Filter by Longitude
  // - For each
  //   - Filter by Latitude
  //   - Add to result.
  return await incidentsRef
    .orderByChild("longitude")
    .startAt(location.longitude - D)
    .endAt  (location.longitude + D)
    .once("value")
    .then(async snapshot => {
      const incidents = snapshot.val();
      console.log(incidents);  
      const result = [];
      for (let id in incidents) {
        console.log(incidents[id]);
        if (incidents[id].latitude > location.latitude - D &&
            incidents[id].latitude < location.latitude + D)
          result.push(incidents[id]); 
      }
      return result;
    })
    .catch(e => {
      console.error("lon failed", e); 
      return false;
    });
}

//image is base64 string or something
exports.uploadImage = async (image) => {
  let form_data = new URLSearchParams();
  form_data.append("image", image)
  return await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${process.env.clientId}`
      },
      body: form_data
    })
    .then(async res => {
      res = await res.json();
      console.log(res);
      return res.data.link;
    })
    .catch(e => {
      console.error(e);
      return false;
    });
}
