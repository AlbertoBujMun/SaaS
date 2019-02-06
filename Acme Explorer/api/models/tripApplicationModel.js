"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripApplicationSchema = new Schema(
  {
    ticker: {
      type: String,
      required: ""
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
