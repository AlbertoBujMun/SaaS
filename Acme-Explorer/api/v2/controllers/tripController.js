"use strict";
/*---------------TRIP----------------------*/
var mongoose = require("mongoose"),
  Trip = mongoose.model("Trips"),
  Finder = mongoose.model("Finders"),
  TripApplications = mongoose.model("TripApplications");
var mongo = require('mongodb');

exports.list_all_trips = function (req, res) {
  Trip.find({}, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

exports.create_a_trip = function (req, res) {
  var new_trip = new Trip(req.body);
  new_trip.save(function (error, trip) {
    if (error) {
      res.send(error);
    } else {
      res.json(trip);
    }
  });
};

exports.read_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

exports.update_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      Trip.findOneAndUpdate(
        { _id: req.params.tripId },
        req.body,
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
  });
};

exports.delete_a_trip = function (req, res) {
  Trip.remove(
    {
      _id: req.params.tripId
    },
    function (err, trip) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Trip successfully deleted" });
      }
    }
  );
};

exports.list_an_actor_trips = function (req, res) {
  var o_id = new mongo.ObjectID(req.params.actorId);
  TripApplications.aggregate([
    {
      "$match": {
        "explorer": o_id
      }
    },
    {
      "$lookup": {
        "from": "trips",
        "localField": "trip",
        "foreignField": "_id",
        "as": "trip_applied"
      }
    },
    {
      "$project": {
        "trip": "$trip_applied",
        "_id": 0.0
      }
    }
  ], function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

//Receives Finder id
exports.search_trips = function (req, res) {
  //In further version of the code we will:
  //1.- control the authorization in order to include deleted items in the results if the requester is an Administrator.
  var query = {};

  Finder.findById(req.params.FinderId, function (err, Finder) {
    if (err) {
      res.send(err);
    }
    else {
      finder = Finder;
    }
  });

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
    .exec(function (err, trip) {
      console.log('Start searching trips');
      if (err) {
        res.send(err);
      }
      else {
        res.json(trip);
      }
      console.log('End searching trips');
    });
};

//Receives Keyword
exports.list_trips_by_keyword = function (req, res) {
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
    .exec(function (err, trip) {
      console.log('Start searching trips');
      if (err) {
        res.send(err);
      }
      else {
        res.json(trip);
      }
      console.log('End searching trips');
    });
};

exports.cancel_trip = function (req, res) {
  var cancelationReason = req.query.reason;
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      if (trip) {
        TripApplications.find({ trip: req.params.tripId }, function (err, tripApplications) {
          if (err) {
            res.send(err);
          } else {
            if (trip.cancelationReason) {
              res.status(403);
              res.send("No se puede cancelar un viaje que ya ha sido cancelado");
            }
            else {
              if (tripApplications) {
                res.status(403);
                res.send("No se puede cancelar un viaje con aplicaciones");
              }
              else {
                trip.cancelationReason = cancelationReason;
                Trip.findOneAndUpdate(
                  { _id: req.params.tripId },
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



          }

        });
      }
    }
  });

};


function getAllFilteredTripsByActor(callback) {

};
