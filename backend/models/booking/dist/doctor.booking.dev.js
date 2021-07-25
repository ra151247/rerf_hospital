"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var doctorBookingSchema = new Schema({
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
var DoctorBooking = mongoose.model('DoctorBook', doctorBookingSchema);
module.exports = DoctorBooking;