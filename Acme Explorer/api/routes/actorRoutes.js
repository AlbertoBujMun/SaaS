"use strict";
module.exports = function(app) {
    var actors = require("../controllers/actorController");

    /**
     * @swagger
     * /v1/actors:
     *   get:
     *     tags:
     *       - Actor
     *     summary: Returns all actors
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: name
     *         name: name
     *         description: Name of the actor
     *         required: true   
     *       - in: surname
     *         name: surname
     *         description: Name of the actor
     *         required: true
     *       - in: email
     *         name: email
     *         description: Name of the actor
     *         required: true
     *       - in: password
     *         name: password
     *         description: Name of the actor
     *         required: true
     *       - in: preferredLanguage
     *         name: preferredLanguage
     *         description: Name of the actor
     *         required: true
     *       - in: phoneNumber
     *         name: phoneNumber
     *         description: Name of the actor
     *         required: true
     *       - in: address
     *         name: address
     *         description: Name of the actor
     *         required: true
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Actor'
     *   post:
     *     tags:
     *       - Actor
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
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
     *     description: Return the actor specificate with the id
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An actor
     *         schema:
     *           $ref: '#/definitions/Actor'
     *   put:
     *     tags:
     *       - Actor
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Actor'
     *   delete:
     *     tags:
     *       - Actor
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Actor'
     */
    app
        .route("/v1/actors/:actorId")
        .get(actors.read_an_actor)
        .put(actors.update_an_actor)
        .delete(actors.delete_an_actor);
};