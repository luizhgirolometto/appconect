const express = require("express");
const app = express();
const fs = require ('fs');
let url = 'https://arduinocontrolpage-default-rtdb.europe-west1.firebasedatabase.app/test/int/.json';


const data = {
  int: 1,
}

//firebase
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const serviceAccount = require('./arduinocontrolpage-firebase-adminsdk-50uhx-681687aac4.json');
const { database } = require("firebase-admin");
const { getDatabase } = require ('firebase-admin/database')


admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://arduinocontrolpage-default-rtdb.europe-west1.firebasedatabase.app/'
});


const db = admin.database();
const ref = db.ref('test');

function ligamotor(ref){

  const data = new Date();

  console.log(data);

  app.put(ref.set({
    int: 1,
    date: data.toString(),
  })

  .catch((err) => {
    console.log('Error writing document', err);
  }));

  return "enviado"
}

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
    

    ligamotor(ref);

    console.log("Recebido webhook:", body);
    res.sendStatus(200);

    
     
   
  });

  console.log("caiu aqui")

});

app.listen(process.env.PORT || 3000)
exports.app = functions.https.onRequest(app);
