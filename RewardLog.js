const mongoose = require("mongoose");

const RewardLogSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  source: { type: String, default: "" },
  sourceId: { type: String, default: "" },
  exp: { type: Number, default: 0 },
  banana: { type: Number, default: 0 },
  ticket: { type: Number, default: 0 },
  titleId: { type: String, default: "" },
  note: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("RewardLog", RewardLogSchema);
