"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
/**
 * @swagger
 * tags:
 *   name: Actor
 *   description:
 */
/**
 * @swagger
 * definitions:
 *   Actor:
 *     required:
 *       - name
 *       - surname
 *       - email
 *       - password
 *       - phoneNumber
 *       - role
 *       - banner
 *       - link
 *     properties:
 *       name:
 *          type: string
 *       surname:
 *          type: string
 *       email:
 *          type: string
 *       password:
 *          type: string
 *       preferedLanguage:
 *          type: string
 *       phoneNumber:
 *          type: string
 *       address:
 *          type: string
 *       role:
 *          type: string
 *       deleted:
 *          type: boolean
 *       banned:
 *          type: boolean
 *       created:
 *          type: string
 *          format: date
 *       banner:
 *          type: string
 *       link:
 *          type: string
 */

var ActorSchema = new Schema({
    name: {
        type: String,
        required: "Kindly enter the actor name"
    },
    surname: {
        type: String,
        required: "Kindly enter the actor surname"
    },
    email: {
        type: String,
        required: "Kindly enter the actor email",
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        minlength: 5,
        required: "Kindly enter the actor password"
    },
    preferredLanguage: {
        type: String,
        default: "en"
    },
    phoneNumber: {
        type: String,
        required: "Kindly enter the phone number"
    },
    address: {
        type: String
    },
    role: [{
        type: String,
        required: "Kindly enter the user role(s)",
        enum: ["MANAGER", "EXPLORER", "ADMINISTRATOR", "SPONSOR"]
    }],
    deleted: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

ActorSchema.index({ email: 1 });

ActorSchema.pre("save", function(callback) {
    var actor = this;
    // Break out if the password hasn't changed
    if (!actor.isModified("password")) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(actor.password, salt, function(err, hash) {
            if (err) return callback(err);

            actor.password = hash;
            callback();
        });
    });
});

ActorSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        console.log("verifying password in actorModel: " + password);
        if (err) return cb(err);
        console.log("iMatch: " + isMatch);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Actors", ActorSchema);