"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const generate = require('nanoid/generate');
const dateFormat = require('dateformat');

var TripStageSchema = new Schema({
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
}, { strict: false });

/**
 * @swagger
 * tags:
 *   name: Trip
 *   description:
 */
/**
 * @swagger
 * definitions:
 *   Trip:
 *     required:
 *       - title
 *       - description
 *       - startDate
 *       - endDate
 *       - manager
 *     properties:
 *       ticker:
 *         type: string
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       startDate:
 *         type: string
 *         format: date
 *       endDate:
 *         type: string
 *         format: date
 *       photo:
 *         type: string
 *       cancelationReason:
 *         type: boolean
 *       created:
 *         type: string
 *         format: date
 *       public:
 *         type: boolean
 *       deleted:
 *         type: boolean
 *       manager:
 *         type: object
 */
var TripSchema = new Schema({
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
    requirement: [{
        type: String,
        required: "Kindly enter the requirement(s)"
    }],
    startDate: {
        type: Date,
        required: "Kindly enter the start date of the trip"
    },
    endDate: {
        type: Date,
        required: "Kindly enter the end date of the trip"
    },
    photo: [{
        data: Buffer,
        contentType: String
    }],
    cancelationReason: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    public: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    manager: {
        type: Schema.Types.ObjectId,
        required: "Manager id is required"
    },
    price: {
        type: Number
    },
    tripStage: [TripStageSchema]
}, { strict: false });


TripSchema.index({ "tripStage.price": 1 });
TripSchema.index({ startDate: 1 });
TripSchema.index({ endDate: 1 });
TripSchema.index({ created: 1 });
TripSchema.index({ title: "text", description: "text", ticker: "text" });

// Execute before each trip.save() call
TripSchema.pre("save", function (callback) {
    var new_trip = this;
    var day = dateFormat(new Date(), "yymmdd");

    var generated_ticker = [day, generate("ABCDEFGHIJKLMNPQRSTUVWXYZ", 4)].join(
        "-"
    );
    new_trip.ticker = generated_ticker;
    callback();
});


module.exports = mongoose.model("Trips", TripSchema);