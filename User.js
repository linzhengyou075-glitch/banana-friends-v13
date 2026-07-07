const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, index: true },
  displayName: { type: String, default: "" },
  pictureUrl: { type: String, default: "" },
  statusMessage: { type: String, default: "" },

  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  totalExp: { type: Number, default: 0 },

  banana: { type: Number, default: 0 },
  ticket: { type: Number, default: 0 },
  diamond: { type: Number, default: 0 },

  signDays: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastSign: { type: String, default: "" },

  title: { type: String, default: "新手蕉友" },
  titleId: { type: String, default: "title_001" },

  badge: { type: String, default: "lv001" },
  frame: { type: String, default: "default" },
  background: { type: String, default: "banana" },

  vip: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },

  backpack: { type: [String], default: [] },
  titles: { type: [String], default: ["title_001"] },
  badges: { type: [String], default: ["lv001"] },
  frames: { type: [String], default: ["default"] },
  backgrounds: { type: [String], default: ["banana"] },
  achievements: { type: [String], default: [] },

  todayKey: { type: String, default: "" },
  todayExp: { type: Number, default: 0 },
  todayBanana: { type: Number, default: 0 },
  todayChat: { type: Number, default: 0 },
  yesterdayChat: { type: Number, default: 0 },
  totalChat: { type: Number, default: 0 },
  chatCount: { type: Number, default: 0 },
  stickerCount: { type: Number, default: 0 },
  imageCount: { type: Number, default: 0 },

  lastMessage: { type: String, default: "" },
  lastMessageAt: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
