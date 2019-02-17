"use strict";
module.exports = function(app) {
    var actors = require("../controllers/actorController");
    /**
     * @swagger
     * definitions:
     *   Actor:
     *     required:
     *       - name
     *       - surname
     *       - email
     *       - password
     *       - preferedLanguage
     *       - phoneNumber
     *       - address
     *       - role
     *       - deleted
     *       - banned
     *       - created
     *     properties:
     *       name:
     *          type: string
     *       surname:
     *          type: string
     *       email:
     *          type: string
     *       password:
     *          type: string
     *       preferedLanguage:
     *          type: string
     *       phoneNumber:
     *          type: string
     *       address:
     *          type: string
     *       role:
     *          type: string
     *       deleted:
     *          type: boolean
     *       banned:
     *          type: boolean
     *       created:
     *          type: date
     */

    /**
     * @swagger
     * tags:
     *   name: Actors
     *   description: User management and login
     */
    /**
     * @swagger
     * /v1/actors:
     *   get:
     *     tags:
     *       - Actors
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
     *           $ref: '#/definitions/Actors'
     */
    /**
     * @swagger
     * /v1/actors:
     *   post:
     *     tags:
     *       - Actors
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Actors'
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
     *       - Actors
     *     description: Return the actor specificate with the id
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An actor
     *         schema:
     *           $ref: '#/definitions/Actors'
     */
    /**
     * @swagger
     * /v1/actors/:actorId:
     *   put:
     *     tags:
     *       - Actors
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Actors'
     */
    /**
     * @swagger
     * /v1/actors/:actorId:
     *   delete:
     *     tags:
     *       - Actors
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/Actors'
     */
    app
        .route("/v1/actors/:actorId")
        .get(actors.read_an_actor)
        .put(actors.update_an_actor)
        .delete(actors.delete_an_actor);
};