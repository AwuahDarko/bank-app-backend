const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret');

class Utility {

    transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mjadarko@gmail.com', // generated ethereal user
            pass: '43585472CC8618EDEA729DA2B0FA29FF520F', // generated ethereal password
        },
    });


    static domain = "http://localhost:3000";
    static frontend = "http://localhost:8080";

    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    sendEmail(email_ids, title, html, attachments = []) {

        var mailOptions = {
            from: 'mjadarko@gmail.com',
            to: email_ids,
            subject: title,
            attachments: attachments,
            html: html
            // text: content
        };
        return new Promise(async (resolve, reject) => {

            try {
                const info = await this.transporter.sendMail(mailOptions);
                console.log("Message sent: %s", info.messageId);
                resolve(info);
            } catch (error) {
                reject(error)
            } finally {
                this.transporter.close();
            }
        })


    }

    static async generateVerificationLink(email, id) {
        const data_to_sign = {
            email,
            id
        }
        const token = await this.signJWT(data_to_sign);
        return `${this.frontend}?q=${token}`;
    }

    static signJWT(data_to_sign) {

        const secretKey = "526375Gg^&%$^*bsgshjs(&^@%@&*54435775ggGFSGFGHAHJJADJSJ";
        const expires = "1h"
        return new Promise((resolve, reject) => {
            jwt.sign({ info: data_to_sign }, secretKey, { expiresIn: expires },
                (err, token) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(token)
                }
            );
        })
    }
}


module.exports = Utility;