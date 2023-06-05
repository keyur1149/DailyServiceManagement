const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { application } = require('express');
const Usertype = require('../../model/usertype');

router.get('/usertype/:id', async(req, res) => {
    try {
        const user_type = await Usertype.findOne({ _id: req.params.id });
        return res.status(201).json(user_type);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;