"use strict";
/*---------------Sponsorship----------------------*/
var mongoose = require("mongoose"),
  Sponsorship = mongoose.model("Sponsorships");
var mongo = require("mongodb");

exports.create_a_sponsorship = function (req, res) {
  var new_sponsorship = new Sponsorship(req.body);
  new_sponsorship.save(function (err, sponsorship) {
    if (err) {
      res.send(err);
    } else {
      res.json(sponsorship);
    }
  });
};

exports.read_a_sponsorship = function (req, res) {
  Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
    if (err) {
      res.send(err);
    } else {
      res.json(sponsorship);
    }
  });
};

exports.update_a_sponsorship = function (req, res) {
  Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
    if (err) {
      res.send(err);
    } else {
      Sponsorship.findOneAndUpdate(
        { _id: req.params.sponsorshipId },
        req.body,
        { new: true },
        function (err, sponsorship) {
          if (err) {
            res.send(err);
          } else {
            res.json(sponsorship);
          }
        }
      );
    }
  });
};

exports.delete_a_sponsorship = function (req, res) {
  Sponsorship.remove(
    {
      _id: req.params.sponsorshipId
    },
    function (err, sponsorship) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Sponsorship successfully deleted" });
      }
    }
  );
};

exports.list_sponsorships = function (req, res) {
  var o_id = new mongo.ObjectID(req.params.actorId);
  Sponsorship.find({ sponsor: o_id }, function (err, sponsorships) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(sponsorships);
    }
  });
};

exports.pay_a_sponsorship = function (req, res) {
  Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
    if (err) {
      res.send(err);
    } else {
      if (sponsorship.paymentDate) {
        res.status(403);
        res.send("No se puede pagar un patrocinio que ya ha sido pagado");
      }
      else {
        sponsorship.paymentDate = new Date()
        console.log(sponsorship);
        Sponsorship.findOneAndUpdate(
          { _id: req.params.sponsorshipId },
          sponsorship,
          { new: true },
          function (err, sponsorship) {
            if (err) {
              res.send(err);
            } else {
              console.log(sponsorship.paymentDate);
              console.log(sponsorship);
              res.json(sponsorship);
            }
          }

        );
      }
    }
  });
};

exports.find_random = function (req, res) {
  Sponsorship.find({ ticker: req.params.ticker }, function (err, sponsorships) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(sponsorships[Math.floor(Math.random() * sponsorships.length)]);
    }
  });
};
