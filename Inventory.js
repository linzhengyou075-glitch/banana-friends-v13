const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  userId: { type: String, index: true },
  itemType: { type: String, default: "item" },
  itemId: { type: String, default: "" },
  itemName: { type: String, default: "" },
  qty: { type: Number, default: 1 },
  equipped: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema);
