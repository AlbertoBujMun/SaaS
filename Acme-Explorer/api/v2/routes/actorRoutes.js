"use strict";
module.exports = function(app) {
    var actors = require("../controllers/actorController");
    var authController = require("../controllers/authController");

    /**
     * @swagger
     * /v2/actors:
     *   get:
     *     tags:
     *       - Actor
     *     summary: Returns all actors
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/Actor'
     *   post:
     *     tags:
     *       - Actor
     *     summary: Create an actor
     *     description: Create an actor
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Create Actor
     *         required: true
     *         schema:
     *             $ref: "#/definitions/Actor"
     *     produces:
     *       - application/json
     *     responses:
     *          '200':
     *              description: OK
     *          '400':
     *              description: Bad request. User ID must be an integer and larger than 0.
     *          '401':
     *              description: Authorization information is missing or invalid.
     *          '404':
     *              description: A user with the specified ID was not found.
     *          '5XX':
     *              description: Unexpected error.
     *          schema:
     *              $ref: '#/definitions/Actor'
     */
    app
        .route("/v2/actors")
        .get(actors.list_all_actors)
        .post(actors.create_an_actor);



    /**
     * @swagger
     * /v2/actors/{actorId}:
     *   get:
     *     tags:
     *       - Actor
     *     summary: Return the actor specificate with the id
     *     description: Return the actor specificate with the id
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: actorId
     *         description: ID of actor to return
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/Actor'
     *   put:
     *     tags:
     *       - Actor
     *     summary: Update an existing Actor
     *     description: Update an existing Actor
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
     *         schema:
     *             $ref: "#/definitions/Actor"
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/Actor'
     *   delete:
     *     tags:
     *       - Actor
     *     summary: Returns an actor deleted
     *     description: Returns an actor deleted
     *     parameters:
     *       - in: path
     *         name: actorId
     *         description: Delete an Actor
     *         required: true
     *         type: string
     *         schema:
     *             $ref: "#/definitions/Actor"
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/Actor'
     */
    app
        .route("/v2/actors/:actorId")
        .get(actors.read_an_actor)
        .put(authController.verifyUser(["ADMINISTRATOR", "MANAGER", "EXPLORER", "SPONSOR"]), actors.update_an_actor);
};