"use strict";
/*---------------ACTOR----------------------*/
var mongoose = require("mongoose"),
    Actor = mongoose.model("Actors");

exports.list_all_actors = function(req, res) {
    //Check if the role param exist
    var roleName;
    if (req.query.role) {
        roleName = req.query.role;
    }
    //Adapt to find the actors with the specified role
    Actor.find({}, function(err, actors) {
        if (err) {
            res.send(err);
        } else {
            res.json(actors);
        }
    });
};

exports.create_an_actor = function(req, res) {
    var new_actor = new Actor(req.body);
    /* if((new_actor.role.includes('MANAGER')) and not logged as admin){
      error
    }  */
    /*if (!checkSponsorFields(new_actor)) {
        res
            .status(400)
            .send("BAD REQUEST: A non-sponsor actor cannot have a banner or link");
    }*/
    new_actor.save(function(err, actor) {
        if (err) {
            res.send(err);
        } else {
            res.json(actor);
        }
    });
};

exports.read_an_actor = function(req, res) {
    console.log(req);
    Actor.findById(req.params.actorId, function(err, actor) {
        console.log(actor);
        if (err) {
            res.send(err);
        } else {
            res.json(actor);
        }
    });
};

exports.update_an_actor = function(req, res) {
    //Check that the user is an Administrator or the proper Actor and if not: res.status(403); "an access token is valid, but requires more privileges"
    /*if (!checkSponsorFields(new Actor(req.body))) {
        res
            .status(400)
            .send("BAD REQUEST: A non-sponsor actor cannot have a banner or link");
    }*/
    Actor.findOneAndUpdate({ _id: req.params.actorId },
        req.body, { new: true },
        function(err, actor) {
            if (err) {
                res.send(err);
            } else {
                res.json(actor);
            }
        }
    );
};

exports.delete_an_actor = function(req, res) {
    //Check that the user is an Administrator or the proper Actor and if not: res.status(403); "an access token is valid, but requires more privileges"
    Actor.findById({ _id: req.params.actorId }, function(err, actor) {
        if (err) {
            res.send(err);
        } else {
            actor.deleted = true;
            actor.save(function(err, actor) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: "Actor successfully deleted" });
                }
            });
        }
    });
};

/*let checkSponsorFields = function(actor) {

};*/