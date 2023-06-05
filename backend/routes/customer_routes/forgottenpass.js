const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const nodemailer = require("nodemailer");
const Customer = require('../../model/customer')
const Newsproviders = require('../../model/newsprovider.js')
const Milkprovider = require('../../model/milkprovider');


router.post('/forgotpasswordbyphonenumber', async(req, res) => {
    try {
        console.log(req.body.email);
        const accountSid = "ACa7a5270a197262477d641faabf27c839";
        const authToken = "1c0d3a0c2be8075f4b643da872322acc";

        const client = new twilio(accountSid, authToken);
        // client.messages
        //     .create({ body: "Hello from keyur", from: "+15674004312", to: "+91" + req.body.email })
        //     .then(message => console.log(message.sid));
    } catch (err) {
        console.log(err);
    }
});
router.post('/forgotpassword', async(req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '20ceuog027@ddu.ac.in',
                pass: 'keyurddu'
            }
        });
        const temp = 'this is your last warning okay. this is computer generated email your otp : - '
        const otp = req.body.otp;
        const customerlogin = await Customer.findOne({ email: req.body.email });
        if (!customerlogin) {
            const milklogin = await Milkprovider.findOne({ email: req.body.email });
            if (!milklogin) {
                const newslogin = await Newsproviders.findOne({ email: req.body.email });
                if (!newslogin) {
                    return res.status(200).json({ msg: 'email id not found' });
                } else {
                    const mailOptions = {
                        from: '20ceuog027@ddu.ac.in',
                        // to: req.body.email,
                        to: req.body.email,
                        subject: 'reset Password',
                        html: `<div>${otp}</div>`
                    };

                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            return res.status(200).json({
                                msg: 'Email sent '
                            });
                        }
                    });
                }
            } else {
                const mailOptions = {
                    from: '20ceuog027@ddu.ac.in',
                    // to: req.body.email,
                    to: req.body.email,
                    subject: 'reset Password',
                    html: `<div>${otp}</div>`
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        return res.status(200).json({
                            msg: 'Email sent '
                        });
                    }
                });
            }
        } else {
            const mailOptions = {
                from: '20ceuog027@ddu.ac.in',
                to: req.body.email,
                subject: 'reset Password',
                html: `<div>${otp}</div>`
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.status(200).json({
                        msg: 'Email sent '
                    });
                }
            });
        }
        // 


        // Define the email options


        // Send the email

    } catch (error) {
        console.log(error);
    }
});
router.post("/changepassword", async function(req, res) {
    try {
        const customerlogin = await Customer.findOne({ email: req.body.email });
        if (!customerlogin) {
            const milklogin = await Milkprovider.findOne({ email: req.body.email });
            if (!milklogin) {
                const newslogin = await Newsproviders.findOne({ email: req.body.email });
                if (!newslogin) {
                    return res.status(200).json({ msg: 'email id not found' });
                } else {
                    await Newsproviders.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            password: req.body.password
                        }
                    });
                    return res.json({
                        msg: 'password change successfully'
                    });
                }
            } else {
                await Milkprovider.findOneAndUpdate({ email: req.body.email }, {
                    $set: {
                        password: req.body.password
                    }
                });
                return res.json({
                    msg: 'password change successfully'
                });
            }
        } else {
            await Customer.findOneAndUpdate({ email: req.body.email }, {
                $set: {
                    password: req.body.password
                }
            });
            return res.json({
                msg: 'password change successfully'
            });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router