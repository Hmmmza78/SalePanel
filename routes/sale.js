const express = require('express');

const router = express.Router();

const Sale = require("../models/sale");

router.get("/test", (req, res) => {
    res.send("Sale")
});

router.post("/new", async (req, res) => {
    try {
        let {
            products,
            uid,
            expense,
            price
        } = req.body;
        let sale = await Sale.create({
            products,
            uid,
            expense,
            price
        });
        res.json({
            status: "success"
        });
    } catch (e) {
        res.status(400).json({
            ...e,
            status: "fail"
        });
    }
});

router.post("/edit", async (req, res) => {
    try {
        let {
            id,
            sales,
            uid,
            expense,
            price
        } = req.body;
        const sale = await Sale.findByIdAndUpdate(
            id, {
                sales,
                uid,
                expense,
                price,
                updatedAt: Date.now()
            }
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

router.post("/delete", async (req, res) => {
    try {
        let {
            id,
        } = req.body;
        const sale = await Sale.findByIdAndDelete(
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

// * this get request needs json body
router.get("/userSales", async (req, res) => {
    try {
        let {
            uid
        } = req.body;
        const sales = await Sale.find({
            uid
        });
        res.json({
            sales
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        });
    }
});

router.get("/allSales", async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json({
            sales
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
        const sale = await Sale.findById(
            id
        );
        res.json({
            sale
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        });
    }
});

module.exports = router;