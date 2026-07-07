const { addExp } = require("./level");
const { addBanana } = require("./economy");

function draw(user) {
  if (user.ticket <= 0) {
    return { ok: false, message: "🎟️ 抽獎券不足\n可用香蕉幣兌換：兌換抽獎券" };
  }

  user.ticket -= 1;

  const prizes = [
    { name: "🍌 100 香蕉幣", type: "banana", value: 100, chance: 50 },
    { name: "⭐ 50 EXP", type: "exp", value: 50, chance: 30 },
    { name: "🎟️ 抽獎券 1 張", type: "ticket", value: 1, chance: 15 },
    { name: "🌈 稀有稱號：彩虹蕉友", type: "title", value: "彩虹蕉友", chance: 5 }
  ];

  const total = prizes.reduce((sum, prize) => sum + prize.chance, 0);
  let random = Math.random() * total;

  for (const prize of prizes) {
    random -= prize.chance;
    if (random <= 0) {
      if (prize.type === "banana") addBanana(user, prize.value);
      if (prize.type === "exp") addExp(user, prize.value);
      if (prize.type === "ticket") user.ticket += prize.value;
      if (prize.type === "title") user.title = prize.value;
      return { ok: true, prize, message: `🎰 抽獎成功！\n恭喜獲得：${prize.name}` };
    }
  }

  return { ok: false, message: "抽獎失敗，請再試一次。" };
}

function exchangeTicket(user) {
  const price = 100;
  if (user.banana < price) {
    return { ok: false, message: `🍌 香蕉幣不足\n兌換 1 張抽獎券需要 ${price} 香蕉幣。` };
  }
  user.banana -= price;
  user.ticket += 1;
  return { ok: true, message: `🎟️ 兌換成功！\n花費 ${price} 香蕉幣，獲得抽獎券 1 張。\n目前抽獎券：${user.ticket} 張` };
}

module.exports = { draw, exchangeTicket };
