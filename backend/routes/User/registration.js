const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { application } = require('express');

const User = require('../../model/User');

router.post('/user', async(req, res) => {
    try {
        const user = new User({

        });
        await user.save();
        return res.status(200).json("user registred successfully");
    } catch (err) {
        console.log(err);
    }
});