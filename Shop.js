const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  type: { type: String, default: "item" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Shop", ShopSchema);
