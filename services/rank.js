const User = require("../models/User");

async function levelTop(limit = 10) {
  return await User.find({})
    .sort({ level: -1, exp: -1 })
    .limit(limit);
}

async function bananaTop(limit = 10) {
  return await User.find({})
    .sort({ banana: -1 })
    .limit(limit);
}

async function signTop(limit = 10) {
  return await User.find({})
    .sort({ signDays: -1 })
    .limit(limit);
}

module.exports = {
  levelTop,
  bananaTop,
  signTop
};
