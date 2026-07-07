const { addExp } = require('./level');
const { addBanana } = require('./economy');

const prizes = [
  { name: '🍌 100 香蕉幣', type: 'banana', value: 100, chance: 50 },
  { name: '⭐ 50 EXP', type: 'exp', value: 50, chance: 30 },
  { name: '🎟️ 抽獎券 1 張', type: 'ticket', value: 1, chance: 15 },
  { name: '🌈 稀有稱號：彩虹蕉友', type: 'title', value: '彩虹蕉友', chance: 5 }
];
function pickPrize() {
  const total = prizes.reduce((s, p) => s + p.chance, 0);
  let r = Math.random() * total;
  for (const p of prizes) { r -= p.chance; if (r <= 0) return p; }
  return prizes[0];
}
function applyPrize(user, p) {
  if (p.type === 'banana') addBanana(user, p.value);
  if (p.type === 'exp') addExp(user, p.value);
  if (p.type === 'ticket') user.ticket = (user.ticket || 0) + p.value;
  if (p.type === 'title') user.title = p.value;
}
async function draw(user, count = 1) {
  count = Math.max(1, Math.min(10, Number(count || 1)));
  if ((user.ticket || 0) < count) return { ok: false, message: `🎟️ 抽獎券不足，需要 ${count} 張` };
  user.ticket -= count;
  const got = [];
  for (let i = 0; i < count; i++) { const p = pickPrize(); applyPrize(user, p); got.push(p.name); }
  await user.save();
  return { ok: true, message: `🎰 抽獎成功！\n\n${got.map((g, i) => `${i + 1}. ${g}`).join('\n')}` };
}
module.exports = { draw };
