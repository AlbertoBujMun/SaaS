"use strict";
module.exports = function(app) {
    var trip = require("../controllers/tripController");
    /**
     * @swagger
     * definitions:
     *   Trips:
     *     required:
     *       - username
     *       - password
     *     properties:
     *       username:
     *         type: string
     *       password:
     *         type: string
     *       path:
     *         type: string
     */

    /**
     * @swagger
     * tags:
     *   name: Trips
     *   description: User management and login
     */
    /**
     * @swagger
     * /trips:
     *   get:
     *     tags:
     *       - Trips
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
     * /trips:
     *   post:
     *     tags:
     *       - Trips
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/actors'
     */
    app
        .route("/trips")
        .get(trip.list_all_trips)
        .post(trip.create_a_trip);
    /**
     * @swagger
     * /trips/:tripId:
     *   get:
     *     tags:
     *       - Trips
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
     * /trips/:tripId:
     *   put:
     *     tags:
     *       - Trips
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
     * /trips/:tripId:
     *   delete:
     *     tags:
     *       - Trips
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/actors'
     */
    app
        .route("/trips/:tripId")
        .get(trip.read_a_trip)
        .put(trip.update_a_trip)
        .delete(trip.delete_a_trip);

};