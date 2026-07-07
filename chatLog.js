const ChatLog = require('../models/ChatLog');
const { dateKey } = require('./date');
async function saveLog(user, type, message, exp = 0, banana = 0) {
  return ChatLog.create({ userId: user.userId, displayName: user.displayName || '蕉友', messageType: type, message, exp, banana, dateKey: dateKey() });
}
module.exports = { saveLog };
