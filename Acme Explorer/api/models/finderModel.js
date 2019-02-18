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
 *          type: Number
 *       maximumPrice:
 *          type: Number
 *       startDate:
 *          type: date
 *       endDate:
 *          type: date
 *       explorer:
 *          type: Object
 *       results:
 *          type: Object
 *       lastCached:
 *          type: date
 *   
 */
var FinderSchema = new Schema({
    keyword: {
        type: String,
        default: null
    },
    minimumPrice: {
        type: Number,
        default: null
    },
    maximumPrice: {
        type: Number,
        default: null
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    },
    explorer: {
        type: Schema.Types.ObjectId,
        required: 'Explorer id is required'
    },
    results: [{
        type: Schema.Types.ObjectId,
        default: null
    }],
    lastCached: {
        type: Date,
        default: null
    }


});


module.exports = mongoose.model("Finders", FinderSchema);