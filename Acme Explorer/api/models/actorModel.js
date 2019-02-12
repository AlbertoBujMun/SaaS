'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the actor name'
  },
  surname: {
    type: String,
    required: 'Kindly enter the actor surname'
  },
  email: {
    type: String,
    required: 'Kindly enter the actor email'
  },
  password: {
    type: String,
    minlength:5,
    required: 'Kindly enter the actor password'
  },
  preferredLanguage:{
    type : String,
    default : "en"
  },
  phoneNumber: {
    type: String,
    required: 'Kindly enter the phone number'
  },
  address:{
    type: String
  },
  role: [{
    type: String,
    required: 'Kindly enter the user role(s)',
    enum: ['MANAGER', 'EXPLORER', 'ADMINISTRATOR', 'SPONSOR']
  }],
  deleted:{
    type: Boolean,
    default: false
  },
  banned:{
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  banner: {
    data: Buffer,
    contentType: String,
    required: [isSponsor,'Kindly enter a sponsor banner']
  },
  link: {
    contentType: String,
    required: [isSponsor,'Kindly enter a sponsor link']
  }
}, { strict: false });

function isSponsor() { return this.role === 'SPONSOR'; }

module.exports = mongoose.model('Actors', ActorSchema);