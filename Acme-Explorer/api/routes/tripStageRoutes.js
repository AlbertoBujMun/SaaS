"use strict";
module.exports = function(app) {
    var tripStage = require("../controllers/tripStageController");

    /**
     * @swagger
     * /v1/tripStages:
     *   get:
     *     tags:
     *       - TripStage
     *     description: Returns all tripStages
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of tripStages
     *         schema:
     *           $ref: '#/definitions/TripStage'
     */
    /**
     * @swagger
     * /v1/tripStages:
     *   post:
     *     tags:
     *       - TripStage
     *     description: Returns a TripStage Routes created
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Create a TripStage Routes
     *         required: true
     *         schema:
     *             $ref: "#/definitions/TripStage"
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A TripStage Route
     *         schema:
     *           $ref: '#/definitions/TripStage'
     */
    app
        .route("/v1/tripStages")
        .get(tripStage.list_all_tripStages)
        .post(tripStage.create_a_tripStage);
    /**
     * @swagger
     * /v2/trips/myTrips:
     *   get:
     *     tags:
     *       - Trip
     *     description: Returns all trips an actor is enroled into
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of trips
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    // app.route("/v2/tripStages/myTrips").get(tripStage.list_an_actor_trips);

    /**
     * @swagger
     * /v2/trips/simpleSearch/:keyword:
     *   get:
     *     tags:
     *       - Trip
     *     description: Returns all trips containing a keyword
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of trips
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    //  app.route("/v2/trips/simpleSearch/:keyword").get(tripStage.list_trips_by_keyword);

    /**
     * @swagger
     * /v2/trips/advancedSearch/:finderId:
     *   get:
     *     tags:
     *       - Trip
     *     description: Returns all trips filtering by a finder
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of trips
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    // app.route("/v2/trips/advancedSearch/:finderId").get(tripStage.search_trips);

    /**
     * @swagger
     * /v2/trips/:tripId:
     *   get:
     *     tags:
     *       - Trip
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    /**
     * @swagger
     * /v2/trips/:tripId:
     *   put:
     *     tags:
     *       - Trip
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    /**
     * @swagger
     * /v2/trips/:tripId:
     *   delete:
     *     tags:
     *       - Trip
     *     description: Delete a trip
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: returns the trip deleted
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    /* app
        .route("/v2/trips/:tripId")
        .get(tripStage.read_a_trip)
        .put(tripStage.update_a_trip)
        .delete(tripStage.delete_a_trip);
*/
    /**
     * @swagger
     * /v2/trips/cancel/:tripId:
     *   put:
     *     tags:
     *       - Trip
     *     description: Sets a trip status to CANCELED
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: The canceled trip
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    //app.route("/v2/trips/cancel/:tripId").put(tripStage.cancel_trip);
};