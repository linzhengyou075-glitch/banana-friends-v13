const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskId: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  type: { type: String, default: "daily" }, // daily / weekly
  targetKey: { type: String, default: "sign" }, // sign / chat / sticker / image / lottery / buy
  targetValue: { type: Number, default: 1 },
  rewardExp: { type: Number, default: 0 },
  rewardBanana: { type: Number, default: 0 },
  rewardTicket: { type: Number, default: 0 },
  rewardTitleId: { type: String, default: "" },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
