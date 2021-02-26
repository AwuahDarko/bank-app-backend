const mongoose = require('mongoose');

const cotCodeSchema = mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    transaction_type: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const CotCodes = mongoose.model('cot_codes', cotCodeSchema)

module.exports = CotCodes