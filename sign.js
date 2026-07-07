const { addExp } = require("./level");
const { addBanana } = require("./economy");
const { todayKey } = require("./date");

function sign(user) {
  const today = todayKey();

  if (user.lastSign === today) {
    return {
      ok: false,
      message: "🍌 你今天已經簽到過囉！\n明天再來簽到吧～"
    };
  }

  user.lastSign = today;
  user.signDays += 1;

  addExp(user, 10);
  addBanana(user, 20);
  user.todayExp += 10;
  user.todayBanana += 20;

  return {
    ok: true,
    message: `🍌 簽到成功！\n\n⭐ EXP +10\n🍌 香蕉幣 +20\n📅 累積簽到：${user.signDays} 天\n\n明天記得再來簽到！`
  };
}

module.exports = { sign };
