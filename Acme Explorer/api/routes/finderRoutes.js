"use strict";
module.exports = function(app) {
  var finders = require("../controllers/finderController");

  app
    .route("/v1/finders")
    .post(finders.create_a_finder);

  app
    .route("/v1/finders/:actorId")
    .get(finders.read_a_finder)
    .put(finders.update_a_finder)


    
};

