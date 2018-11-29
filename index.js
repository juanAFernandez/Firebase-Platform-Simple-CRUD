const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const joi = require('joi')
const app = express();
var schemas = require('./routes/schemas');

// var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-3907c.firebaseio.com",
    storageBucket: "gs://test-3907c.appspot.com"
});

// const settings = { timestampsSnapshots: true }
var db = admin.firestore();

// // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = admin.storage();
// console.log(Object.values(storage))

// Nice here.

// var storageRef = storage.ref(); // Pero esto faya.


// Vamos a intentar conectarnos a storage de google directament.
// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();




// var storageRef = database_db.ref();
// console.log(Object.values(storageRef))
// console.log(Object.getOwnPropertyNames(storageRef).filter(function (p) {
//     return typeof Math[p] === 'function';
// }));


// // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = admin.storage();

app.get('/applicants', function (req, res) {
    res.json([{ 'name': 'nombre 1' }, { 'name': 'nombre 2' }]);
});


app.post('/images', function (req, res) {

    console.log(req)
    console.log(req.file)
    storage
        .bucket('gs://test-3907c.appspot.com')
        .upload(req.body)
        .then(() => {
            console.log(`upploaded to.`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });


    res.end("yes");



});

require('./routes/people')(app, db);

/**
 * Adding new file to the storage
 */

//
// var mountainsRef = storageRef.child('mountains.jpg');


app.post('/upload', function (req, res) {
    console.log('Upload Image');

    let file = req.file;
    if (file) {
        uploadImageToStorage(file).then((success) => {
            res.status(200).send({
                status: 'success'
            });
        }).catch((error) => {
            console.error(error);
        });
    }
});

const api = functions.https.onRequest(app)

module.exports = {
    api
}
