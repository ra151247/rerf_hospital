const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const doctorBookRouter = require('./routes/dcotorBook');
const doctorsRouter = require('./routes/doctors');
const pharmacyRouter = require('./routes/pharmacy');
const serviceBookRouter = require('./routes/serviceBook');
const servicesRouter = require('./routes/services');
const usersRouter  = require('./routes/users');
const pharmacyBookRouter = require('./routes/pharmacyBook');

app.use('/doctorBook', doctorBookRouter);
app.use('/doctors', doctorsRouter);
app.use('/pharmacy', pharmacyRouter);
app.use('/serviceBook', serviceBookRouter);
app.use('/services', servicesRouter);
app.use('/users', usersRouter)
app.use('/pharmacyBook', pharmacyBookRouter);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})