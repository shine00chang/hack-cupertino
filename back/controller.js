const firebase = require("./firebase.js");

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
  if (typeof body.category !== "string") return false;
  if (typeof body.img_url !== "string" && typeof body.img_url !== "undefined") return false;
  if (typeof body.description !== "string") return false;
  if (typeof body.timestamp !== "number") return false;
  if (!body.coords) return false;
  if (typeof body.coords.longitude !== "number" || typeof body.coords.latitude !== "number") return false;
  return {
    category: body.category,
    img_url: body.img_url,
    description: body.description,
    coords: {
      longitude: body.longitude,
      latitude: body.latitude
    }
  };
}

exports.upload = (body) => {
  console.log("controller fetch() called.");
  body = validateBody(body);
  // TODO
}

exports.getByLocation = (location) => {
  console.log("controller getByLocation() called.");
  // TODO
}
