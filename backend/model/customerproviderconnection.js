const mongoose = require('mongoose')

const customerprovider = new mongoose.Schema({
    provider_id: {
        type: String,
        required: true,
    },
    customer_id: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        default: false,
    },
    dates: {
        type: Array,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    }
})
const Cutomerproviderconnection = mongoose.model('cutomerproviderconnection', customerprovider);
module.exports = Cutomerproviderconnection;