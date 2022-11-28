const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  invoiceCode: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    required: true,
    default: 0
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
  collection: "sellers",
});

const model = mongoose.model("sellerSchema", sellerSchema);

module.exports = model;