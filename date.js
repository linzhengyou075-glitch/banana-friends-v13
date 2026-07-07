function todayKey(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.toLocaleDateString("zh-TW", { timeZone: "Asia/Taipei" });
}

function resetDaily(user) {
  const today = todayKey();

  if (user.todayKey !== today) {
    user.yesterdayChat = user.todayChat || 0;
    user.todayChat = 0;
    user.todayExp = 0;
    user.todayBanana = 0;
    user.todayKey = today;
  }

  return user;
}

module.exports = { todayKey, resetDaily };
