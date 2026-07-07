const mongoose = require("mongoose");

const UserAchievementSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  achievementId: { type: String, index: true },
  unlocked: { type: Boolean, default: true },
  claimed: { type: Boolean, default: false }
}, { timestamps: true });

UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model("UserAchievement", UserAchievementSchema);
