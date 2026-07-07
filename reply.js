const line = require('@line/bot-sdk');
const config = require('../config/line');
const client = new line.Client(config);

async function reply(replyToken, message) {
  if (!replyToken) return;
  if (Array.isArray(message)) return client.replyMessage(replyToken, message);
  if (typeof message === 'string') return client.replyMessage(replyToken, { type: 'text', text: message });
  return client.replyMessage(replyToken, message);
}
module.exports = reply;
module.exports.client = client;
