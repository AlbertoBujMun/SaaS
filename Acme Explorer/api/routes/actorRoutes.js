"use strict";
module.exports = function(app) {
  var actors = require("../controllers/actorController");

/**
   * Get an actor with any role
   *   RequiredRoles: Administrator
   * Post an actor
   *    RequiredRoles: None
   *    Administrator login required if Actor role is manager
	 *
	 * @section actors
	 * @type get post
	 * @url /v1/actors
   * @param {string} role (clerk|administrator|customer) 
  */

  app
    .route("/v1/actors")
    .get(actors.list_all_actors)
    .post(actors.create_an_actor);

    /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: to be the proper actor or an Administrator
   * Delete an actor
   *    RequiredRoles: to be the proper actor
	 *
	 * @section actors
	 * @type get put
	 * @url /v1/actors/:actorId
  */  

  app
    .route("/v1/actors/:actorId")
    .get(actors.read_an_actor)
    .put(actors.update_an_actor)
    .delete(actors.delete_an_actor);
};
