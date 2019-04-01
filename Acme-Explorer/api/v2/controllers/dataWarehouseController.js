var async = require("async");
var mongoose = require('mongoose'),
    DataWareHouse = mongoose.model('DataWareHouse'),
    /*   Orders = mongoose.model('Orders'); */
    Trips = mongoose.model('Trips'),
    TripApplications = mongoose.model('TripApplications'),
    Finders = mongoose.model('Finders');

exports.list_all_indicators = function(req, res) {
    console.log('Requesting indicators');

    DataWareHouse.find().sort("-computationMoment").exec(function(err, indicators) {
        if (err) {
            res.send(err);
        } else {
            res.json(indicators);
        }
    });
};

exports.last_indicator = function(req, res) {

    DataWareHouse.find().sort("-computationMoment").limit(1).exec(function(err, indicators) {
        if (err) {
            res.send(err);
        } else {
            res.json(indicators);
        }
    });
};

var CronJob = require('cron').CronJob;
var CronTime = require('cron').CronTime;

//'0 0 * * * *' una hora
//'*/30 * * * * *' cada 30 segundos
//'*/10 * * * * *' cada 10 segundos
//'* * * * * *' cada segundo
var rebuildPeriod = '*/60 * * * * *'; //El que se usará por defecto
var computeDataWareHouseJob;

exports.rebuildPeriod = function(req, res) {
    console.log('Updating rebuild period. Request: period:' + req.query.rebuildPeriod);
    rebuildPeriod = req.query.rebuildPeriod;
    computeDataWareHouseJob.setTime(new CronTime(rebuildPeriod));
    computeDataWareHouseJob.start();

    res.json(req.query.rebuildPeriod);
};

function createDataWareHouseJob() {
    computeDataWareHouseJob = new CronJob(rebuildPeriod, function() {

        var new_dataWareHouse = new DataWareHouse();
        console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod);
        async.parallel([
            computeTripsAggregation
            /*,
                        computePricesAggregation,
                        computeTripsAggregation*/
            //computeAverageFinderPrices,
            // computeMostCommonKeywordsFinder
            /*   computeTopCancellers,
              computeTopNotCancellers,
              computeBottomNotCancellers,
              computeTopClerks,
              computeBottomClerks,
              computeRatioCancelledOrders */
        ], function(err, results) {
            if (err) {
                console.log("Error computing datawarehouse: " + err);
            } else {
                console.log("Resultados obtenidos por las agregaciones: " + JSON.stringify(results));
                new_dataWareHouse.averageNumTrips = 0;

                new_dataWareHouse.minNumTrips = 0;

                new_dataWareHouse.maxNumTrips = 0;

                new_dataWareHouse.standardDevNumTrips = 0;

                new_dataWareHouse.averageNumApplications = 0;

                new_dataWareHouse.minNumApplications = 0;

                new_dataWareHouse.maxNumApplications = 0;

                new_dataWareHouse.standardDevNumApplications = 0;

                new_dataWareHouse.averagePrices = 0;

                new_dataWareHouse.minPrices = 0;

                new_dataWareHouse.maxPrices = 0;

                new_dataWareHouse.standardDevPrices = 0;

                new_dataWareHouse.ratioDueApplications = 0;

                new_dataWareHouse.ratioAcceptedApplications = 0;

                new_dataWareHouse.ratioPendingApplications = 0;

                new_dataWareHouse.ratioRejectedApplications = 0;

                new_dataWareHouse.averagePriceRange = 0;

                new_dataWareHouse.topKeyWords = 'Hola';

                new_dataWareHouse.rebuildPeriod = rebuildPeriod;

                new_dataWareHouse.save(function(err, datawarehouse) {
                    if (err) {
                        console.log("Error saving datawarehouse: " + err);
                    } else {
                        console.log("new DataWareHouse succesfully saved. Date: " + new Date());
                    }
                });
            }
        });
    }, null, true, 'Europe/Madrid');

}

module.exports.createDataWareHouseJob = createDataWareHouseJob;

