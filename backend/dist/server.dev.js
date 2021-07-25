"use strict";

var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
var uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB database connection established succesfully");
});

var doctorBookRouter = require('./routes/dcotorBook');

var doctorsRouter = require('./routes/doctors');

var pharmacyRouter = require('./routes/pharmacy');

var serviceBookRouter = require('./routes/serviceBook');

var servicesRouter = require('./routes/services');

var usersRouter = require('./routes/users');

app.use('/doctorBook', doctorBookRouter);
app.use('/doctors', doctorsRouter);
app.use('/pharmacy', pharmacyRouter);
app.use('/serviceBook', serviceBookRouter);
app.use('/services', servicesRouter);
app.use('/users', usersRouter);
app.listen(port, function () {
  console.log("server is running on port: ".concat(port));
});