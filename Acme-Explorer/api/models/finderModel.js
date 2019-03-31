"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
/**
 * @swagger
 * tags:
 *   name: Finder
 *   description:
 */
/**
 * @swagger
 * definitions:
 *   Finder:
 *     required:
 *       - explorer
 *     properties:
 *       keyword:
 *          type: string
 *       minimumPrice:
 *          type: number
 *       maximumPrice:
 *          type: number
 *       startDate:
 *          type: string
 *          format: date
 *       endDate:
 *          type: string
 *          format: date
 *       explorer:
 *          type: object
 *       results:
 *          type: object
 *       lastCached:
 *          type: string
 *          format: date
 *
 */
var FinderSchema = new Schema({
  keyword: {
    type: String,
    default: null
  },
  minimumPrice: {
    type: Number,
    default: 0,
    validate: [
      isLowerThan,
      "The minimum price must be lower than the maximum price"
    ]
  },
  maximumPrice: {
    type: Number,
    default: 999999,
    validate: [
      isGreaterThan,
      "The maximum price must be greater than the minimum price"
    ]
  },
  startDate: {
    type: Date,
    default: Date.now,
    validate: [isEarlierThan, "The start date must be before the end date"]
  },
  endDate: {
    type: Date,
    default: Date.now,
    validate: [isLaterThan, "The end date must be after the start date"]
  },
  explorer: {
    type: Schema.Types.ObjectId,
    required: "Explorer id is required"
  },
  results: [
    {
      type: Schema.Types.ObjectId,
      default: null
    }
  ],
  lastCached: {
    type: Date,
    default: null
  }
});

FinderSchema.index({ explorer: 1 });
FinderSchema.index({ maximumPrice: 1 });
FinderSchema.index({ minimumPrice: 1 });

function isGreaterThan(finder) {
  if (
    finder.minimumPrice != null &&
    finder.maximumPrice != null &&
    finder.minimumPrice > finder.maximumPrice
  ) {
    return false;
  } else {
    return true;
  }
}

function isLowerThan(finder) {
  if (
    finder.minimumPrice != null &&
    finder.maximumPrice != null &&
    finder.maximumPrice < finder.minimumPrice
  ) {
    return false;
  } else {
    return true;
  }
}

function isEarlierThan(finder) {
  if (
    finder.startDate != null &&
    finder.endDate != null &&
    finder.startDate > finder.endDate
  ) {
    return false;
  } else {
    return true;
  }
}

function isLaterThan(finder) {
  if (
    finder.startDate != null &&
    finder.endDate != null &&
    finder.endDate < finder.startDate
  ) {
    return false;
  } else {
    return true;
  }
}

module.exports = mongoose.model("Finders", FinderSchema);
