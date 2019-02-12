"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripApplicationSchema = new Schema(
  {
    ticker: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{6}-[A-Z]{4}/.test(v);
        },
        message: 'ticker is not valid!, Pattern("d{6}-[A-Z]{4}")'
      }
    },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "REJECTED", "DUE", "ACCEPTED", "CANCELED"]
    },
    comments: {
      type: String
    },
    email: {
      type: String,
      required: "Kindly enter the user's email"
    },
    applicationDate: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = mongoose.model("TripApplications", TripApplicationSchema);
