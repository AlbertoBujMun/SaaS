"use strict";
module.exports = function(app) {
    var trip = require("../controllers/tripController");

    /**
     * @swagger
     * /v1/trips:
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
     *           $ref: '#/definitions/actors'
     */
    /**
     * @swagger
     * /v1/trips:
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
     *             $ref: "#/definitions/Actor"
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A Trip Route
     *         schema:
     *           $ref: '#/definitions/Trip'
     */
    app
        .route("/v1/trips")
        .get(trip.list_all_trips)
        .post(trip.create_a_trip);
    /**
     * @swagger
     * /v1/trips/:tripId:
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
     * /v1/trips/:tripId:
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
     * /v1/trips/:tripId:
     *   delete:
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
    app
        .route("/v1/trips/:tripId")
        .get(trip.read_a_trip)
        .put(trip.update_a_trip)
        .delete(trip.delete_a_trip);

    app.route("/v1/myTrips").get(trip.list_an_actor_trips);
};