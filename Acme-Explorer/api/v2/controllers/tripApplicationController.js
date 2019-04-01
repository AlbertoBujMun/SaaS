"use strict";
/*---------------tripApplication----------------------*/
var mongoose = require("mongoose"),
    TripApplication = mongoose.model("TripApplications"),
    Trips = mongoose.model("Trips");

exports.list_all_tripApplications = function(req, res) {
    TripApplication.find({}, function(err, tripApplication) {
        if (err) {
            res.send(err);
        } else {
            res.json(tripApplication);
        }
    });
};

exports.create_a_tripApplication = function(req, res) {
    var new_tripApplication = new TripApplication(req.body);
    Trips.findById(new_tripApplication.trip, function(
        err,
        trip
    ) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!trip) {
                res.status(403);
                res.send("No se ha encontrado el viaje para la aplicación")
            } else {
                if (trip.cancelationReason) {
                    res.status(403);
                    res.send("El viaje ha sido cancelado anteriormente");
                } else if (!(trip.public && trip.startDate > new Date()) || trip.cancelationReason) {
                    res.status(403);
                    res.send("El viaje no ha sido publicado, ha comenzado o se ha cancelado.");
                } else {
                    new_tripApplication.save(function(error, tripApplication) {
                        if (error) {
                            res.send(error);
                        } else {
                            res.json(tripApplication);
                        }
                    });
                }
            }
        }
    });
};

exports.read_a_tripApplication = function(req, res) {
    TripApplication.findById(req.params.tripApplicationId, function(
        err,
        tripApplication
    ) {
        if (err) {
            res.send(err);
        } else {
            res.json(tripApplication);
        }
    });
};

exports.pay_a_tripApplication = function(req, res) {
    TripApplication.findById(req.params.tripApplicationId, function(err, tripApplication) {
        if (err) {
            res.send(err);
        } else {
            if (tripApplication) {
                if (tripApplication.status != 'DUE') {
                    res.status(403);
                    res.send("No se puede pagar una aplicación no aceptada por manager");
                }
                tripApplication.status = 'ACCEPTED';
            }
            updateStatus(req, res, tripApplication);
        }
    });
};

exports.update_a_tripApplication = function(req, res) {
    TripApplication.findById(req.params.tripApplicationId, function(
        err,
        tripApplication
    ) {
        if (err) {
            res.send(err);
        } else {
            TripApplication.findOneAndUpdate({ _id: req.params.tripApplicationId },
                req.body, { new: true },
                function(err, tripApplication) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(tripApplication);
                    }
                }
            );
        }
    });
};

exports.delete_a_tripApplication = function(req, res) {
    TripApplication.remove({
            _id: req.params.tripApplicationId
        },
        function(err, tripApplication) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: "tripApplication successfully deleted" });
            }
        }
    );
};

exports.list_an_actor_applications = function(req, res) {
    TripApplication.find({ explorer: req.params.actorId }, function(err, tripApplication) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(tripApplication);
        }
    });
};

exports.reject_trip_application = function(req, res) {
    var rejectionReason = req.query.reason;
    TripApplication.findById(req.params.tripApplicationId, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            if (trip) {
                checkRejected(res, trip)
                checkAccepted(res, trip)
                checkDue(res, trip)
                checkCanceled(res, trip)
                trip.rejectionReason = rejectionReason;
                trip.status = 'REJECTED'
            }
            updateStatus(req, res, trip)
        }

    });
};

exports.due_trip_application = function(req, res) {
    TripApplication.findById(req.params.tripApplicationId, function(err, trip) {
        if (err) {
            res.send(err);
        } else {
            if (trip) {
                checkRejected(res, trip)
                checkAccepted(res, trip)
                checkDue(res, trip)
                checkCanceled(res, trip)
                trip.status = 'DUE'
            }
            updateStatus(req, res, trip)
        }
    });
};

exports.cancel_trip_application = function(req, res) {
    TripApplication.findById(req.params.tripApplicationId, function(err, tripApplication) {
        if (err) {
            res.send(err);
        } else if (tripApplication.status == 'ACCEPTED' || tripApplication.status == 'PENDING') {
            if (tripApplication.explorer) {
                checkAccepted(res, tripApplication);
                checkDue(res, tripApplication);
                checkCanceled(res, tripApplication);
                tripApplication.status = 'CANCELED';
            }
            updateStatus(req, res, tripApplication);
        } else {
            res.status(403).send(err);
        }

    });
};

/*function checkStatus(res, trip) {
    switch (trip.status) {
        case 'REJECTED':
            res.status(403).send("La aplicación ha sido rechazada anteriormente");
            break;
        case 'ACCEPTED':
            res.status(403).send("La aplicación ha sido aceptada anteriormente");
            break;
        case 'CANCELED':
            res.status(403).send("La aplicación ha sido cancelada anteriormente");
            break;
        case 'DUE':
            res.status(403).send("La aplicación está pendiente de pago");
            break;
        case 'PENDING':
            res.status(403).send("La aplicación está pendiente");
            break;
    }
}*/
function checkRejected(res, trip) {
    if (trip.status == 'REJECTED') {

        res.status(403);
        res.send("La aplicación ha sido rechazada anteriormente");
    }
}

function checkAccepted(res, trip) {
    if (trip.status == 'ACCEPTED') {

        res.status(403);
        res.send("La aplicación ha sido aceptada anteriormente");
    }
}

function checkCanceled(res, trip) {
    if (trip.status == 'CANCELED') {

        res.status(403);
        res.send("La aplicación ha sido cancelada anteriormente");
    }
}

function checkDue(res, trip) {
    if (trip.status == 'DUE') {

        res.status(403);
        res.send("La aplicación está pendiente de pago");
    }
}

function checkPending(res, trip) {
    if (trip.status == 'PENDING') {

        res.status(403);
        res.send("La aplicación está pendiente");
    }
}

function updateStatus(req, res, trip) {
    if (!res.headersSent) {
        TripApplication.findOneAndUpdate({ _id: req.params.tripApplicationId },
            trip, { new: true },
            function(err, trip) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(trip);
                }
            }

        );
    }
}