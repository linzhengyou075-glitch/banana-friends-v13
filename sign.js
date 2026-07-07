const { addExp } = require("./level");
const { addBanana } = require("./economy");
const { todayKey } = require("./date");
const { getAllSettings } = require("./settings");

async function sign(user) {
  const today = todayKey();
  const yesterday = todayKey(-1);
  const s = await getAllSettings();

  if (user.lastSign === today) {
    return {
      ok: false,
      message: "🍌 你今天已經簽到過囉！\n明天再來簽到吧～"
    };
  }

  user.lastSign = today;
  user.signDays += 1;
  user.streak = user.lastSign === yesterday ? (user.streak || 0) + 1 : ((user.streak || 0) + 1);

  addExp(user, Number(s.signExp || 10));
  addBanana(user, Number(s.signBanana || 20));

  return {
    ok: true,
    message:
`🍌 簽到成功！

⭐ EXP +${s.signExp || 10}
🍌 香蕉幣 +${s.signBanana || 20}
📅 累積簽到：${user.signDays} 天
🔥 連續簽到：${user.streak || 1} 天`
  };
}

module.exports = { sign };
