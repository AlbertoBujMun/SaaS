"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
/**
 * @swagger
 * tags:
 *   name: SystemInformation
 *   description: 
 */
/**
 * @swagger
 * definitions:
 *   SystemInformation:
 *     required:
 *       - sponsorRate
 *       - cacheTime
 *       - resultsNumber
 *     properties:
 *       sponsorRate:
 *          type: number
 *       cacheTime:
 *          type: number
 *       resultsNumber:
 *          type: number
 *   
 */
var SystemInformationSchema = new Schema({
    sponsorRate: {
        type: Number,
        required: "please state a sponsorship rate"
    },
    cacheTime: {
        type: Number,
        min: 1,
        max: 24,
        required: "please state a cached time"
    },
    resultsNumber: {
        type: Number,
        maxx: 100,
        required: "please state a maximum results number"
    }


});


module.exports = mongoose.model("Finders", FinderSchema);