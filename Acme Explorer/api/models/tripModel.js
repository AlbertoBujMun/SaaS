"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripStageSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title required"
    },
    description: {
      type: String,
      required: "Stage description required"
    },
    price: {
      type: Number,
      min: 0
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { strict: false }
);

var TripSchema = new Schema(
  {
    ticker: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: "Kindly enter the title"
    },
    description: {
      type: String,
      required: "Kindly enter the description"
    },
    requirement: [
      {
        type: String,
        required: "Kindly enter the requirement(s)"
      }
    ],
    startDate: {
      type: Date,
      required: "Kindly enter the start date of the trip"
    },
    endDate: {
      type: Date,
      required: "Kindly enter the end date of the trip"
    },
    photo: [
      {
        data: Buffer,
        contentType: String
      }
    ],
    cancelationReason: {
      type: Boolean,
      default: false
    },
    created: {
      type: Date,
      default: Date.now
    },
    deleted: {
      type: Boolean,
      default: false
    },
    tripStage: [TripStageSchema]
  },
  { strict: false }
);

// Execute before each trip.save() call
TripSchema.pre("save", function(callback) {
  var new_trip = this;
  var day = dateFormat(new Date(), "yymmdd");

  var generated_ticker = [day, generate("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4)].join(
    "-"
  );
  new_trip.ticker = generated_ticker;
  callback();
});

module.exports = mongoose.model("Trips", TripSchema);
