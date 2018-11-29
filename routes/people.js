//  People route handlers definition file //
const express = require('express');
const joi = require('joi')
var schemas = require('./schemas');

module.exports = function (app, db) {

    app.get('/people', function (req, res) {
        var peopleRef = db.collection('people');
        var query = peopleRef.get()
            .then(snapshot => {
                // snapshot is a QuerySnapshot object.
                // A QuerySnapshot contains 0 or + QueryDocumentSnapshot
                var returnArr = []
                snapshot.forEach(function (childSnapshot) {
                    var tmpDoc = childSnapshot.data()
                    tmpDoc.id = childSnapshot.id
                    returnArr.push(tmpDoc)
                });

                res.json(returnArr)
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    });

    app.get('/people/:peopleId', function (req, res) {
        var personRef = db.collection('people').doc(req.params.peopleId);
        var getDoc = personRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    docToReturn = doc.data()
                    docToReturn.id = doc.id
                    res.json(docToReturn)
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    });

    app.delete('/people/:peopleId', function (req, res) {
        var personRef = db.collection('people').
            doc(req.params.peopleId).delete().then(doc => { res.end(); })
    });

    app.put('/people/:peopleId', function (req, res) {
        joi.validate(req.body, schemas.personDataSchema, (err, value) => {

            if (err) {

                // send a 422 error response if validation fails
                res.status(422).json({
                    status: 'error',
                    message: 'Invalid request data',
                    data: req.body
                });

            } else {

                var personRef = db.collection('people').doc(req.params.peopleId);
                var updateSingle = personRef.update(req.body).then(
                    ref => {
                        res.json({
                            status: 'success',
                            message: 'Data updated successfully',
                        })
                    }
                )


            }
        })
    });

    app.post('/people', function (req, res) {

        joi.validate(req.body, schemas.personDataSchema, (err, value) => {

            if (err) {

                // send a 422 error response if validation fails
                res.status(422).json({
                    status: 'error',
                    message: 'Invalid request data',
                    data: req.body
                });

            } else {

                var data = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name
                };

                // Add a new document in collection "cities" with ID 'LA'
                var setDoc = db.collection('people').add(data).then(
                    ref => {
                        res.json({
                            status: 'success',
                            message: 'Data saved successfully',
                            data: data,
                            id: ref.id
                        })
                    }
                )
            }

        });


    });

}