"use strict";
module.exports = function(app) {
    var tripApplication = require("../controllers/tripApplicationController");
    /**
     * @swagger
     * definitions:
     *   TripAplications:
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
     *   name: TripAplications
     *   description: User management and login
     */
    /**
     * @swagger
     * /v1/tripApplications:
     *   get:
     *     tags:
     *       - TripAplications
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
     * /v1/tripApplications:
     *   post:
     *     tags:
     *       - TripAplications
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
        .route("/v1/tripApplications")
        .get(tripApplication.list_all_tripApplications)
        .post(tripApplication.create_a_tripApplication);

    /**
     * @swagger
     * /v1/tripApplications/:tripApplicationId:
     *   get:
     *     tags:
     *       - TripAplications
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
     * /v1/tripApplications/:tripApplicationId:
     *   put:
     *     tags:
     *       - TripAplications
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
     * /v1/tripApplications/:tripApplicationId:
     *   delete:
     *     tags:
     *       - TripAplications
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
        .route("/v1/tripApplications/:tripApplicationId")
        .get(tripApplication.read_a_tripApplication)
        .put(tripApplication.update_a_tripApplication)
        .delete(tripApplication.delete_a_tripApplication);

    app
        .route("/v1/tripApplications/:actorId")
        .get(trip.list_actor_applications)

    app
        .route("/v1/tripApplications/:tripApplicationId/pay")
        .get(tripApplication.pay_a_tripApplication)
};