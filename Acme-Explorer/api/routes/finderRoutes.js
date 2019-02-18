"use strict";
module.exports = function(app) {
  var finders = require("../controllers/finderController");
  /**
   * @swagger
   * /v1/finders:
   *   post:
   *     tags:
   *       - Finder
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/Finder'
   */
  app.route("/v1/finders").post(finders.create_a_finder);
  /**
   * @swagger
   * /v1/finders/:actorId:
   *   get:
   *     tags:
   *       - Finder
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/Finder'
   *   put:
   *     tags:
   *       - Finder
   *     description: Returns all actors
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of actors
   *         schema:
   *           $ref: '#/definitions/Finder'
   */
  app
    .route("/v1/finders/:actorId")
    .get(finders.read_a_finder)
    .put(finders.update_a_finder);
};
