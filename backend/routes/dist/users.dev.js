"use strict";

var router = require('express').Router();

var Users = require('../models/users.model');

router.route('/').get(function (req, res) {
  Users.find().then(function (user) {
    return res.json(user);
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var name = req.body.name;
  var phoneNo = Number(req.body.phoneNo);
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  var newUsers = new Users({
    name: name,
    phoneNo: phoneNo,
    email: email,
    password: password,
    role: role
  });
  newUsers.save().then(function () {
    res.json('user saved!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id').get(function (req, res) {
  Users.findById(req.params.id).then(function (user) {
    return res.json(user);
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/:id')["delete"](function (req, res) {
  Users.findByIdAndDelete(req.params.id).then(function (user) {
    return res.json('Service deleted: ');
  })["catch"](function (err) {
    return res.status(400).json('ERROR: ' + err);
  });
});
router.route('/updateUsers/:id').post(function (req, res) {
  Users.findById(req.params.id).then(function (stock) {
    stock.name = res.data.name;
    stock.phoneNo = Number(res.data.phoneNo);
    stock.email = res.data.email;
    stock.password = res.data.password;
    stock.role = res.data.role;
    stock.save().then(function () {
      return res.json('user availablity data updated!');
    })["catch"](function (err) {
      return res.json('ERROR: ' + err);
    });
  });
});
router.route('/update/:id').post(function (req, res) {
  Users.findById(req.params.id).then(function (stock) {
    stock.name = req.body.name;
    stock.phoneNo = Number(req.body.phoneNo);
    stock.email = req.body.email;
    stock.password = req.body.password;
    stock.role = req.body.role;
    stock.save().then(function () {
      return res.json('user updated!');
    })["catch"](function (err) {
      return res.status(400).json('ERROR: ' + err);
    });
  });
});
module.exports = router;