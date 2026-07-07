const { addExp } = require("./level");
const { addBanana } = require("./economy");

function todayKey() {
  return new Date().toLocaleDateString("zh-TW", {
    timeZone: "Asia/Taipei"
  });
}

function sign(user) {
  const today = todayKey();

  if (user.lastSign === today) {
    return {
      ok: false,
      message: "你今天已經簽到過囉 🍌"
    };
  }

  user.lastSign = today;
  user.signDays += 1;

  addExp(user, 10);
  addBanana(user, 20);

  return {
    ok: true,
    message: `🍌 簽到成功！\n⭐ EXP +10\n🍌 香蕉幣 +20\n📅 累積簽到：${user.signDays} 天`
  };
}

module.exports = {
  sign
};
