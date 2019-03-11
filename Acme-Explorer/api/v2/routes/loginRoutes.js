'use strict'
module.exports = function (app) {
    var actors = require('../controllers/actorController');

    /**
     * Get custom auth token, provided pass and email
     * 
     * @Section actors
     * @type get
     * @url v2/login/
     * @param {string} email
     * @param {string} password
     */

    app.route('v2/login/').get(actors.login_an_actor)

}