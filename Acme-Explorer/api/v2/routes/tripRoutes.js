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
    .route("/v2/trips")
    .get(trip.list_all_trips)
    .post(trip.create_a_trip);
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
  app.route("/v2/trips/myTrips").get(trip.list_an_actor_trips);

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
  app.route("/v2/trips/simpleSearch/:keyword").get(trip.list_trips_by_keyword);

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
  app.route("/v2/trips/advancedSearch/:finderId").get(trip.search_trips);

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
  app
    .route("/v2/trips/:tripId")
    .get(trip.read_a_trip)
    .put(trip.update_a_trip)
    .delete(trip.delete_a_trip);

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
  app.route("/v2/trips/cancel/:tripId").put(trip.cancel_trip);
};
