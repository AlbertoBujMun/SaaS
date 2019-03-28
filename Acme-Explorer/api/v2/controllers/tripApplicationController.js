"use strict";
/*---------------tripApplication----------------------*/
var mongoose = require("mongoose"),
  TripApplication = mongoose.model("TripApplications"),
  Trips = mongoose.model("Trips");

exports.list_all_tripApplications = function (req, res) {
  TripApplication.find({}, function (err, tripApplication) {
    if (err) {
      res.send(err);
    } else {
      res.json(tripApplication);
    }
  });
};

exports.create_a_tripApplication = function (req, res) {
  var new_tripApplication = new TripApplication(req.body);
  Trips.findById(new_tripApplication.trip, function (
    err,
    trip
  ) {
    if (!trip) {
      res.status(403);
      res.send("No se ha encontrado el viaje para la aplicación")
    } else {
      if (trip.cancelationReason) {
        res.status(403);
        res.send("El viaje ha sido cancelado anteriormente")
      }
      else {
        new_tripApplication.save(function (error, tripApplication) {
          if (error) {
            res.send(error);
          } else {
            res.json(tripApplication);
          }
        });
      }
    }
  });
};

exports.read_a_tripApplication = function (req, res) {
  TripApplication.findById(req.params.tripApplicationId, function (
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

exports.pay_a_tripApplication = function (req, res) {
  TripApplication.findById(req.params.tripApplicationId, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      if (trip) {
        if (trip.status != 'DUE') {
          res.status(403);
          res.send("No se puede pagar una aplicación no aceptada por manager");
        }
        trip.status = 'ACCEPTED'
      }
      upateStatus(req, res, trip)
    }
  });
};

exports.update_a_tripApplication = function (req, res) {
  TripApplication.findById(req.params.tripApplicationId, function (
    err,
    tripApplication
  ) {
    if (err) {
      res.send(err);
    } else {
      TripApplication.findOneAndUpdate(
        { _id: req.params.tripApplicationId },
        req.body,
        { new: true },
        function (err, tripApplication) {
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

exports.delete_a_tripApplication = function (req, res) {
  TripApplication.remove(
    {
      _id: req.params.tripApplicationId
    },
    function (err, tripApplication) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "tripApplication successfully deleted" });
      }
    }
  );
};

exports.list_an_actor_applications = function (req, res) {
  TripApplication.find({ explorer: req.params.actorId }, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

exports.reject_trip_application = function (req, res) {
  var rejectionReason = req.query.reason;
  TripApplication.findById(req.params.tripApplicationId, function (err, trip) {
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
      upateStatus(req, res, trip)
    }

  });
};

exports.due_trip_application = function (req, res) {
  TripApplication.findById(req.params.tripApplicationId, function (err, trip) {
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
      upateStatus(req, res, trip)
    }
  });
};

exports.cancel_trip_application = function (req, res) {
  TripApplication.findById(req.params.tripApplicationId, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      if (trip) {
        checkAccepted(res, trip)
        checkDue(res, trip)
        checkCanceled(res, trip)
        trip.status = 'CANCELED'
      }
      upateStatus(req, res, trip)
    }

  });
};

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

function upateStatus(req, res, trip) {
  if (!res.headersSent) {
    TripApplication.findOneAndUpdate(
      { _id: req.params.tripApplicationId },
      trip,
      { new: true },
      function (err, trip) {
        if (err) {
          res.send(err);
        } else {
          res.json(trip);
        }
      }

    );
  }
}



