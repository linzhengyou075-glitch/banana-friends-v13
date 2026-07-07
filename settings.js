const Setting = require("../models/Setting");

const defaults = {
  announcement: "目前沒有公告",
  groupRules: "請友善聊天、尊重彼此，禁止廣告、騷擾與洗版。",
  welcome: "👋 歡迎加入 🍌〔蕉〕個朋友吧！\n輸入「幫助」查看功能，輸入「簽到」領取獎勵。",
  dailyExpLimit: 300,
  dailyBananaLimit: 500,
  chatExp: 2,
  chatBanana: 2,
  signExp: 10,
  signBanana: 20,
  ticketPrice: 100,
  adminPassword: process.env.ADMIN_PASSWORD || "banana123"
};

async function getSetting(key, defaultValue) {
  const fallback = defaultValue === undefined ? defaults[key] : defaultValue;
  let setting = await Setting.findOne({ key });
  if (!setting) {
    setting = await Setting.create({ key, value: fallback });
  }
  return setting.value;
}

async function setSetting(key, value) {
  let setting = await Setting.findOne({ key });
  if (!setting) setting = await Setting.create({ key, value });
  else {
    setting.value = value;
    await setting.save();
  }
  return setting.value;
}

async function getAllSettings() {
  const result = {};
  for (const key of Object.keys(defaults)) {
    result[key] = await getSetting(key, defaults[key]);
  }
  return result;
}

module.exports = { getSetting, setSetting, getAllSettings, defaults };
