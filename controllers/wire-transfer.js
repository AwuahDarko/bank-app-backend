const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret');
const WireTransactions = require('../models/wire_transfer');


exports.makeWireTransfer = (req, res) => {

    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).json({ message: 'Unauthourized' })
            return
        }
        // const _id = authData.user.id;
        const { user_id,
            account_name_holder,
            account_holder_phone,
            account_holder_email,
            account_holder_address,
            account_number,
            account_type,
            account_currency,
            amount_to_transfer,
            beneficiary_name,
            beneficiary_phone,
            beneficiary_email,
            beneficiary_address,
            beneficiary_country,
            beneficiary_bank_name,
            beneficiary_bank_address,
            beneficiary_bank_account_number,
            beneficiary_account_type,
            beneficiary_account_currency,
            beneficiary_bank_swift_iban } = req.body;

        const wireTransactions = new WireTransactions({
            user_id,
            account_name_holder,
            account_holder_phone,
            account_holder_email,
            account_holder_address,
            account_number,
            account_type,
            account_currency,
            amount_to_transfer,
            beneficiary_name,
            beneficiary_phone,
            beneficiary_email,
            beneficiary_address,
            beneficiary_country,
            beneficiary_bank_name,
            beneficiary_bank_address,
            beneficiary_bank_account_number,
            beneficiary_account_type,
            beneficiary_account_currency,
            beneficiary_bank_swift_iban
        })

        wireTransactions.save().then((response) => {
            res.status(200).json({ message: "Wired transfer data saved successfully", data: { "wired_id": response._id } })
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: "Sorry could not complete transfer, try again later" })
        })

    })
}

exports.getWireTransfer = (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).json({ message: 'Unauthourized' })
            return
        }

        const id = req.query.id;
        WireTransactions.findOne({ _id: id })
            .then(results => {
                if (results.length == 0) {
                    res.status(404).json({ message: 'No transaction was found' });
                    return
                }

                res.status(200).json({ message: "Found", data: results });
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Sorry could not get data' })
            })
    })
}

exports.getWiredTransferStatus = (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).json({ message: 'Unauthourized' })
            return
        }

        const id = authData.user.id;

        WireTransactions.find({ $and: [{ status: { $nin: ['completed'] }, user_id: id }] })
            .then(results => {
                if (results.length == 0) {
                    res.status(404).json({ message: 'No transaction was found' });
                    return
                }

                res.status(200).json({ message: "You have uncompleted wire transfers", data: results });
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Sorry could not get data' })
            })
    })
}


exports.updateWireTransfer = (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).json({ message: 'Unauthourized' })
            return
        }

        const {
            id,
            user_id,
            account_name_holder,
            account_holder_phone,
            account_holder_email,
            account_holder_address,
            account_number,
            account_type,
            account_currency,
            amount_to_transfer,
            beneficiary_name,
            beneficiary_phone,
            beneficiary_email,
            beneficiary_address,
            beneficiary_country,
            beneficiary_bank_name,
            beneficiary_bank_address,
            beneficiary_bank_account_number,
            beneficiary_account_type,
            beneficiary_account_currency,
            beneficiary_bank_swift_iban } = req.body;



        WireTransactions.updateOne({ _id: id }, {
            account_name_holder,
            account_holder_phone,
            account_holder_email,
            account_holder_address,
            account_number,
            account_type,
            account_currency,
            amount_to_transfer,
            beneficiary_name,
            beneficiary_phone,
            beneficiary_email,
            beneficiary_address,
            beneficiary_country,
            beneficiary_bank_name,
            beneficiary_bank_address,
            beneficiary_bank_account_number,
            beneficiary_account_type,
            beneficiary_account_currency,
            beneficiary_bank_swift_iban
        }).then(results => {
            res.status(200).json({ message: "Wire transfer was updated successfuly", data: results })
        })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Sorry could not completes update' })
            })

    })
}