const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        dropDups: true,
        required: true,
    },
    pin: { // will be used as password
        type: String,
        default: '19191919'
    },
    user_id: {
        type: Number,
        unique: true,
        dropDups: true,
        required: true,
    },
    account_number: {
        type: Number,
        unique: true,
        dropDups: true,
        required: true,
    },
    phone_code: {
        type: String,
    },
    phone: {
        type: String,
    },
    ssn_or_id: {
        type: String,
    },
    gender: {
        type: String
    },
    country: {
        type: String
    },
    dob: {
        type: Date
    },
    occupation: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    email_verifed: {
        type: Boolean,
        default: false
    },
    email_verifed_at: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: 'inactive' // not-verified, active, deleted, inactive
    },
    application_status: {
        type: String,
        default: 'started' // completed
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema)

module.exports = User;