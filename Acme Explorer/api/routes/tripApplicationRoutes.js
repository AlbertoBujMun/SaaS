"use strict";
module.exports = function(app) {
  var tripApplication = require("../controllers/tripApplicationController");

  app
    .route("/v1/tripApplications")
    .get(tripApplication.list_all_tripApplications)
    .post(tripApplication.create_a_tripApplication);

  app
    .route("/v1/tripApplications/:actorId")
    .get(trip.list_actor_applications)

  app
    .route("/v1/tripApplications/:tripApplicationId")
    .get(tripApplication.read_a_tripApplication)
    .put(tripApplication.update_a_tripApplication)
    .delete(tripApplication.delete_a_tripApplication);

  app
    .route("/v1/tripApplications/:tripApplicationId/pay")
    .get(tripApplication.pay_a_tripApplication)
};
