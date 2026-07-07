const User = require('../models/User');
const { dateKey } = require('./date');

async function getUser(userId, displayName = '蕉友') {
  let user = await User.findOne({ userId });
  if (!user) user = await User.create({ userId, displayName: displayName || '蕉友' });
  if (displayName && user.displayName !== displayName) user.displayName = displayName;
  const today = dateKey();
  if (user.lastActiveDate && user.lastActiveDate !== today) {
    user.yesterdayMessages = user.todayMessages || 0;
    user.todayMessages = 0;
    user.todayExp = 0;
    user.todayBanana = 0;
  }
  user.lastActiveDate = today;
  return user;
}
module.exports = { getUser };
