const mongoose = require("mongoose");

const ChatLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  displayName: {
    type: String,
    default: ""
  },

  messageType: {
    type: String,
    default: "text"
  },

  message: {
    type: String,
    default: ""
  },

  exp: {
    type: Number,
    default: 0
  },

  banana: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("ChatLog", ChatLogSchema);
