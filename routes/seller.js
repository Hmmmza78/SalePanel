const express = require('express')
const router = express.Router();

const {
    upload
} = require("../functions/upload")

const Seller = require("../models/seller");

router.post("/register", async (req, res, next) => {
    try {
        let {
            name,
            city,
            phone,
            region,
            invoiceCode
        } = req.body;
        Seller.find({
            name
        }, async (err, result) => {
            if (err) {
                throw err;
                res.statusCode(500);
            } else {
                if (result.length > 0) {
                    res.json({
                        status: "fail",
                        message: "Seller already exists!"
                    });
                } else {
                    try {
                        const response = await Seller.create({
                            name,
                            city,
                            phone,
                            region,
                            invoiceCode
                        });
                        res.json({
                            status: "success",
                        })
                    } catch (error) {
                        res.json(error.message);
                    }
                }
            }
        });

    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/checkSeller", async (req, res) => {
    try {
        let {
            name
        } = req.body;
        let nameOld = await Seller.find({
            name: name
        });
        if (nameOld.length > 0) {
            res.json({
                status: "success",
                message: "Seller already exists!"
            });
        } else {
            res.json({
                status: "success"
            });
        }
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/edit", async (req, res) => {
    try {
        let {
            uid,
            name,
            city,
            phone,
            region,
            invoiceCode
        } = req.body;
        response = await Seller.findByIdAndUpdate(uid, {
            name,
            city,
            phone,
            region,
            invoiceCode,
            updatedAt: Date.now()
        });
        res.json({
            status: "success"
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "Provide the correct parameters!"
        });
    }
});

router.post("/delete", async (req, res) => {
    try {
        let {
            uid
        } = req.body;
        response = await Seller.findByIdAndDelete(uid);
        res.json({
            status: "success"
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "Provide the correct parameters"
        });
    }
});

router.get("/allSellers", async (req, res) => {
    try {
        sellers = await Seller.find();
        res.json({
            sellers
        });
    } catch (e) {
        res.json({
            status: "fail",
            message: "internal server error!"
        });
    }
});

// this block must be at the end
router.get("/:id", async (req, res) => {
    try {
        let {
            id
        } = req.params;
        try {
            seller = await Seller.findById(id);
            res.json({
                seller
            });
        } catch (e) {
            res.json({
                status: "fail",
            }).statusCode(500);
        }
    } catch (err) {
        console.log(req.params);
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

module.exports = router;