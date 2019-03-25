"use strict";
/*---------------TRIP----------------------*/
var mongoose = require("mongoose"),
    Trip = mongoose.model("Trips"),
    Finder = mongoose.model("Finders");

exports.list_all_trips = function(req, res) {
    Trip.find({}, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            res.json(trip);
        }
    });
};

exports.create_a_trip = function(req, res) {
    var new_trip = new Trip(req.body);
    new_trip.save(function(error, trip) {
        if (error) {
            res.send(error);
        } else {
            res.json(trip);
        }
    });
};

exports.read_a_trip = function(req, res) {
    Trip.findById(req.params.tripId, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            res.json(trip);
        }
    });
};

exports.update_a_trip = function(req, res) {
    Trip.findById(req.params.tripId, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            Trip.findOneAndUpdate({ _id: req.params.tripId },
                req.body, { new: true },
                function(err, trip) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(trip);
                    }
                }
            );
        }
    });
};

exports.delete_a_trip = function(req, res) {
    Trip.remove({
            _id: req.params.tripId
        },
        function(err, trip) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: "Trip successfully deleted" });
            }
        }
    );
};

exports.list_an_actor_trips = function(req, res) {
    res.sendStatus(200);
};

//Receives Finder id
exports.search_trips = function(req, res) {
    //In further version of the code we will:
    //1.- control the authorization in order to include deleted items in the results if the requester is an Administrator.
    var query = {};

    Finder.findById(req._id, function(err, Finder) {
        if (err) {
            res.send(err);
        } else {
            finder = Finder;
        }
    });
    console.log(finder);

    if (finder.keyword) {
        query.$text = { $search: finder.keyword };
    }
    if (finder.minimumPrice) {
        query.price = { $gte: finder.minimumPrice }
    }
    if (finder.maximumPrice) {
        query.price = { $lte: finder.maximumPrice }
    }
    if (finder.startDate) {
        query.startDate = finder.startDate;
    }
    if (finder.endDate) {
        query.endDate = finder.endDate;
    }

    query.deleted = false;

    var skip = 0;
    if (req.query.startFrom) {
        skip = parseInt(req.query.startFrom);
    }
    var limit = 0;
    if (req.query.pageSize) {
        limit = parseInt(req.query.pageSize);
    }

    var sort = "";
    if (req.query.reverse == "true") {
        sort = "-";
    }
    if (req.query.sortedBy) {
        sort += req.query.sortedBy;
    }

    console.log("Query: " + query + " Skip:" + skip + " Limit:" + limit + " Sort:" + sort);

    Trip.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(function(err, trip) {
            console.log('Start searching trips');
            if (err) {
                res.send(err);
            } else {
                res.json(trip);
            }
            console.log('End searching trips');
        });
};

//Receives Keyword
exports.list_trips_by_keyword_body = function(req, res) {
    var query = {};

    query.$text = { $search: req.body.keyword };

    query.deleted = false;

    var skip = 0;
    if (req.query.startFrom) {
        skip = parseInt(req.query.startFrom);
    }
    var limit = 0;
    if (req.query.pageSize) {
        limit = parseInt(req.query.pageSize);
    }

    var sort = "";
    if (req.query.reverse == "true") {
        sort = "-";
    }
    if (req.query.sortedBy) {
        sort += req.query.sortedBy;
    }

    console.log("Query: " + query + " Skip:" + skip + " Limit:" + limit + " Sort:" + sort);

    Trip.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(function(err, trip) {
            console.log('Start searching trips');
            if (err) {
                res.send(err);
            } else {
                res.json(trip);
            }
            console.log('End searching trips');
        });
};

//Receives Keyword
exports.list_trips_by_keyword = function(req, res) {
    var query = {};

    query.$text = { $search: req.params.keyword };

    query.deleted = false;

    var skip = 0;
    if (req.query.startFrom) {
        skip = parseInt(req.query.startFrom);
    }
    var limit = 0;
    if (req.query.pageSize) {
        limit = parseInt(req.query.pageSize);
    }

    var sort = "";
    if (req.query.reverse == "true") {
        sort = "-";
    }
    if (req.query.sortedBy) {
        sort += req.query.sortedBy;
    }

    console.log("Query: " + query + " Skip:" + skip + " Limit:" + limit + " Sort:" + sort);

    Trip.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(function(err, trip) {
            console.log('Start searching trips');
            if (err) {
                res.send(err);
            } else {
                res.json(trip);
            }
            console.log('End searching trips');
        });
};

exports.cancel_trip = function(req, res) {
    //req.query.reason is the value for cancelationReason. 
    res.sendStatus(200);
};