const Setting = require("../models/Setting");

async function getSetting(key, defaultValue) {

  let setting = await Setting.findOne({ key });

  if (!setting) {
    setting = await Setting.create({
      key,
      value: defaultValue
    });
  }

  return setting.value;
}

async function setSetting(key, value) {

  let setting = await Setting.findOne({ key });

  if (!setting) {
    setting = await Setting.create({ key, value });
  } else {
    setting.value = value;
    await setting.save();
  }

  return setting.value;
}

module.exports = {
  getSetting,
  setSetting
};
