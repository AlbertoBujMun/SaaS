'use strict';
/*---------------Finder----------------------*/
var mongoose = require('mongoose'),
  Finder = mongoose.model('SystemInformations');



exports.read_systemInformations = function(req, res) {
  /* Finder.findById(req.params.FinderId, function(err, Finder) {
    if (err){
      res.send(err);
    }
    else{
      res.json(Finder);
    }
  }); */
  res.sendStatus(200)
};

exports.update_systemInformation = function(req, res) {
    //Check that the user is an Administrator or the proper Finder and if not: res.status(403); "an access token is valid, but requires more privileges"
    /* checkSponsorFields(new Finder(req.body))
    Finder.findOneAndUpdate({_id: req.params.FinderId}, req.body, {new: true}, function(err, Finder) {
        if (err){
            res.send(err);
        }
        else{
            res.json(Finder);
        }
    }); */
    res.sendStatus(200)
};

exports.get_dashboard = function(req, res) {

  res.sendStatus(200)
};

exports.cube = function(req, res) {

  res.sendStatus(200)
};
