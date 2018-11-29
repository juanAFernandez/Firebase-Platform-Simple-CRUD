const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-platformsimplecrud.firebaseio.com",
});

var db = admin.firestore();

require('./routes/people/routes')(app, db);

const api = functions.https.onRequest(app)

module.exports = {
    api
}
