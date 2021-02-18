const uuidV4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Utility = require('../utils/utility');



exports.registerUserStepOne = (req, res) => {

    const { email, first_name, middle_name, last_name, title } = req.body;

    if (typeof email === 'undefined' || email == "") {
        res.status(400).json({ message: 'Provide email' })
        return
    }

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

    // generate account number
    const d = new Date();
    const account_number = `${d.getTime()}${d.getUTCMilliseconds()}`;

    // generate user id
    let user_id = Utility.getRandomInt(1000000000, 9999999999);
    const pin = Utility.getRandomInt(32345431, 90087678908);

    User.findOne({ user_id: user_id }).then((present) => {
        if (present) {
            user_id = Utility.getRandomInt(1000000000, 9999999999)
        } else {

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
                    // set password

                    const user = new User({
                        first_name,
                        last_name,
                        middle_name,
                        email,
                        user_id,
                        account_number,
                        title,
                        pin: hash
                    })

                    user.save()
                        .then(user => {
                            const util = new Utility();
                            util.sendEmail(email, 'title', 'html')
                                .then((response) => {
                                    res.status(201).json({
                                        message: 'A verify link has been sent to your email link please verify your email address',
                                        data: user,
                                        code: pin
                                    })
                                }).catch(err => {
                                    console.log('email error', err)
                                    // despite error
                                    res.status(201).json({
                                        message: 'A verify link has been sent to your email link please verify your email address',
                                        data: user,
                                        code: pin
                                    })
                                })

                        })
                        .catch(err => {
                            console.log(err)
                            if (err.code == 11000) {
                                res.status(409).json({
                                    message: "Sorry, this email address is taken"
                                })
                                return;
                            }
                            res.status(500).json({
                                message: 'Could not complete process at the moment, try again'
                            })
                        })
                })
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Could not complete process at the moment, try again'
        })
    })
}


exports.registerUserStepTwo = (req, res) => {
    const { id, phone_code, ssn_or_id, gender, country, dob, address, phone } = req.body;

    if (typeof id == 'undefined' || id == "") {
        res.status(400).json({ message: 'Specify an existing id' })
        return
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


    User.updateOne({ _id: id }, {
        phone_code,
        gender,
        dob,
        address,
        phone,
        country,
        ssn_or_id
    }).then(response => {
        res.status(201).json({
            message: 'Account successfully created'
        })
    }).catch(err => {
        console.log(err)
    })



}