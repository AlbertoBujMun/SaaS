"use strict";
module.exports = function (app) {
    var systemInformations = require("../controllers/systemInformationController");
    /**
     * @swagger
     * /v2/dashboard:
     *   post:
     *     tags:
     *       - SystemInformation
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/SystemInformation'
     * 
     */
    app
        .route("/v2/dashboard")
        .get(systemInformations.get_dashboard)
    /**
     * @swagger
     * /v2/cube:
     *   post:
     *     tags:
     *       - SystemInformation
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/SystemInformation'
     * 
     */
    app
        .route("/v2/cube")
        .get(systemInformations.cube)
    /**
     * @swagger
     * /v2/systemInformation:
     *   put:
     *     tags:
     *       - SystemInformation
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/SystemInformation'
     *   get:
     *     tags:
     *       - SystemInformation
     *     description: Returns all actors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actors
     *         schema:
     *           $ref: '#/definitions/SystemInformation'
     * 
     */
    app
        .route("/v2/systemInformation")
        .put(systemInformations.update_systemInformation)
        .get(systemInformations.read_systemInformations)


};