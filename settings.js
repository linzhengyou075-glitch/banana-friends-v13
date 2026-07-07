const Setting = require('../models/Setting');

const defaults = {
  announcement: '目前沒有公告',
  rules: '📜 群規\n\n1. 請互相尊重。\n2. 禁止騷擾、洗版、廣告。\n3. 請勿任意叫出他人名片。\n4. 違規者管理員可處理。',
  chatExp: 2,
  chatBanana: 2,
  dailyExpLimit: 300,
  dailyBananaLimit: 300,
  signExp: 10,
  signBanana: 20,
  ticketPrice: 100
};

async function getSetting(key, fallback = undefined) {
  const value = fallback === undefined ? defaults[key] : fallback;
  let row = await Setting.findOne({ key });
  if (!row) row = await Setting.create({ key, value });
  return row.value;
}
async function setSetting(key, value) {
  const row = await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
  return row.value;
}
async function allSettings() {
  const result = { ...defaults };
  const rows = await Setting.find({});
  rows.forEach(r => { result[r.key] = r.value; });
  return result;
}
module.exports = { getSetting, setSetting, allSettings, defaults };
