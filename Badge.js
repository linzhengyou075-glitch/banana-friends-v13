const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema({
  badgeId: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  image: { type: String, default: "" },
  rarity: { type: String, default: "普通" },
  description: { type: String, default: "" },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Badge", BadgeSchema);
