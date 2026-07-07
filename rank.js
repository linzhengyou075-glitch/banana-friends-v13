const User = require('../models/User');
async function levelTop(limit = 10) { return User.find({}).sort({ level: -1, exp: -1 }).limit(limit); }
async function bananaTop(limit = 10) { return User.find({}).sort({ banana: -1 }).limit(limit); }
async function signTop(limit = 10) { return User.find({}).sort({ signDays: -1 }).limit(limit); }
async function todayChatTop(limit = 10) { return User.find({}).sort({ todayMessages: -1 }).limit(limit); }
async function yesterdayChatTop(limit = 10) { return User.find({}).sort({ yesterdayMessages: -1 }).limit(limit); }
async function stickerTop(limit = 10) { return User.find({}).sort({ stickerCount: -1 }).limit(limit); }
async function imageTop(limit = 10) { return User.find({}).sort({ imageCount: -1 }).limit(limit); }
function formatTop(title, users, lineFn) {
  let msg = `${title}\n\n`;
  if (!users.length) return `${title}\n\n目前沒有資料`;
  users.forEach((u, i) => { msg += `${i + 1}. ${lineFn(u)}\n`; });
  return msg.trim();
}
module.exports = { levelTop, bananaTop, signTop, todayChatTop, yesterdayChatTop, stickerTop, imageTop, formatTop };
