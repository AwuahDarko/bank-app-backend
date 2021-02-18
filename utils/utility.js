const nodemailer = require('nodemailer');


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
}


module.exports = Utility;