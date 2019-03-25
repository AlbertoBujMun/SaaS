'use strict';

var mongoose = require('mongoose'),
    TripStage = mongoose.model('TripStage');

exports.list_all_tripStages = function(req, res) {
    TripStage.find({}, function(err, tripStage) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(tripStage);
        }
    });
};

exports.list_my_tripStages = function(req, res) {
    TripStage.find(function(err, tripStages) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(tripStages);
        }
    });
};

exports.search_tripStages = function(req, res) {
    var query = {};
    //if clerkId is null, i.e. parameter is not in the URL, the search retrieves orders not assined to any clerk
    //else, the search retrieves orders assined to the specified clerk
    query.clerk = req.query.clerkId;

    if (req.query.cancelled == "true") {
        //retrieving orders with a cancelationMoment
        query.cancelationMoment = { $exists: true }
    }
    if (req.query.cancelled == "false") {
        //retrieving orders without a cancelationMoment
        query.cancelationMoment = { $exists: false };
    }

    if (req.query.delivered == "true") {
        //retrieving orders with a deliveryMoment
        query.deliveryMoment = { $exists: true }
    }
    if (req.query.delivered == "false") {
        //retrieving orders without a deliveryMoment
        query.deliveryMoment = { $exists: false };
    }

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

    TripStage.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(function(err, tripStage) {
            console.log('Start searching orders');
            if (err) {
                res.send(err);
            } else {
                res.json(tripStage);
            }
            console.log('End searching orders');
        });

};


exports.create_a_tripStage = function(req, res) {
    //Check that user is a Customer and if not: res.status(403); "an access token is valid, but requires more privileges"
    var new_tripStage = new TripStage(req.body);
    new_tripStage.save(function(err, tripStage) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.status(422).send(err);
            } else {
                res.status(500).send(err);
            }
        } else {

            res.json(tripStage);
        }
    });
};


exports.read_an_order = function(req, res) {
    TripStage.findById(req.params.orderId, function(err, order) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(order);
        }
    });
};


exports.update_an_order = function(req, res) {
    //Check if the order has been previously assigned or not
    //Assign the order to the proper clerk that is requesting the assigment
    //when updating delivery moment it must be checked the clerk assignment and to check if it is the proper clerk and if not: res.status(403); "an access token is valid, but requires more privileges"
    TripStage.findById(req.params.orderId, function(err, order) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.status(422).send(err);
            } else {
                res.status(500).send(err);
            }
        } else {
            Order.findOneAndUpdate({ _id: req.params.orderId }, req.body, { new: true }, function(err, order) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(order);
                }
            });
        }
    });
};


exports.delete_an_tripStage = function(req, res) {
    //Check if the order were delivered or not and delete it or not accordingly
    //Check if the user is the proper customer that posted the order and if not: res.status(403); "an access token is valid, but requires more privileges"
    TripStage.deleteOne({
        _id: req.params.orderId
    }, function(err, order) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: 'Order successfully deleted' });
        }
    });
};