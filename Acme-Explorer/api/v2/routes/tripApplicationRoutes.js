"use strict";
module.exports = function (app) {
  var tripApplication = require("../controllers/tripApplicationController");

  /**
   * @swagger
   * /v2/tripApplications:
   *   get:
   *     tags:
   *       - TripApplication
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/TripApplication'
   *   post:
   *     tags:
   *       - TripApplication
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/TripApplication'
   */
  app
    .route("/v2/tripApplications")
    .get(tripApplication.list_all_tripApplications)
    .post(tripApplication.create_a_tripApplication);

  /**
   * @swagger
   * /v2/tripApplications/:tripApplicationId:
   *   get:
   *     tags:
   *       - TripApplication
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/TripApplication'
   *   put:
   *     tags:
   *       - TripApplication
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/TripApplication'
   *   delete:
   *     tags:
   *       - TripApplication
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/TripApplication'
   */
  app
    .route("/v2/tripApplications/:tripApplicationId")
    .get(tripApplication.read_a_tripApplication)
    .put(tripApplication.update_a_tripApplication)
    .delete(tripApplication.delete_a_tripApplication);

  /**
   * @swagger
   * /v2/tripApplications/:tripApplicationId/pay:
   *   get:
   *     tags:
   *       - TripApplication
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/TripApplication'
   */
  app
    .route("/v2/tripApplications/pay/:tripApplicationId")
    .get(tripApplication.pay_a_tripApplication);

  /**
   * @swagger
   * /v2/tripApplications/list/:actorId:
   *   get:
   *     tags:
   *       - TripApplication
   *     description: Returns all actor's trip applications
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/TripApplication'
   */
  app
    .route("/v2/myTripApplications")
    .get(tripApplication.list_an_actor_applications);
};
