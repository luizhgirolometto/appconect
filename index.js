const functions = require("firebase-functions");
const express = require("express");
const app = express();

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
    console.log("Recebido webhook:", body);
    res.sendStatus(200);
  });
});

exports.app = functions.https.onRequest(app);
