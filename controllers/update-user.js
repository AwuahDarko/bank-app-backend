const uuidV4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Utility = require('../utils/utility');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret');


exports.updateUser = (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).json({ 'message': "Unauthorized access" });
            return
        }

        const _id = authData.user.id;

        const { first_name, middle_name, last_name, title, phone_code, ssn_or_id, gender, country, dob, address, phone } = req.body;

        if (typeof first_name === 'undefined' || first_name == "") {
            res.status(400).json({ message: 'Provide first name' })
            return
        }

        if (typeof last_name === 'undefined' || last_name == "") {
            res.status(400).json({ message: 'Provide last name' })
            return
        }

        if (typeof title === 'undefined' || title == "") {
            res.status(400).json({ message: 'Provide title' })
            return
        }

        if (typeof middle_name == 'undefined') {
            middle_name = "";
        }

        if (typeof country == 'undefined' || country == "") {
            res.status(400).json({ message: 'Provide your country' })
            return
        }

        if (typeof ssn_or_id == 'undefined' || ssn_or_id == "") {
            res.status(400).json({ message: 'Provide a valid ID number' })
            return
        }

        if (typeof address == 'undefined' || address == "") {
            res.status(400).json({ message: 'Provide an address' })
            return
        }

        User.updateOne({ _id }, {
            phone_code,
            gender,
            dob,
            address,
            phone,
            country,
            ssn_or_id,
            first_name,
            last_name,
            middle_name,
            title,
        }).then(response => {
            res.status(200).json({
                message: 'Account successfully updated',
                data: response,
                "liil": _id
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Could not complete process at the moment, try again',
            })
        })
    });
}

exports.changePin = (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).json({ message: 'Unauthourized' })
            return
        }

        const { pin } = req.body;

        const _id = authData.user.id;

        bcrypt.genSalt(15, (err, salt) => {
            if (err) {

                res.status(500).json({
                    message: 'Could not complete process at the moment, try again'
                })

                return;
            }

            bcrypt.hash(String(pin), salt, (err, hash) => {
                if (err) {

                    res.status(500).json({
                        message: 'Could not complete process at the moment, try again'
                    })
                    return;
                }

                User.updateOne({ _id }, { pin: hash })
                    .then((user) => {
                        res.status(200).json({
                            message: 'Your pin was successfully updated',
                        })

                    }).catch(err => {
                        res.status(500).json({
                            message: 'Could not complete process at the moment, try again'
                        })
                    })
            });
        });
    })

}

