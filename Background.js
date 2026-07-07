const mongoose = require("mongoose");

const BackgroundSchema = new mongoose.Schema({
  backgroundId: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  rarity: { type: String, default: "普通" },
  price: { type: Number, default: 0 },
  source: { type: String, default: "system" },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Background", BackgroundSchema);
