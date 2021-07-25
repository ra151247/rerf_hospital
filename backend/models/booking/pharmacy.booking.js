const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pharmacyBookingSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    pricePerUnit: {type: Number, required: true},
    quantity: {type: Number, required: true},
    totalprice: {type: Number, required: true},
    status: {type: String, required: true}
},{
    timestamps: true
});

const PharmacyBooking = mongoose.model('PharmacyBook', pharmacyBookingSchema);

module.exports = PharmacyBooking;