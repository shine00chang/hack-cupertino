const firebase = require("firebase-admin");
require('dotenv').config();

//"dotenv" is how we access environmental variables (a way to keep certain things secret)

firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.credentials)),
  databaseURL: process.env.databaseURL
});

//firebase.auth_module = auth;

//export the firebase obj so we can use it in other files
module.exports = firebase;
