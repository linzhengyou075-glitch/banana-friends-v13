const mongoose = require('mongoose');

const ChatLogSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  displayName: { type: String, default: '蕉友' },
  messageType: { type: String, default: 'text', index: true },
  message: { type: String, default: '' },
  exp: { type: Number, default: 0 },
  banana: { type: Number, default: 0 },
  dateKey: { type: String, default: '', index: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('ChatLog', ChatLogSchema);
