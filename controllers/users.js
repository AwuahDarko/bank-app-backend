const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret');
const bcrypt = require('bcrypt');
const User = require('../models/users');


exports.getUserInfo = (req, res) => {
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