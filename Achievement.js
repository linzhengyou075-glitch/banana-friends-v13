const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  achievementId: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  targetKey: { type: String, default: "signDays" },
  targetValue: { type: Number, default: 1 },
  rewardExp: { type: Number, default: 0 },
  rewardBanana: { type: Number, default: 0 },
  rewardTicket: { type: Number, default: 0 },
  rewardTitleId: { type: String, default: "" },
  rarity: { type: String, default: "普通" },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Achievement", AchievementSchema);
