const express = require("express");
const app = express();
const controller = require("./controller.js");

app.get("/test", (req, res) => { 
  return res.json({"hey": "i just met you"});
});

app.post("/upload", async (req, res) => {
  console.log("upload request received, extracted body: ", req.body);
  let success = await controller.upload(req.body);
  return res.status(success ? 201 : 406); 
});

app.get("/by-location", async (req, res) => {
  console.log("get by location requested, still dummy tho.");
  const location = { lat: 32, lon: -121};
  let _results = await controller.getByLocation(location);
  return res.json({"compton": "average gang violence"});
});

app.listen(3000, () => {
  console.log("Listening on port: ", 3000);
});

