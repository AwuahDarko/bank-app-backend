const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret');
const bcrypt = require('bcrypt');
const User = require('../models/users');


const expires = '30m';


exports.verifyLogin = (req, res) => {

    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).json({ message: 'Unauthourized' })
            return
        }
        const _id = authData.user.id;
        User.findOne({ _id })
            .then(user => {
                user.pin = "";
                res.status(208).json({ message: 'Authenticated', data: user })
            }).catch(err => {
                res.status(500).json({ message: 'An error occurred' })
            })

    })
}


exports.login = (req, res) => {
    const { user_id, pin } = req.body;

    if (typeof user_id == 'undefined' || user_id == "") {
        res.status(400).json({
            message: 'Provide user id'
        })
        return;
    }

    if (typeof pin == 'undefined' || pin == "") {
        res.status(400).json({
            message: 'Provide pin'
        })
        return;
    }

    User.findOne({ user_id })
        .then((user) => {
            if (!user) {
                res.status(403).json({
                    message: 'Wrong credentials'
                })
                return
            }



            bcrypt.compare(pin, user.pin, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({
                        message: 'Please try again later',
                    })

                    return;
                }

                const data_to_sign = {
                    'account_number': user.account_number,
                    'id': user._id,
                    'user_id': user.user_id,
                    'title': user.title,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email
                }

                if (isMatch) {
                    // generate token

                    if (!user.email_verified) {
                        res.status(401).json({
                            message: 'Please verify your email address',
                        })

                        return
                    }

                    if (user.status != 'active') {
                        res.status(401).json({
                            message: 'Please contact administrator for account activation',
                        })

                        return;
                    }
                    jwt.sign({ user: data_to_sign }, secretKey, { expiresIn: expires },
                        (err, token) => {
                            if (err) {
                                console.log(err)
                                res.status(500).json({
                                    message: 'Please try again later',
                                })

                                return;
                            }

                            user.pin = "";

                            res.status(200).json({
                                message: 'Welcome ' + user.title + " " + user.first_name + " " + user.last_name,
                                data: user,
                                token: token
                            })

                        }
                    );
                } else {
                    res.status(403).json({
                        message: 'Wrong credentials'
                    })
                }
            });


        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Please try again later',
            })
        })
}




