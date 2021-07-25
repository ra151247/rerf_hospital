"use strict";

var router = require('express').Router();

var Pharmacy = require('../models/pharmacy.model');

router.route('/').get(function (req, res) {
  Pharmacy.find().then(function (pharmacy) {
    return res.json(pharmacy);
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var name = req.body.name;
  var pricePerUnit = Number(req.body.pricePerUnit);
  var mfgDate = req.body.mfgDate;
  var expDate = req.body.expDate;
  var newPharmacy = new Pharmacy({
    name: name,
    pricePerUnit: pricePerUnit,
    mfgDate: mfgDate,
    expDate: expDate
  });
  newPharmacy.save().then(function () {
    res.json('pharmacy saved!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id').get(function (req, res) {
  Pharmacy.findById(req.params.id).then(function (pharmacy) {
    return res.json(pharmacy);
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/:id')["delete"](function (req, res) {
  Pharmacy.findByIdAndDelete(req.params.id).then(function (pharmacy) {
    return res.json('pharmacy deleted: ');
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/update/:id').post(function (req, res) {
  Pharmacy.findById(req.params.id).then(function (pharmacy) {
    pharmacy.name = req.body.name;
    pharmacy.pricePerUnit = Number(req.body.pricePerUnit);
    pharmacy.mfgDate = req.body.mfgDate;
    pharmacy.expDate = req.body.expDate;
    pharmacy.save().then(function () {
      return res.json('Pharmacy updated!');
    })["catch"](function (err) {
      return res.status(400).json('ERROR: ' + err);
    });
  });
});
module.exports = router;