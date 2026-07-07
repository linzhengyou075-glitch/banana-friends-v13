const LotteryPrize = require("../models/LotteryPrize");
const { addBanana } = require("./economy");
const { addExp } = require("./level");

async function ensureDefaultPrizes() {
  const count = await LotteryPrize.countDocuments();
  if (count > 0) return;

  await LotteryPrize.create([
    { name: "🍌 100 香蕉幣", type: "banana", value: "100", chance: 50, rarity: "普通" },
    { name: "⭐ 50 EXP", type: "exp", value: "50", chance: 30, rarity: "普通" },
    { name: "🎟️ 抽獎券 1 張", type: "ticket", value: "1", chance: 15, rarity: "稀有" },
    { name: "🌈 稀有稱號：彩虹蕉友", type: "title", value: "彩虹蕉友", chance: 5, rarity: "史詩" }
  ]);
}

async function draw(user) {
  await ensureDefaultPrizes();

  if (user.ticket <= 0) {
    return { ok: false, message: "🎟️ 抽獎券不足\n可輸入「商店」購買抽獎券。" };
  }

  const prizes = await LotteryPrize.find({ enabled: true, $or: [{ stock: -1 }, { stock: { $gt: 0 } }] });
  const total = prizes.reduce((sum, p) => sum + Number(p.chance || 0), 0);
  let r = Math.random() * total;

  user.ticket -= 1;

  for (const prize of prizes) {
    r -= Number(prize.chance || 0);
    if (r <= 0) {
      if (prize.type === "banana") addBanana(user, Number(prize.value || 0));
      if (prize.type === "exp") addExp(user, Number(prize.value || 0));
      if (prize.type === "ticket") user.ticket += Number(prize.value || 1);
      if (prize.type === "title") user.title = prize.value;
      if (prize.type === "item") user.items.push(prize.value || prize.name);

      if (prize.stock > 0) {
        prize.stock -= 1;
        await prize.save();
      }

      await user.save();

      return {
        ok: true,
        message: `🎰 抽獎成功！\n\n恭喜獲得：${prize.name}\n稀有度：${prize.rarity}\n\n🎟️ 剩餘抽獎券：${user.ticket}`
      };
    }
  }

  await user.save();
  return { ok: false, message: "抽獎失敗，請稍後再試。" };
}

async function drawTen(user) {
  const results = [];
  for (let i = 0; i < 10; i++) {
    if (user.ticket <= 0) break;
    const r = await draw(user);
    results.push(r.message.replace("🎰 抽獎成功！\n\n恭喜獲得：", "").split("\n")[0]);
  }

  if (!results.length) return { ok: false, message: "🎟️ 抽獎券不足。" };

  return { ok: true, message: `🎰 十連抽結果\n\n${results.map((x, i) => `${i + 1}. ${x}`).join("\n")}\n\n🎟️ 剩餘：${user.ticket}` };
}

module.exports = { draw, drawTen, ensureDefaultPrizes };
