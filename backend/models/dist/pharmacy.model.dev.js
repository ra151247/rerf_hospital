"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pharmacySchema = new Schema({
  email: {type: String, required: true},
  name: {type: String, required: true},
  pricePerUnit: {type: Number, required: true},
  quantity: {type: Number, required: true},
  totalprice: {type: Number, required: true},
  status: {type: String, required: true}
 } , {
  timestamps: true
});
var Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
module.exports = Pharmacy;