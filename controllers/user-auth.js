const uuidV4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret');

exports.verifyLogin = (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.sendStatus(401)
        return
    }

    const tk = token.split(' ')[1]

    jwt.verify(tk, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(401)
            return
        }
        res.sendStatus(208)

    })
}