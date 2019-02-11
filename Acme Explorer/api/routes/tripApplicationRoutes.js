"use strict";
module.exports = function(app) {
  var tripApplication = require("../controllers/tripApplicationController");

  app
    .route("/tripApplications")
    .get(tripApplication.list_all_tripApplications)
    .post(tripApplication.create_a_tripApplication);

  app
    .route("/tripApplications/:tripApplicationId")
    .get(tripApplication.read_a_tripApplication)
    .put(tripApplication.update_a_tripApplication)
    .delete(tripApplication.delete_a_tripApplication);
};
