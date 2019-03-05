"use strict";
module.exports = function (app) {
  var sponsorships = require("../controllers/sponsorshipController");
  /**
   * @swagger
   * /v2/sponsorships:
   *   post:
   *     tags:
   *       - SponsorShip
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   *
   */
  app.route("/v2/sponsorships").post(sponsorships.create_a_sponsorship);
  /**
   * @swagger
   * /v2/sponsorships/:sponsorshipId:
   *   get:
   *     tags:
   *       - SponsorShip
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   *   put:
   *     tags:
   *       - SponsorShip
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   *   delete:
   *     tags:
   *       - SponsorShip
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app
    .route("/v2/sponsorships/:sponsorshipId")
    .get(sponsorships.read_a_sponsorship)
    .put(sponsorships.update_a_sponsorship)
    .delete(sponsorships.delete_a_sponsorship);
  /**
   * @swagger
   * /v2/sponsorships/own:
   *   get:
   *     tags:
   *       - SponsorShip
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app.route("/v2/sponsorships/own").get(sponsorships.list_sponsorships);
  /**
   * @swagger
   * /v2/sponsorships/:sponsorshipId/pay:
   *   get:
   *     tags:
   *       - SponsorShip
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app
    .route("/v2/sponsorships/:sponsorshipId/pay")
    .get(sponsorships.pay_a_sponsorship);
  /**
   * @swagger
   * /v2/sponsorships/random/:ticker:
   *   get:
   *     tags:
   *       - SponsorShip
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app.route("/v2/sponsorships/random/:ticker").get(sponsorships.find_random);
};
