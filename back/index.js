const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
  origin: "*"
}));

const controller = require("./controller.js");

app.get("/test", (req, res) => { 
  return res.json({"hey": "i just met you"});
});

app.post('/image', async (req, res) => {
  if (!req.body.image) return res.status(500).send();
  //req.body.image should be b64 image or something
  let image_url = await controller.uploadImage(req.body.image);
  console.log(image_url)
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

