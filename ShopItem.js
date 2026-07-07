const mongoose = require('mongoose');

const ShopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'ticket' },
  value: { type: String, default: '1' },
  price: { type: Number, default: 100 },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ShopItem', ShopItemSchema);
