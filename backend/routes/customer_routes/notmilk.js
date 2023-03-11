const express = require('express');
const Cutomerproviderconnection = require('../../model/customerproviderconnection')
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


module.exports = router;