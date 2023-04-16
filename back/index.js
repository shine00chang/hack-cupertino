const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const controller = require("./controller.js");

app.get("/test", (req, res) => { 
  return res.json({"hey": "i just met you"});
});

app.post('/image', async (req, res) => {
  //req.body.image should be b64 image or something
  let image_url = controller.uploadImage(req.body.image);
  return !image_url ? res.status(500).send() : res.status(200).json({"image_url": image_url});
});

app.post("/upload", async (req, res) => {
  console.log("upload request.");
  const success = await controller.upload(req.body);
  return res.status(success ? 201 : 406).send(); 
});

app.get("/by-location", async (req, res) => {
  console.log("get by location requested.");
  let results = await controller.getByLocation(req.query);
  return results === false ? res.status(400).send() : res.json(results);
});

app.listen(3000, () => {
  console.log("Listening on port: ", 3000);
});

