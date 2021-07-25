"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNo: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Users = mongoose.model('Users', usersSchema);
module.exports = Users;