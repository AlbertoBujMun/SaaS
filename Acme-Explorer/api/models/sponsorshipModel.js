"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
/**
 * @swagger
 * tags:
 *   name: SponsorShip
 *   description:
 */
/**
 * @swagger
 * definitions:
 *   SponsorShip:
 *     required:
 *       - sponsor
 *     properties:
 *       ticker:
 *          type: string
 *       sponsor:
 *          type: object
 *       paymentDate:
 *          type: string
 *          format: date
 *
 */
var SponsorshipSchema = new Schema({
  ticker: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{6}-[A-Z]{4}/.test(v);
      },
      message: 'ticker is not valid!, Pattern("d{6}-[A-Z]{4}")'
    }
  },
  sponsor: {
    type: Schema.Types.ObjectId,
    required: "Sponsor id is required"
  },
  paymentDate: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Sponsorships", SponsorshipSchema);
