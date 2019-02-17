"use strict";
module.exports = function(app) {
  var systemInformations = require("../controllers/systemInformationController");

  app
    .route("/v1/dashboard")
    .get(systemInformations.get_dashboard)

  app
    .route("/v1/cube")
    .get(systemInformations.cube)
    
  app
    .route("/v1/systemInformation")
    .put(systemInformations.update_systemInformation)
    .get(systemInformations.read_systemInformations)

    
};

