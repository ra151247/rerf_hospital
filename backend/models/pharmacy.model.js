const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
    name:{type: String, required: true},
    pricePerUnit: {type: Number, required:true},
    mfgDate: {type: String, required:true},
    expDate: {type: String, required:true},
},{
    timestamps: true
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;