const User = require("../models/User");
const { todayKey } = require("./date");

async function getUser(userId, displayName = "蕉友") {
  let user = await User.findOne({ userId });

  if (!user) {
    user = await User.create({
      userId,
      displayName: displayName || "蕉友",
      todayKey: todayKey()
    });
  }

  const today = todayKey();
  if (user.todayKey !== today) {
    user.yesterdayChat = user.todayChat || 0;
    user.todayChat = 0;
    user.todayExp = 0;
    user.todayBanana = 0;
    user.todayKey = today;
  }

  if (displayName && (!user.displayName || user.displayName === "蕉友")) {
    user.displayName = displayName;
  }

  return user;
}

module.exports = { getUser };
