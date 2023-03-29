const express = require("express");
const app = express();

//firebase
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const serviceAccount = require('./arduinocontrolpage-firebase-adminsdk-50uhx-681687aac4.json');


app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/webhook", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
  
    const database = admin.database();
    const ref = database.ref('test/int');
    ref.set(1);
    
    console.log("Recebido webhook:", body);
    res.sendStatus(200);

  });
});

app.listen(process.env.PORT || 3000)
exports.app = functions.https.onRequest(app);
