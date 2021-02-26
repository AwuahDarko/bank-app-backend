const mongoose = require('mongoose');


const transactionsSchema = mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0.0,
    },
    charge: {
        charge: Number,
        default: 0.0
    },
    reference_number: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    }
});

const Transactions = mongoose.model('Transactions', transactionsSchema)

module.exports = Transactions;