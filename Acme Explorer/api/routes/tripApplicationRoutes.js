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
     * /tripApplications:
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
     * /tripApplications:
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
        .route("/tripApplications")
        .get(tripApplication.list_all_tripApplications)
        .post(tripApplication.create_a_tripApplication);
    /**
     * @swagger
     * /tripApplications/:tripApplicationId:
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
     * /tripApplications/:tripApplicationId:
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
     * /tripApplications/:tripApplicationId:
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
        .route("/tripApplications/:tripApplicationId")
        .get(tripApplication.read_a_tripApplication)
        .put(tripApplication.update_a_tripApplication)
        .delete(tripApplication.delete_a_tripApplication);
};