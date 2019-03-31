"use strict";
/*---------------ACTOR----------------------*/
var mongoose = require("mongoose"),
    Actor = mongoose.model("Actors"),
    Finder = mongoose.model("Finders"),
    admin = require('firebase-admin'),
    authController = require('./authController');


exports.actors_json_url = function (req, res) {

    const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
    const JSONStream = require('JSONStream');
    const request = require('request');

    var dbURL, collection, sourceURL, batchSize, parseString = null;
    var response = '';

    if (req.query.dbURL && req.query.collection && req.query.sourceURL) {
        dbURL = req.query.dbURL;
        collection = req.query.collection;
        sourceURL = req.query.sourceURL;
        if (req.query.batchSize) batchSize = req.query.batchSize; else batchSize = 1000;
        if (req.query.parseString) parseString = req.query.parseString; else parseString = '*.*';

        // where the data will end up
        const outputDBConfig = { dbURL: dbURL, collection: collection, batchSize: batchSize };

        // create the writable stream
        const writableStream = streamToMongoDB(outputDBConfig);

        // create readable stream and consume it
        console.log('starting streaming the json from url: ' + sourceURL + ', to dbURL: ' + dbURL + ', into the collection: ' + collection);
        request(sourceURL)
            .pipe(JSONStream.parse(parseString))
            .pipe(writableStream)
            .on('finish', function () {
                response += 'All documents stored in the collection!';
                console.log(response);
                res.send(response);
            })
            .on('error', function (err) {
                console.log(err);
                res.send(err);
            })
    }
    else {
        if (req.query.dbURL == null) response += 'A mandatory dbURL parameter is missed.\n';
        if (req.query.collection == null) response += 'A mandatory collection parameter is missed.\n';
        if (req.query.sourceURL == null) response += 'A mandatory sourceURL parameter is missed.\n';
        console.log(response);
        res.send(response);
    }

};

exports.actors_json_insertMany = function (req, res) {
    //var dbURL, collection, sourceURL, batchSize, parseString = null;
    var mongooseModel, sourceFile = null;
    var response = '';

    if (req.query.mongooseModel && req.query.sourceFile) {
        mongooseModel = req.query.mongooseModel;
        sourceFile = req.query.sourceFile;
        //if (req.query.batchSize) batchSize = req.query.batchSize; else batchSize = 1000;
        //if (req.query.parseString) parseString = req.query.parseString; else parseString = '*.*';

        var json = require(sourceFile);
        var mongoose = require('mongoose'),
            collectionModel = mongoose.model(mongooseModel);

        // where the data will end up
        console.log('inserting the json from file: ' + sourceFile + ', into the Model: ' + mongooseModel);
        collectionModel.insertMany(json, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                response += 'All documents stored in the collection!';
                console.log(response);
                res.send(response);
            }
        });
    }
    else {
        if (req.query.mongooseModel == null) response += 'A mandatory mongooseModel parameter is missed.\n';
        if (req.query.sourceFile == null) response += 'A mandatory sourceFile parameter is missed.\n';
        console.log(response);
        res.send(response);
    }

};

exports.actors_json_fs = function (req, res) {

    const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
    const JSONStream = require('JSONStream');
    const fs = require('fs');

    //var dbURL, collection, sourceURL, batchSize, parseString = null;
    var dbURL, collection, sourceFile, batchSize, parseString = null;
    var response = '';

    if (req.query.dbURL && req.query.collection && req.query.sourceFile) {
        dbURL = req.query.dbURL;
        collection = req.query.collection;
        sourceFile = req.query.sourceFile;
        if (req.query.batchSize) batchSize = req.query.batchSize; else batchSize = 1000;
        if (req.query.parseString) parseString = req.query.parseString; else parseString = '*.*';

        // where the data will end up
        const outputDBConfig = { dbURL: dbURL, collection: collection, batchSize: batchSize };

        // create the writable stream
        const writableStream = streamToMongoDB(outputDBConfig);

        // create readable stream and consume it
        console.log('starting streaming the json from file: ' + sourceFile + ', to dbURL: ' + dbURL + ', into the collection: ' + collection);
        fs.createReadStream(sourceFile) // './myJsonData.json'
            .pipe(JSONStream.parse(parseString))
            .pipe(writableStream)
            .on('finish', function () {
                response += 'All documents stored in the collection!';
                console.log(response);
                res.send(response);
            })
            .on('error', function (err) {
                console.log(err);
                res.send(err);
            })
    }
    else {
        if (req.query.dbURL == null) response += 'A mandatory dbURL parameter is missed.\n';
        if (req.query.collection == null) response += 'A mandatory collection parameter is missed.\n';
        if (req.query.sourceFile == null) response += 'A mandatory sourceFile parameter is missed.\n';
        console.log(response);
        res.send(response);
    }

};

