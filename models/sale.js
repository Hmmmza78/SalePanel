const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    products: {
        type: Object,
        required: true,
    },
    uid: {
        type: String,
        required: true
    },
    expense: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    }
}, {
    collection: "sales",
});

const model = mongoose.model("saleSchema", saleSchema);

module.exports = model;