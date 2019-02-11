"use strict";
/*---------------tripApplication----------------------*/
var mongoose = require("mongoose"),
  tripApplication = mongoose.model("tripApplications");

exports.list_all_tripApplications = function(req, res) {
  tripApplication.find({}, function(err, tripApplication) {
    if (err) {
      res.send(err);
    } else {
      res.json(tripApplication);
    }
  });
};

exports.create_a_tripApplication = function(req, res) {
  var new_tripApplication = new tripApplication(req.body);

  new_tripApplication.save(function(error, tripApplication) {
    if (error) {
      res.send(error);
    } else {
      res.json(tripApplication);
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

exports.update_a_tripApplication = function(req, res) {
  TripApplication.findById(req.params.tripApplicationId, function(
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
  TripApplication.remove(
    {
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