function computeAverageTripsManager(callback) {
    Trips.aggregate([
        { $project: { _id: 1, "averageNumTrips": { "$min": "$startDate" } } }
    ]);
};

function computeApplicationsRatioByStatus(callback) {
    TripApplications.aggregate([
        { "$group": { "_id": "$status", "count": { "$sum": 1 } } },
        {
            "$project": {
                "count": 1,
                "percentage": {
                    "$concat": [{ "$substr": [{ "$multiply": [{ "$divide": ["$count", { "$literal": TripApplications.count() }] }, 100] }, 0, 2] }, "", "%"]
                }
            }
        }
    ]);
};

function computeAverageFinderPrices(callback) {
    Finders.aggregate([
        { $project: { _id: 1, "avgMinimumPrice": { "$avg": "$minimumPrice" }, "avgMaximumPrice": { "$avg": "$maximumPrice" } } }
    ]);
};

function computeMostCommonKeywordsFinder(callback) {
    Finders.aggregate([
        { $sortByCount: "$keyword" },
        { $limit: 10 }
    ]);
};

function computeTripsAggregation(callback) {
    Trips.aggregate([{
            "$group": {
                "_id": "$managerId",
                "tripsManaged": {
                    "$sum": 1.0
                }
            }
        },
        {
            "$facet": {
                "avgTrips": [{
                    "$project": {
                        "_id": 0.0,
                        "data": {
                            "$avg": "$tripsManaged"
                        }
                    }
                }],
                "minTrips": [{
                    "$project": {
                        "_id": 0.0,
                        "data": {
                            "$min": "$tripsManaged"
                        }
                    }
                }],
                "maxTrips": [{
                    "$project": {
                        "_id": 0.0,
                        "data": {
                            "$max": "$tripsManaged"
                        }
                    }
                }],
                "stdevTrips": [{
                    "$project": {
                        "_id": 0.0,
                        "data": {
                            "$stdDevPop": "$tripsManaged"
                        }
                    }
                }]
            }
        }
    ]);

};

function computePricesAggregation(callback) {
    Trips.aggregate(
        [
            { "$unwind": "$tripStages" },
            {
                "$project": {
                    _id: 1,
                    precio: { $sum: "$tripStages.price" }
                }
            },
            {
                "$facet": {
                    "avgTrips": [{
                        "$project": {
                            "_id": 0,
                            "data": {
                                "$avg": "$precio"
                            }
                        }
                    }],
                    "minTrips": [{
                        "$project": {
                            "_id": 0,
                            "data": {
                                "$min": "$precio"
                            }
                        }
                    }],
                    "maxTrips": [{
                        "$project": {
                            "_id": 0,
                            "data": {
                                "$max": "$precio"
                            }
                        }
                    }],
                    "stdevTrips": [{
                        "$project": {
                            "_id": 0,
                            "data": {
                                "$stdDevPop": "$precio"
                            }
                        }
                    }]
                }
            }
        ]
    );
};

function computeAggregateTripApplications(callback) {
    TripApplications.aggregate(
        [{
                "$group": {
                    "_id": "$tripId",
                    "applicationsPerTrip": {
                        "$sum": 1.0
                    }
                }
            },
            {
                "$facet": {
                    "avgTrips": [{
                        "$project": {
                            "_id": 0.0,
                            "data": {
                                "$avg": "$applicationsPerTrip"
                            }
                        }
                    }],
                    "minTrips": [{
                        "$project": {
                            "_id": 0.0,
                            "data": {
                                "$min": "$applicationsPerTrip"
                            }
                        }
                    }],
                    "maxTrips": [{
                        "$project": {
                            "_id": 0.0,
                            "data": {
                                "$max": "$applicationsPerTrip"
                            }
                        }
                    }],
                    "stdevTrips": [{
                        "$project": {
                            "_id": 0.0,
                            "data": {
                                "$stdDevPop": "$applicationsPerTrip"
                            }
                        }
                    }]
                }
            }
        ]
    );

};