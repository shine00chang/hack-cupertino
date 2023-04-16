const express = require("express");
const app = express();
const controller = require("./controller.js");

app.get("/test", (req, res) => { 
  return res.json({"hey": "i just met you"});
});

app.post("/upload", (req, res) => {
  console.log("upload request received, extracted body: ", req.body);
  let _success = await controller.upload(req.body);
  return res.status(201); 
});

app.get("/by-location", (req, res) => {
  console.log("get by location requested, still dummy tho.");
  const location = { lat: 32, lon: -121};
  let _results = await controller.getByLocation(location);
  return res.json({"compton": "average gang violence"});
});

app.listen(3000, () => {
  console.log("Listening on port: ", 3000);
});

