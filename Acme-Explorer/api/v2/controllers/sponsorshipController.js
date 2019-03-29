"use strict";
/*---------------Sponsorship----------------------*/
var mongoose = require("mongoose"),
  Sponsorship = mongoose.model("Sponsorships");

exports.create_a_sponsorship = function(req, res) {
  var new_sponsorship = new Sponsorship(req.body);
  new_sponsorship.save(function(err, sponsorship) {
    if (err) {
      res.send(err);
    } else {
      res.json(sponsorship);
    }
  });
};

exports.read_a_sponsorship = function(req, res) {
  res.sendStatus(200);
};

exports.update_a_sponsorship = function(req, res) {
  res.sendStatus(200);
};

exports.delete_a_sponsorship = function(req, res) {
  res.sendStatus(200);
};

exports.list_sponsorships = function(req, res) {
  res.sendStatus(200);
};

exports.pay_a_sponsorship = function(req, res) {
  res.sendStatus(200);
};

exports.find_random = function(req, res) {
  res.sendStatus(200);
};
