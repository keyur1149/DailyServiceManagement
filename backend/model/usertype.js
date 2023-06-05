const mongoose = require('mongoose')


const usertype = new mongoose.Schema({
    user_type_name: {
        type: String,
        required: true,
        unique: true
    },
});
const Usertype = mongoose.model('Usertype', usertype);
module.exports = Usertype;