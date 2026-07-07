const { addExp } = require('./level');
const { addBanana } = require('./economy');
const { allSettings } = require('./settings');
const { dateKey, yesterdayKey } = require('./date');

async function sign(user) {
  const today = dateKey();
  if (user.lastSign === today) return { ok: false, message: '你今天已經簽到過囉 🍌' };
  user.streak = user.lastSign === yesterdayKey() ? (user.streak || 0) + 1 : 1;
  user.lastSign = today;
  user.signDays = (user.signDays || 0) + 1;
  const settings = await allSettings();
  const exp = Number(settings.signExp || 10);
  const banana = Number(settings.signBanana || 20);
  addExp(user, exp);
  addBanana(user, banana);
  let bonus = '';
  if (user.streak % 7 === 0) { user.ticket = (user.ticket || 0) + 1; bonus = '\n🎟️ 連續 7 天獎勵：抽獎券 +1'; }
  return { ok: true, message: `🍌 簽到成功！\n⭐ EXP +${exp}\n🍌 香蕉幣 +${banana}\n📅 累積簽到：${user.signDays} 天\n🔥 連續簽到：${user.streak} 天${bonus}` };
}
module.exports = { sign };
