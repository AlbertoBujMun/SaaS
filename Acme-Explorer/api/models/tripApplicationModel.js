"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
/**
 * @swagger
 * tags:
 *   name: TripApplication
 *   description:
 */
/**
 * @swagger
 * definitions:
 *   TripApplication:
 *     required:
 *       - ticker
 *       - rejectionReason
 *     properties:
 *       ticker:
 *         type: string
 *       status:
 *         type: string
 *       comments:
 *         type: string
 *       applicationDate:
 *         type: string
 *         format: date
 *       rejectionReason:
 *         type: string
 *         format: date
 *       explorer:
 *         type: string
 *
 */
var TripApplicationSchema = new Schema(
  {
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
      type: String,
      required: [isRejected, "Kindly enter a rejection reason"]
    },
    explorer: {
      type: Schema.Types.ObjectId,
      required: "Explorer id is required"
    },
    trip: {
      type: Schema.Types.ObjectId,
      required: "Trip id is required"
    }
  },
  { strict: false }
);

TripApplicationSchema.index({ status: 1 });
TripApplicationSchema.index({ explorer: 1 });
TripApplicationSchema.index({ applicationDate: 1 });

function isRejected() {
  return this.status === "REJECTED";
}

module.exports = mongoose.model("TripApplications", TripApplicationSchema);
