const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { application } = require('express');
const Usertype = require('../../model/usertype');

router.post('/usertype', async(req, res) => {
    try {
        const user_type = new Usertype({
            user_type_name: req.body.user_type_name,
        });
        await user_type.save();
        return res.status(201).json("type addes successfully");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;