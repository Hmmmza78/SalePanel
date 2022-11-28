const express = require('express');

const router = express.Router();

const Sale = require("../models/sale");
const Seller = require("../models/seller");
const Company = require("../models/company");

router.post("/addPayment", async (req, res) => {
    try {
        let {
            uid,
            amount,
            companyId
        } = req.body;
        await Sale.updateMany({
            uid
        }, {
            paid: true
        });
        await Seller.findByIdAndUpdate(uid, {
            $inc: {
                wallet: -amount
            }
        });
        await Company.findByIdAndUpdate(companyId, {
            $inc: {
                wallet: amount
            }
        });
        res.json({
            status: "success"
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters",
            ...err
        });
    }
});


router.post("/newCompany", async (req, res) => {
    try {
        let {
            name
        } = req.body;
        Company.find({
            name
        }, async (err, result) => {
            if (err) {
                res.statusCode(500).end();
                return
            }
            if (result.length > 0) {
                res.json({
                    status: "fail",
                    message: "Company already exists!"
                }).end();
                return;
            }
            try {
                let company = await Company.create({
                    name
                });
                res.json({
                    status: "success"
                });
            } catch (e) {
                res.json({
                    status: "fail",
                    message: "server error"
                });
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});
module.exports = router;