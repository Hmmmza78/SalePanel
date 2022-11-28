const express = require('express');

const router = express.Router();

const Product = require("../models/product");

router.get("/test", (req, res) => {
    res.send("Product")
});

router.post("/new", async (req, res) => {
    try {
        let {
            name,
            salePrice,
            purchasePrice,
            category
        } = req.body;
        console.log(req.body);
        Product.find({
            name
        }, async (err, result) => {
            if (err) {
                res.statusCode(500).end();
                return
            }
            if (result.length > 0) {
                res.json({
                    status: "fail",
                    message: "Product already exists!"
                }).end();
                return;
            }
            try {
                let product = await Product.create({
                    name,
                    salePrice,
                    purchasePrice,
                    category
                });
                res.json({
                    status: "success"
                });
            } catch (e) {
                res.json({
                    ...e,
                    status: "fail"
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

router.post("/edit", async (req, res) => {
    try {
        let {
            id,
            name,
            salePrice,
            purchasePrice,
            category
        } = req.body;
        try {
            const product = await Product.findByIdAndUpdate(
                id, {
                    name,
                    salePrice,
                    purchasePrice,
                    category,
                    updatedAt: Date.now()
                }
            );
            res.json({
                status: "success"
            });
        } catch (e) {
            res.json({
                status: "fail",
                message: e.message
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/delete", async (req, res) => {
    try {
        let {
            id,
        } = req.body;
        const product = await Product.findByIdAndDelete(
            id
        );
        res.json({
            status: "success"
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        });
    }
});
router.get("/allProducts", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            products
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        });
    }
});
// following block must be at the end
router.get("/:id", async (req, res) => {
    try {
        let {
            id
        } = req.params;
        const product = await Product.findById(
            id
        );
        res.json({
            product
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        });
    }
});

module.exports = router;