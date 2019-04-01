var async = require("async");
var mongoose = require('mongoose'),
    DataWareHouse = mongoose.model('DataWareHouse'),
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
var rebuildPeriod = '*/10 * * * * *'; //El que se usará por defecto
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
            computePricesAggregation,
            computeTripsManagerAggregation,
            computeAggregateTripApplications,
            computeMostCommonKeywordsFinder,
            computeAverageFinderPrices
        ], function(err, results) {
            if (err) {
                console.log("Error computing datawarehouse: " + err);
            } else {
                console.log("Resultados obtenidos por las agregaciones: " + JSON.stringify(results));
                new_dataWareHouse.averageNumTrips = results[1].avgTrips;
                new_dataWareHouse.minNumTrips = results[1].minTrips;
                new_dataWareHouse.maxNumTrips = results[1].maxTrips;
                new_dataWareHouse.standardDevNumTrips = results[1].stdevTrips;
                new_dataWareHouse.averagePrices = results[0].avgPrices;
                new_dataWareHouse.minPrices = results[0].minPrices;
                new_dataWareHouse.maxPrices = results[0].maxPrices;
                new_dataWareHouse.standardDevPrices = results[0].stdevPrices;
                new_dataWareHouse.averageNumApplications = results[2].avgApplications;
                new_dataWareHouse.minNumApplications = results[2].minApplications;
                new_dataWareHouse.maxNumApplications = results[2].maxApplications;
                new_dataWareHouse.standardDevNumApplications = results[2].stdevApplications;
                new_dataWareHouse.ratioDueApplications = 0;
                new_dataWareHouse.ratioAcceptedApplications = 0;
                new_dataWareHouse.ratioPendingApplications = 0;
                new_dataWareHouse.ratioRejectedApplications = 0;
                new_dataWareHouse.averagePriceRange = results[4];
                new_dataWareHouse.topKeyWords = results[3];
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

/*function computeAverageTripsManager(callback) {
    Trips.aggregate([{
            $group: {
                _id: null,
                avg: { $avg: "$price" },
                max: { $max: "$price" },
                min: { $min: "$price" },
                std: { $stdDevPop: "$price" }
            }
        },
        { $project: { _id: 0 } }
    ], function(err, res) {
        callback(err, res[0])
    });
    Trips.aggregate([
        { $project: { _id: 1, averageNumTrips: { $min: "$price" } } }
    ], function(err, res) {
        callback(err, res[0])
    });
};*/

function computeApplicationsByStatus(callback) {
    TripApplications.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        {
            $project: {
                count: 1,
                percentage: {
                    "$concat": [{
                        "$substr": [{
                            "$multiply": [{
                                "$divide": ["$count", { "$literal": TripApplications.count() }]
                            }, 100]
                        }, 0, 2]
                    }, "", "%"]
                }
            }
        }
    ]);
};

function computeAverageFinderPrices(callback) {
    Finders.aggregate([{
        $project: {
            _id: 1,
            avgMinimumPrice: { $avg: "$minimumPrice" },
            avgMaximumPrice: { $avg: "$maximumPrice" }
        }
    }], function(err, res) {
        callback(err, res[0])
    });
};

function computeMostCommonKeywordsFinder(callback) {
    Finders.aggregate([
        { $sortByCount: "$keyword" },
        { $limit: 10 }
    ], function(err, res) {
        callback(err, res[0])
    });
};

function computeTripsManagerAggregation(callback) {
    Trips.aggregate([{
            $group: {
                _id: "$manager",
                tripsManaged: {
                    $sum: 1
                }
            }
        },
        {
            $group: {
                _id: null,
                avgTrips: {
                    $avg: "$tripsManaged"
                },
                minTrips: {
                    $min: "$tripsManaged"
                },
                maxTrips: {
                    $max: "$tripsManaged"
                },
                stdevTrips: {
                    $stdDevPop: "$tripsManaged"
                }
            }
        }
    ], function(err, res) {
        callback(err, res[0])
    });

};

function computePricesAggregation(callback) {
    Trips.aggregate([{
                $unwind: "$tripStage"
            },
            {
                $group: {
                    _id: "$_id",
                    precio: { $sum: "$tripStage.price" }
                }
            },
            {
                $group: {
                    _id: null,
                    avgPrices: { $avg: "$precio" },
                    maxPrices: { $max: "$precio" },
                    minPrices: { $min: "$precio" },
                    stdevPrices: { $stdDevPop: "$precio" }
                }
            }
        ],
        function(err, res) {
            callback(err, res[0])
        });
};

function computeAggregateTripApplications(callback) {
    TripApplications.aggregate([{
            $group: {
                _id: "$trip",
                tripsApplicationTrip: {
                    $sum: 1
                }
            }
        },
        {
            $group: {
                _id: null,
                avgApplications: {
                    $avg: "$tripsApplicationTrip"
                },
                minApplications: {
                    $min: "$tripsApplicationTrip"
                },
                maxApplications: {
                    $max: "$tripsApplicationTrip"
                },
                stdevApplications: {
                    $stdDevPop: "$tripsApplicationTrip"
                }
            }
        }
    ], function(err, res) {
        callback(err, res[0])
    });

};