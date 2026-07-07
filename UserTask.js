const mongoose = require("mongoose");

const UserTaskSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  taskId: { type: String, index: true },
  periodKey: { type: String, index: true },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  claimed: { type: Boolean, default: false }
}, { timestamps: true });

UserTaskSchema.index({ userId: 1, taskId: 1, periodKey: 1 }, { unique: true });

module.exports = mongoose.model("UserTask", UserTaskSchema);
