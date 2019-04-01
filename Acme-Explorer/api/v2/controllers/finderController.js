"use strict";
/*---------------Finder----------------------*/
var mongoose = require("mongoose"),
    Finder = mongoose.model("Finders");



exports.read_a_finder = function (req, res) {
    Finder.find({ explorer: req.params.actorId }, function (err, trip) {
        if (err) {
            res.send(err);
        } else {
            res.json(trip);
        }
    });
};

exports.update_a_finder = function (req, res) {
    Finder.findOne({_id: req.params.finderId}, function(err, finder) {
      if (err) {
        res.status(404).send(err);
      } else {
          req.body.lastCached = null
        Finder.findOneAndUpdate({ _id: req.params.finderId }, req.body, { new: true }, function (err, finder) {
          if (err) {
              res.status(500).send(err);
          } else {
              res.status(200).json(finder);
  
          }
      });
      }
    });
};