exports.list_all_actors = function (req, res) {
    //Check if the role param exist
    var roleName;
    if (req.query.role) {
        roleName = req.query.role;
    }
    //Adapt to find the actors with the specified role
    Actor.find({}, function (err, actors) {
        if (err) {
            res.send(err);
        } else {
            res.status(200);
            res.json(actors);
        }
    });
};

exports.create_an_actor = function (req, res) {
    var new_actor = new Actor(req.body);
    var new_finder = new Finder();
    /* if((new_actor.role.includes('MANAGER')) and not logged as admin){
      error
    }  */
    /*if (!checkSponsorFields(new_actor)) {
        res
            .status(400)
            .send("BAD REQUEST: A non-sponsor actor cannot have a banner or link");
    }*/
    new_actor.save(function (err, actor) {
        if (err) {
            console.log(err)
            res.status(500).send(err);
        } else {
            if (new_actor.role.includes("EXPLORER")) {
                new_finder.explorer = new_actor._id;
                new_finder.save(function (err2, finder) {
                    if (err2) {
                        console.log(err2)
                        res.status(500).send(err2);
                    } else {
                        res.status(201);
                        res.json(actor);
                        res.json(finder);
                    }
                });
            } else {
                res.status(201);
                res.json(actor);
            }

        }

    });
};

exports.read_an_actor = function (req, res) {
    console.log(req);
    Actor.findById(req.params.actorId, function (err, actor) {
        console.log(actor);
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200);
            res.json(actor);
        }
    });
};

exports.update_an_actor = function (req, res) {
    //Customer and Manager can update theirselves, administrators can update any actor
    Actor.findById(req.params.actorId, async function (err, actor) {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log('actor: ' + actor);
            //var idToken = req.headers['idtoken']; //WE NEED the FireBase custom token in the req.header['idToken']... it is created by FireBase!!
            var idToken = actor.idToken;
            if (actor.role.includes('EXPLORER') || actor.role.includes('MANAGER') || actor.role.includes('SPONSOR')) {
                var authenticatedUserId = await authController.getUserId(idToken);
                if (authenticatedUserId == req.params.actorId) {
                    Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200);
                            res.json(actor);
                        }
                    });
                } else {
                    res.status(403); //Auth error
                    res.send('The Actor is trying to update an Actor that is not himself!');
                }
            } else if (actor.role.includes('ADMINISTRATOR')) {
                Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200);
                        res.json(actor);
                    }
                });
            } else {
                res.status(405); //Not allowed
                res.send('The Actor has unidentified roles');
            }
        }
    });

};

exports.delete_an_actor = function (req, res) {
    //Check that the user is an Administrator or the proper Actor and if not: res.status(403); "an access token is valid, but requires more privileges"
    Actor.findById({ _id: req.params.actorId }, function (err, actor) {
        if (err) {
            res.send(err);
        } else {
            actor.deleted = true;
            actor.save(function (err, actor) {
                if (err) {
                    res.send(err);
                } else {
                    res.status(200);
                    res.json({ message: "Actor successfully deleted" });
                }
            });
        }
    });
};

exports.login_an_actor = async function (req, res) {
    console.log('starting login an actor');
    var emailParam = req.query.email;
    var password = req.query.password;

    Actor.findOne({ email: emailParam }, function (err, actor) {
        if (err) { res.status(500).send(err); }

        // No actor found with that email as username
        else if (!actor) {
            res.status(401); //an access token isn’t provided, or is invalid
            res.json({ message: 'forbidden', error: err });
        } else if ((actor.role.includes('MANAGER')) && (actor.validated == false)) {
            res.status(403); //an access token is valid, but requires more privileges
            res.json({ message: 'forbidden', error: err });
        } else {
            // Make sure the password is correct
            //console.log('En actor Controller pass: '+password);
            actor.verifyPassword(password, async function (err, isMatch) {
                if (err) {
                    res.status(500).send(err);
                }

                // Password did not match
                else if (!isMatch) {
                    res.status(401); //an access token isn’t provided, or is invalid
                    res.json({ message: 'forbidden', error: err });
                } else {
                    try {
                        var customToken = await admin.auth().createCustomToken(actor.email);
                    } catch (error) {
                        console.log("Error creating custom token:", error);
                    }
                    actor.customToken = customToken;
                    Actor.findOneAndUpdate({ _id: actor._id }, actor, { new: true }, function (err, actor) {
                        if (err) {
                            console.log(err)
                            res.status(500).send(err);
                        } else {
                            console.log('Login Success... sending JSON with custom token');
                            res.status(200).json(actor);
                        }
                    });
                }
            });
        }
    });
};

/*let checkSponsorFields = function(actor) {

};*/