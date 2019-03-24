"use strict";
module.exports = function (app) {
    var finders = require("../controllers/finderController");
    /**
     * @swagger
     * /v2/finders/{actorId}:
     *   get:
     *     tags:
     *       - Finder
     *     description: Returns a finder
     *     parameters:
     *       - in: path
     *         name: actorId
     *         description: ID of finder to return
     *         required: true
     *         schema:
     *           type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A finder
     *         schema:
     *           $ref: '#/definitions/Finder'
     *   put:
     *     tags:
     *       - Finder
     *     description: Returns an updated finder
     *     parameters:
     *       - in: path
     *         name: actorId
     *         description: Update an Actor
     *         required: true
     *         type: string
     *       - in: body
     *         name: body
     *         description: Update an Actor
     *         required: true
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A finder
     *         schema:
     *           $ref: '#/definitions/Finder'
     */
    app
        .route("/v2/finders/:actorId")
        .get(finders.read_a_finder)
        .put(finders.update_a_finder);
};