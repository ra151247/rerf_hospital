const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    name:{type: String, required: true},
    description: {type: String, required: true},
    pricePerUnit: {type: Number, required:true},
    totalUnits: {type: Number, required:true},
    totalUnitsAvailable: {type: Number, required:true},
},{
    timestamps: true
});

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;