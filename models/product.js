const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    salePrice: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
        // bundle || cotton
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
    collection: "products",
});

const model = mongoose.model("productSchema", productSchema);

module.exports = model;