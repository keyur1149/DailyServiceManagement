const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Milkprovider = require('../../model/milkprovider')
const Newsprovider = require('../../model/newsprovider.js')
const Cutomerproviderconnection = require('../../model/customerproviderconnection')
const Customer = require('../../model/customer')
const router = express.Router();
const { application } = require('express');




router.post("/customerandproviderlist", async(req, res) => {
    try {
        const provider_id = req.body.provider_id;
        const temp = "false";
        // console.log(customer_id);
        const customerconnection = await Cutomerproviderconnection.find({
            provider_id: provider_id,
            request: temp,
        });
        return res.status(200).json(customerconnection);
    } catch (err) {
        console.log(err);
    }
});
router.post("/milkproviderpresent", async(req, res) => {
    try {
        // console.log(req.body.user_id);
        const users = await Cutomerproviderconnection.findOne({ customer_id: req.body.user_id });
        if (!users) {
            return res.status(201).json("not");
        } else {
            return res.status(201).json("yes");
        }
    } catch (err) {
        console.log(err);
    }
});
router.post("/milkman", async(req, res) => {
    try {
        const users = await Milkprovider.find();
        console.log(users);
        return res.status(201).json(users);
    } catch (err) {
        console.log(err);
    }
});
router.post('/customerlogin', async(req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    // console.log(username);
    // console.log(password);
    try {
        const customerlogin = await Customer.findOne({ username: username });
        if (!customerlogin) {
            const milklogin = await Milkprovider.findOne({ username: username });
            if (!milklogin) {

                return res.status(400).json({
                    error: "user not exits"
                });
            } else if (password == milklogin.password) {
                // console.log("now send");
                return res.status(201).json(milklogin);
            }
        } else {
            const ismatch = await bcrypt.compare(password, customerlogin.password);
            if (!ismatch) {

                return res.status(400).json({ error: "password not valid" });

            } else {
                // token = await userlogin.generateAuthToken();
                return res.status(201).json(customerlogin);
                // navigate("/");
            }
        }
    } catch (err) {
        console.log(err);
    }
});
router.post('/milkproviderregister', async(req, res) => {
    console.log(req.body);
    const {
        username,
        fname,
        lname,
        email,
        PhoneNumber,
        password,
        address,
        prize,
        morning,
        morning_start,
        morning_end,
        evening_start,
        evening_end,
        evening,
    } = req.body;
    try {
        const userexitphone = await Milkprovider.findOne({
            PhoneNumber: PhoneNumber
        });
        const userexitemail = await Milkprovider.findOne({
            email: email
        });
        const userexitname = await Milkprovider.findOne({
            username: username
        })
        if (userexitphone) {
            return res.status(402).json({ message: "PhoneNumber" });
        } else if (userexitemail) {
            return res.status(402).json({ message: "email" });
        } else if (userexitname) {
            return res.status(402).json({
                message: "username"
            });
        } else {
            // console.log("create user")
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const milk_provider_id = jwt.sign({ email: email }, jwtSecretKey);
            const milkprovider = new Milkprovider({
                milk_provider_id,
                username,
                fname,
                lname,
                email,
                PhoneNumber,
                password,
                address,
                prize,
                morning_start,
                morning_end,
                evening_start,
                evening_end,
                morning,
                evening
            });
            //  hasing of password before save
            await milkprovider.save();
            return res.status(402).json(milkprovider);
        }
    } catch (err) {
        console.log(err);
    }
});
router.post('/newspaperregister', async(req, res) => {
    const { username, fname, lname, email, PhoneNumber, password, address, prize, delivery_time } = req.body;
    try {
        const userexitphone = await Newsprovider.findOne({
            PhoneNumber: PhoneNumber
        });
        const userexitemail = await Newsprovider.findOne({
            email: email
        });
        const userexitname = await Newsprovider.findOne({
            username: username
        })
        if (userexitphone) {
            return res.status(402).json({ message: "PhoneNumber" });
        } else if (userexitemail) {
            return res.status(402).json({ message: "email" });
        } else if (userexitname) {
            return res.status(402).json({
                message: "username"
            });
        } else {
            // console.log("create user")
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const news_provider_id = jwt.sign({ email: email }, jwtSecretKey);
            const newsprovider = new Newsprovider({
                news_provider_id,
                username,
                fname,
                lname,
                email,
                PhoneNumber,
                password,
                address,
                prize,
                delivery_time
            });
            //  hasing of password before save
            await newsprovider.save();
            return res.status(402).json(newsprovider);
        }
    } catch (err) {
        console.log(err);
    }
});





router.post('/customerregister', async(req, res) => {
    const {
        username,
        fname,
        lname,
        email,
        PhoneNumber,
        password,
        address,
    } = req.body;
    try {
        const userexitphone = await Customer.findOne({
            PhoneNumber: PhoneNumber
        });
        const userexitemail = await Customer.findOne({
            email: email
        });
        const userexitname = await Customer.findOne({
            username: username
        })
        if (userexitphone) {
            return res.status(402).json({ message: "PhoneNumber" });
        } else if (userexitemail) {
            return res.status(402).json({ message: "email" });
        } else if (userexitname) {
            return res.status(402).json({
                message: "username"
            });
        } else {
            // console.log("create user")
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const user_id = jwt.sign({ email: email }, jwtSecretKey);
            const customer = new Customer({
                user_id,
                username,
                fname,
                lname,
                email,
                PhoneNumber,
                password,
                address
            });
            //  hasing of password before save
            await customer.save();
            return res.status(402).json(customer);
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;