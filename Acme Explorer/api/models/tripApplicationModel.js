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
    applicationDate: {
      type: Date,
      default: Date.now
    },
    rejectionReason: {
      contentType: String,
      required: [isSponsor, "Kindly enter a rejection reason"]
    },
    explorer: {
      type: Schema.Types.ObjectId,
      required: 'Explorer id is required'
    }
  },
  { strict: false }
);

function isRejected() {
  return this.status === "REJECTED";
}

module.exports = mongoose.model("TripApplications", TripApplicationSchema);
