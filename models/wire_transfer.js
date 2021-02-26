const mongoose = require('mongoose');


const wireTransferSchema = mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true,
    },
    account_name_holder: {
        type: String,
    },
    account_holder_phone: {
        type: String
    },
    account_holder_email: {
        type: String,
    },
    account_holder_address: {
        type: String
    },
    account_number: {
        type: Number
    },
    account_type: {
        type: String
    },
    account_currency: {
        type: String
    },
    amount_to_transfer: {
        type: Number,
        default: 0.0
    },
    beneficiary_name: {
        type: String,
        required: true
    },
    beneficiary_phone: {
        type: String,
        required: true
    },
    beneficiary_email: {
        type: String,
        required: true,
    },
    beneficiary_address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    beneficiary_bank_name: {
        type: String,
        required: true
    },
    beneficiary_bank_address: {
        type: String,
        required: true
    },
    beneficiary_bank_account_number: {
        type: String,
        required: true
    },
    beneficiary_account_type: {
        type: String,
        required: true
    },
    beneficiary_account_currency: {
        type: String,
        required: true
    },
    beneficiary_bank_swift_iban: {
        type: String,
        required: true
    }
});

const WireTransactions = mongoose.model('Wire_Transfers', wireTransferSchema)

module.exports = WireTransactions;