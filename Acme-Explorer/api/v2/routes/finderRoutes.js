"use strict";
module.exports = function (app) {
    var finders = require("../controllers/finderController");
    /**
     * @swagger
     * /v2/finders/actor/{actorId}:
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
     */
    app
        .route("/v2/finders/actor/:actorId")
        .get(finders.read_a_finder);

        /**
     * @swagger
     * /v2/finders/{finderId}:
     *   put:
     *     tags:
     *       - Finder
     *     description: Returns an updated finder
     *     parameters:
     *       - in: path
     *         name: finderId
     *         description: Id of the finder that you want to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: body
     *         description: Updated finder
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
    .route("/v2/finders/:finderId")
    .put(finders.update_a_finder);
};