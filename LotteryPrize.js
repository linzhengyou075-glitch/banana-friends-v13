const mongoose = require('mongoose');

const LotteryPrizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'banana' },
  value: { type: String, default: '' },
  chance: { type: Number, default: 10 },
  stock: { type: Number, default: -1 },
  rarity: { type: String, default: '普通' },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LotteryPrize', LotteryPrizeSchema);
