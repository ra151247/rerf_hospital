"use strict";

var router = require('express').Router();

var Doctors = require('../models/doctors.model');

router.route('/').get(function (req, res) {
  Doctors.find().then(function (doctors) {
    return res.json(doctors);
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var experience = Number(req.body.experience);
  var speciality = req.body.speciality;
  var availableTiming = req.body.availableTiming;
  var price = Number(req.body.price);
  var newDoctor = new Doctors({
    name: name,
    email: email,
    experience: experience,
    speciality: speciality,
    availableTiming: availableTiming,
    price: price
  });
  newDoctor.save().then(function () {
    res.json('Doctor saved!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id').get(function (req, res) {
  Doctors.findById(req.params.id).then(function (doctor) {
    return res.json(doctor);
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/:id')["delete"](function (req, res) {
  Doctors.findByIdAndDelete(req.params.id).then(function (doctor) {
    return res.json('Doctor deleted: ');
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/update/:id').post(function (req, res) {
  Doctors.findById(req.params.id).then(function (doctor) {
    doctor.name = req.body.name;
    doctor.email = req.body.email;
    doctor.speciality = req.body.speciality;
    doctor.experience = Number(req.body.experience);
    doctor.availableTiming = req.body.availableTiming;
    doctor.price = Number(req.body.price);
    doctor.save().then(function () {
      return res.json('Doctor updated!');
    })["catch"](function (err) {
      return res.status(400).json('ERROR: ' + err);
    });
  });
});
module.exports = router;