"use strict";
module.exports = function(app) {
    var trip = require("../controllers/tripController");

    /**
     * @swagger
     * /v2/trips:
     *   get:
     *     tags:
     *       - Trip
     *     description: Returns all trips
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of trips
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    /**
     * @swagger
     * /v2/trips:
     *   post:
     *     tags:
     *       - Trip
     *     description: Returns a Trip Routes created
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Create a Trip Routes
     *         required: true
     *         schema:
     *             $ref: "#/definitions/Trip"
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A Trip Route
     *         schema:
     *           $ref: '#/definitions/trips'
     */
    app
        .route("/v2/trips")
        .get(trip.list_all_trips)
        .post(trip.create_a_trip);
    /**
     * @swagger
     * /v2/trips/:tripId:
     *   get:
     *     tags:
     *       - Trip
     *     description: Returns all trips
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of tips
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    /**
     * @swagger
     * /v2/trips/:tripId:
     *   put:
     *     tags:
     *       - Trip
     *     description: Returns all trips
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of trips
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    /**
     * @swagger
     * /v2/trips/:tripId:
     *   delete:
     *     tags:
     *       - Trip
     *     description: Return the trip deleted
     *     parameters:
     *       - in: path
     *         name: tripId
     *         description: Delete a Trip
     *         required: true
     *         type: string
     *         schema:
     *             $ref: "#/definitions/Trip"
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A trip deleted
     *         schema:
     *           $ref: '../#/Trip'
     */
    app
        .route("/v2/trips/{tripId}")
        .get(trip.read_a_trip)
        .put(trip.update_a_trip)
        .delete(trip.delete_a_trip);

    app.route("/v2/myTrips").get(trip.list_an_actor_trips);
};