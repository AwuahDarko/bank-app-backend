const mongoose = require('mongoose');

const adninSchema = mongoose.Schema({
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    privileges: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

const Admin = mongoose.model('Admin', adninSchema)

module.exports = Admin;