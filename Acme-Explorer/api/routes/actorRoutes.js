"use strict";
module.exports = function (app) {
    var actors = require("../controllers/actorController");

    /**
     * @swagger
     * /v1/actors:
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
     *       200:
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/Actor'
     */
    app
        .route("/v1/actors")
        .get(actors.list_all_actors)
        .post(actors.create_an_actor);



    /**
     * @swagger
     * /v1/actors/:actorId:
     *   get:
     *     tags:
     *       - Actor
     *     summary: Return the actor specificate with the id
     *     description: Return the actor specificate with the id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: actorId
     *         in: path
     *         description: ID of actor to return
     *         required: true
     *         type: integer
     *         format: int64
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
     *       - in: actorId
     *         name: actorId
     *         description: Delete an Actor
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
     */
    app
        .route("/v1/actors/:actorId")
        .get(actors.read_an_actor)
        .put(actors.update_an_actor)
        .delete(actors.delete_an_actor);
};