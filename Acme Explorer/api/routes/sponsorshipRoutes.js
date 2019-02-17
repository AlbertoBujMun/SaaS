"use strict";
module.exports = function(app) {
  var sponsorships = require("../controllers/sponsorshipController");

  app
    .route("/v1/sponsorships")
    .post(sponsorships.create_a_sponsorship);

  app
    .route("/v1/sponsorships/:sponsorshipId")
    .get(sponsorships.read_a_sponsorship)
    .put(sponsorships.update_a_sponsorship)
    .delete(sponsorships.delete_a_sponsorship)
  
  app
    .route("/v1/sponsorships/own")
    .get(sponsorships.list_sponsorships)

  app
    .route("/v1/sponsorships/:sponsorshipId/pay")
    .get(tripApplication.pay_a_sponsorship)

  app
    .route("/v1/sponsorships/random/:ticker")
    .get(tripApplication.find_random)

    
};

