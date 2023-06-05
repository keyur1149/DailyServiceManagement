const mongoose = require('mongoose')
const bcrpty = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Usertype = require('./usertype');


const user = new mongoose.User({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    Usertype: {
        type: Usertype,
        required: true,
    }
});


user.pre('save', async function(next) {
    console.log("enter schema");

    if (this.isModified('password')) {
        console.log("save password function in");
        const salt = await bcrpty.genSalt(10);
        const hash = await bcrpty.hash(this.password, salt)
        this.password = hash;
        this.password = bcrpty.hash(this.password, 10);
    }
    next();

});




const User = mongoose.model('Usertype', user);
module.exports = User;