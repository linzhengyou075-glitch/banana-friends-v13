const User = require("../models/User");

async function levelTop(limit = 10) {
  return await User.find({}).sort({ level: -1, exp: -1 }).limit(limit);
}

async function bananaTop(limit = 10) {
  return await User.find({}).sort({ banana: -1 }).limit(limit);
}

async function signTop(limit = 10) {
  return await User.find({}).sort({ signDays: -1 }).limit(limit);
}

async function todayChatTop(limit = 10) {
  return await User.find({}).sort({ todayChat: -1 }).limit(limit);
}

async function yesterdayChatTop(limit = 10) {
  return await User.find({}).sort({ yesterdayChat: -1 }).limit(limit);
}

async function stickerTop(limit = 10) {
  return await User.find({}).sort({ stickerCount: -1 }).limit(limit);
}

async function imageTop(limit = 10) {
  return await User.find({}).sort({ imageCount: -1 }).limit(limit);
}

module.exports = {
  levelTop,
  bananaTop,
  signTop,
  todayChatTop,
  yesterdayChatTop,
  stickerTop,
  imageTop
};
