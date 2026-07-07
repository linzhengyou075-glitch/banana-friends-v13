const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
  titleId: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  rarity: { type: String, default: "普通" },
  color: { type: String, default: "#d18a00" },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Title", TitleSchema);
