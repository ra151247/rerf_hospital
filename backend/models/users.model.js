const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender:{type: String, required: true},
    age: {type: Number, required: true},
    phoneNo: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
},{
    timestamps: true
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;