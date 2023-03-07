const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Milkprovider = require('../../model/milkprovider')
const Newsprovider = require('../../model/newsprovider.js')
const Cutomerproviderconnection = require('../../model/customerproviderconnection')
const Customer = require('../../model/customer')
const router = express.Router();
const { application } = require('express');
router.post("/customernotmilk", async(req, res) => {
    try {
        const {
            provider_id,
            todaydate,
            year,
            month
        } = req.body;
        const cutomers = await Cutomerproviderconnection.find({
            provider_id: provider_id,
            month: month,
            year: year,
            dates: {
                $in: [todaydate]
            }
        });
        return res.status(201).json(cutomers);
    } catch (err) {
        console.log(err);
    }
});
router.post("/notdeliveryonthisdate", async(req, res) => {
    try {
        const { customer_id, milkprovider_id, date, month, year } = req.body;
        await Cutomerproviderconnection.findOneAndUpdate({
            customer_id: customer_id,
            provider_id: milkprovider_id,
            year: year,
            month: month,
        }, {
            $push: {
                "dates": date,
            }
        });
        console.log('yes');
        return res.status(200).json("done");

    } catch (err) {
        console.log(err);
    }
});
router.post("/customeridtoname", async(req, res) => {
    try {
        const user_id = req.body.user_id;
        // console.log(user_id);
        const user = await Customer.findOne({
            user_id: user_id
        });
        return res.status(200).json(user);

    } catch (err) {
        console.log(err);
    }
});
router.post("/returndates", async(req, res) => {
    try {
        const customer_id = req.body.customer_id;
        const milkprovider_id = req.body.milkprovider_id;
        const now = await Cutomerproviderconnection.findOne({
            customer_id: customer_id,
            provider_id: milkprovider_id
        });
        console.log(now);
        return res.status(200).json(now.dates);
    } catch (err) {
        console.log(err);
    }
});
router.post("/getusername", async(req, res) => {
    try {
        const user_id = req.body.user_id;
        const provider = await Milkprovider.findOne({
            milk_provider_id: user_id
        })
        return res.status(200).json(provider.username);
    } catch (err) {
        console.log(err);
    }
});
router.post("/choosendate", async(req, res) => {
    try {
        const date = req.body.date;
        const customer_id = req.body.customer_id;
        const milkprovider_id = req.body.milkprovider_id;
        const u = await Cutomerproviderconnection.findOne({
            provider_id: milkprovider_id,
            customer_id: customer_id,
        })
        console.log(u);
    } catch (err) {
        console.log(err);
    }
});
router.post("/milkproviderupdate", async(req, res) => {
    try {
        const id = req.body.id;
        const milkprovider = await Milkprovider.findOne({ milk_provider_id: id });
        milkprovider.username = req.body.username;
        milkprovider.fname = req.body.fname;
        milkprovider.lname = req.body.lname;
        milkprovider.email = req.body.email;
        milkprovider.PhoneNumber = req.body.PhoneNumber;
        milkprovider.address = req.body.address;
        milkprovider.prize = req.body.prize;
        await Milkprovider.updateOne(milkprovider);
        return res.status(200).json("update successfully");
    } catch (err) {
        console.log(err);
    }
});
router.post("/customerupdate", async(req, res) => {
    try {
        await Customer.findOneAndUpdate({ user_id: req.body.id }, {
            $set: {
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                PhoneNumber: req.body.PhoneNumber,
                address: req.body.address,
            }
        }, {
            new: true
        });
        const now = await Customer.findOne({
            user_id: req.body.id
        });
        console.log(now);
        return res.status(400).json(now)
    } catch (err) {
        console.log(err);
    }
});
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
router.post("/requestreject", async(req, res) => {
    try {
        const provider_id = req.body.provider_id;
        const customer_id = req.body.user_id;
        await Cutomerproviderconnection.findOneAndUpdate({
            provider_id: provider_id,
            customer_id: customer_id
        }, {
            $set: {
                request: "Rejected",
            }
        }, {
            new: true,
        });
        return res.status(200).json("request rejected");
    } catch (err) {
        console.log(err);
    }
});
router.post("/requestaccept", async(req, res) => {
    try {
        const provider_id = req.body.provider_id;
        const customer_id = req.body.user_id;
        const year = req.body.year;
        const month = req.body.month;
        await Cutomerproviderconnection.findOneAndUpdate({
            provider_id: provider_id,
            customer_id: customer_id
        }, {
            $set: {
                request: "Accept",
                year: year,
                month: month,
            }
        }, {
            new: true,
        });
        // customerconnection.request = "true"
        await Customer.findOneAndUpdate({
            user_id: customer_id
        }, {
            $set: {
                milkprovider_id: provider_id,
            }
        }, {
            new: true,
        });
        return res.status(200).json("request accepted");
    } catch (err) {
        console.log(err);
    }
});
router.post("/sendrequest", async(req, res) => {
    try {
        const provider_id = req.body.milk;
        const customer_id = req.body.user_id;
        const now = await Cutomerproviderconnection.findOne({
            provider_id: provider_id,
            customer_id: customer_id
        })
        if (now) {
            return res.status(200).json("request already")
        }
        const customerconnection = new Cutomerproviderconnection({
            provider_id,
            customer_id
        });
        await customerconnection.save();
        return res.status(404).json("yes");
    } catch (err) {
        console.log(err);
    }
});
router.post("/milkproviderpresent", async(req, res) => {
    try {
        const users = await Cutomerproviderconnection.findOne({ customer_id: req.user_id });
        if (!users) {
            return res.status(201).json("not");
        } else {
            return res.status(400).json("yes");
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