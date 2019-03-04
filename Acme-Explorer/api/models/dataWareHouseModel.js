'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataWareHouseSchema = new mongoose.Schema({
    averageNumTrips: {
        type: Number
    },
    minNumTrips: {
        type: Number
    },
    maxNumTrips: {
        type: Number
    },
    standardDevNumTrips: {
        type: Number
    },
    averageNumApplications: {
        type: Number
    },
    minNumApplications: {
        type: Number
    },
    maxNumApplications: {
        type: Number
    },
    standardDevNumApplications: {
        type: Number
    },
    averagePrices: {
        type: Number
    },
    minPrices: {
        type: Number
    },
    maxPrices: {
        type: Number
    },
    standardDevPrices: {
        type: Number
    },
    ratioDueApplications: {
        type: Number,
        max: 1,
        min: 0
    },
    ratioAcceptedApplications: {
        type: Number,
        max: 1,
        min: 0
    },
    ratioPendingApplications: {
        type: Number,
        max: 1,
        min: 0
    },
    ratioRejectedApplications: {
        type: Number,
        max: 1,
        min: 0
    },
    averagePriceRange: {
        type: Number
    },
    topKeyWords: {
        type: String
    },
    computationMoment: {
        type: Date,
        default: Date.now
    },
    rebuildPeriod: {
        type: String
    }
}, { strict: false });

DataWareHouseSchema.index({ computationMoment: -1 });

module.exports = mongoose.model('DataWareHouse', DataWareHouseSchema);