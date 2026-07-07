const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, index: true, required: true },
  displayName: { type: String, default: '蕉友' },
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  banana: { type: Number, default: 0 },
  ticket: { type: Number, default: 0 },
  signDays: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastSign: { type: String, default: '' },
  lastActiveDate: { type: String, default: '' },
  todayExp: { type: Number, default: 0 },
  todayBanana: { type: Number, default: 0 },
  todayMessages: { type: Number, default: 0 },
  yesterdayMessages: { type: Number, default: 0 },
  stickerCount: { type: Number, default: 0 },
  imageCount: { type: Number, default: 0 },
  vip: { type: Boolean, default: false },
  badge: { type: String, default: '初心之蕉' },
  title: { type: String, default: '新手' },
  items: { type: [String], default: [] },
  joinDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
