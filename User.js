const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, index: true },
  displayName: { type: String, default: "" },

  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  banana: { type: Number, default: 0 },
  ticket: { type: Number, default: 0 },

  signDays: { type: Number, default: 0 },
  lastSign: { type: String, default: "" },
  streak: { type: Number, default: 0 },

  joinDate: { type: Date, default: Date.now },

  todayKey: { type: String, default: "" },
  todayExp: { type: Number, default: 0 },
  todayBanana: { type: Number, default: 0 },
  todayChat: { type: Number, default: 0 },
  yesterdayChat: { type: Number, default: 0 },

  chatCount: { type: Number, default: 0 },
  stickerCount: { type: Number, default: 0 },
  imageCount: { type: Number, default: 0 },

  vip: { type: Boolean, default: false },
  badge: { type: String, default: "初心之蕉" },
  title: { type: String, default: "新手" },
  items: { type: [String], default: [] },

  lastMessage: { type: String, default: "" },
  lastMessageAt: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
