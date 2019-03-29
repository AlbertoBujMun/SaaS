"use strict";
module.exports = function(app) {
  var sponsorships = require("../controllers/sponsorshipController");
  /**
   * @swagger
   * /v2/sponsorships:
   *   post:
   *     tags:
   *       - SponsorShip
   *     description: Creates a new sponsorship
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *             $ref: "#/definitions/Sponsorship"
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Returns the newly created sponsorship
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app.route("/v2/sponsorships").post(sponsorships.create_a_sponsorship);
  /**
   * @swagger
   * /v2/sponsorships/{sponsorshipId}:
   *   get:
   *     tags:
   *       - SponsorShip
   *     description: Searchs and returns a sponsorship
   *     parameters:
   *       - in: path
   *         name: sponsorshipId
   *         description: Sponsorship that you want to read
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: The sponsorship required
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   *   put:
   *     tags:
   *       - SponsorShip
   *     description: Modifys a sponsorship
   *     parameters:
   *       - in: path
   *         name: sponsorshipId
   *         description: Sponsorship that you want to modify
   *         required: true
   *         type: string
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *             $ref: "#/definitions/Sponsorship"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: The modified sponsorship
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   *   delete:
   *     tags:
   *       - SponsorShip
   *     description: Deletes a sponsorship
   *     parameters:
   *       - in: path
   *         name: sponsorshipId
   *         description: Sponsorship that you want to delete
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns a confirmation of deletion
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
   * /v2/sponsorships/actor/{actorId}:
   *   get:
   *     tags:
   *       - SponsorShip
   *     description: Returns all of the actors sponsorships
   *     parameters:
   *       - in: path
   *         name: actorId
   *         description: Actor who's sponsorships you want to search
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of sponsorships
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app
    .route("/v2/sponsorships/actor/:actorId")
    .get(sponsorships.list_sponsorships);
  /**
   * @swagger
   * /v2/sponsorships/{sponsorshipId}/pay:
   *   put:
   *     tags:
   *       - SponsorShip
   *     description: Pay for a sponsorship
   *     parameters:
   *       - in: path
   *         name: sponsorshipId
   *         description: Sponsorship that you want to pay for
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the sponsorship paid for
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app
    .route("/v2/sponsorships/:sponsorshipId/pay")
    .put(sponsorships.pay_a_sponsorship);
  /**
   * @swagger
   * /v2/sponsorships/random/{ticker}:
   *   get:
   *     tags:
   *       - SponsorShip
   *     description: Returns a random sponsorship for the given trip
   *     parameters:
   *       - in: path
   *         name: ticker
   *         description: Ticker of the trip you are searching sponsorships for
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: The random sponsorship
   *         schema:
   *           $ref: '#/definitions/SponsorShip'
   */
  app.route("/v2/sponsorships/random/:ticker").get(sponsorships.find_random);
};
