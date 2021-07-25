const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorBookingSchema = new Schema({
    email: {type: String, required: true},
    patientName: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
    doctor: {type: String, required: true},
    department: {type: String, required: true},
    note: {type: String, required: true},
    status: {type: String, required: true},
},{
    timestamps: true
});

const DoctorBooking = mongoose.model('DoctorBook', doctorBookingSchema);

module.exports = DoctorBooking;