"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var serviceBookingSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
var ServiceBooking = mongoose.model('ServiceBook', serviceBookingSchema);
module.exports = ServiceBooking;