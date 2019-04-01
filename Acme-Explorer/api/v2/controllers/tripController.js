"use strict";
/*---------------TRIP----------------------*/
var mongoose = require("mongoose"),
  Trip = mongoose.model("Trips"),
  Finder = mongoose.model("Finders"),
  TripApplications = mongoose.model("TripApplications"),
  SystemInformation = mongoose.model("SystemInformations");
var mongo = require('mongodb');

exports.list_all_trips = function (req, res) {
  Trip.find({}, function (err, trip) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.create_a_trip = function (req, res) {
  var new_trip = new Trip(req.body);
  new_trip.save(function (error, trip) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.read_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.update_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!trip.public) {
        calcularPrecio(req.body);
        Trip.findOneAndUpdate({ _id: req.params.tripId },
          req.body, { new: true },
          function (err, trip) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json(trip);
            }
          }
        );
      } else {
        res.status(403); //Auth error
        res.send("The Trip can't be modified because it's published");
      }

    }
  });
};

exports.delete_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!trip.public || (trip.public && trip.startDate > new Date())) {
        Trip.remove({
          _id: req.params.tripId
        },
          function (err, trip) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json({ message: "Trip successfully deleted" });
            }
          }
        );
      } else {
        res.status(403); //Auth error
        res.send("The Trip can't be modified because it's published");
      }

    }
  });
};

exports.list_an_actor_trips = function (req, res) {
  var o_id = new mongo.ObjectID(req.params.actorId);
  TripApplications.aggregate([{
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
      res.status(500).send(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

//Receives Finder id
exports.search_trips = function (req, res) {
  //In further version of the code we will:
  //1.- control the authorization in order to include deleted items in the results if the requester is an Administrator.
  var query = {};

  var cacheTime = null;
  SystemInformation.find({}, function (err, systemInfo) {
    if (err) {
      res.status(500).send(err);
    } else {
      cacheTime = systemInfo[0].cacheTime;
    }

    Finder.findById(req.params.finderId, function (err, finder) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (finder) {


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
            query.startDate = {
              "$gte": finder.startDate,
              "$lte": finder.endDate
            };
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
          var compareDate = new Date().getTime() - 1000 * 60 * 60 * cacheTime;
          if (finder.lastCached && finder.lastCached.getTime() > compareDate) {
            console.log("Resultados recuperados de cache");
            Trip.find({
              '_id': { $in: finder.results }
            }, function (err, trips) {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).json(trips);
              }
            });


          }
          else {
            Trip.find(query)
              .sort(sort)
              .skip(skip)
              .limit(limit)
              .lean()
              .exec(function (err, trip) {
                console.log('Start searching trips');
                if (err) {
                  res.status(500).send(err);
                } else {
                  finder.lastCached = Date.now();
                  finder.results = trip;
                  Finder.findOneAndUpdate(
                    { _id: req.params.finderId },
                    finder,
                    { new: true },
                    function (err, finder) {
                      if (err) {
                        res.status(500).send(err);
                      }
                      else {
                        res.status(200).json(trip);
                      }

                    }
                  );

                }

                console.log('End searching trips');
              });
          }
        } else {
          res.status(404).send("No se ha encontrado el finder especificado")
        }
      }
    });
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
        res.status(500).send(err);
      }
      else {
        finder.lastCached = Date.now();
        finder.results = trip;
        Finder.findOneAndUpdate(
          { _id: req.params.finderId },
          finder,
          { new: true },
          function (err, finder) {
            if (err) {
              res.status(500).send(err);
            }

          }
        );
        if (!res.headersSent) {
          res.status(200).json(trip);
        }
      }
      console.log('End searching trips');
    });
};

exports.cancel_trip = function (req, res) {
  var cancelationReason = req.query.reason;
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(500).send(err);
    } else {
      if (trip) {
        TripApplications.find({ trip: req.params.tripId }, function (err, tripApplications) {
          if (err) {
            res.status(500).send(err);
          } else {
            if (trip.cancelationReason) {
              res.status(403);
              res.send("No se puede cancelar un viaje que ya ha sido cancelado");
            } else {
              if (tripApplications) {
                res.status(403);
                res.send("No se puede cancelar un viaje con aplicaciones");
              } else {
                trip.cancelationReason = cancelationReason;
                Trip.findOneAndUpdate({ _id: req.params.tripId },
                  trip, { new: true },
                  function (err, trip) {
                    if (err) {
                      res.status(500).send(err);
                    } else {
                      res.status(200).json(trip);
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

function calcularPrecio(new_trip) {
  var pr = 0;
  console.log("Entra");
  for (var i = 0, len = new_trip.tripStage.length; i < len; i++) {
    pr = pr + new_trip.tripStage[i].price;
  }
  new_trip.price = pr;
};

function getAllFilteredTripsByActor(callback) {

};