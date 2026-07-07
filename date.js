function todayKey() {
  return new Date().toLocaleDateString("zh-TW", {
    timeZone: "Asia/Taipei"
  });
}

module.exports = { todayKey };
