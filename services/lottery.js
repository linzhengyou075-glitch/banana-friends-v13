function draw(user) {

  if (user.ticket <= 0) {
    return {
      ok: false,
      message: "🎟️ 抽獎券不足"
    };
  }

  user.ticket -= 1;

  const prizes = [
    {
      name: "🍌 100 香蕉幣",
      type: "banana",
      value: 100,
      chance: 50
    },
    {
      name: "⭐ 50 EXP",
      type: "exp",
      value: 50,
      chance: 30
    },
    {
      name: "🎟️ 抽獎券 1 張",
      type: "ticket",
      value: 1,
      chance: 15
    },
    {
      name: "🌈 稀有稱號：彩虹蕉友",
      type: "title",
      value: "彩虹蕉友",
      chance: 5
    }
  ];

  const total = prizes.reduce((sum, prize) => sum + prize.chance, 0);
  let random = Math.random() * total;

  for (const prize of prizes) {
    random -= prize.chance;

    if (random <= 0) {

      if (prize.type === "banana") {
        user.banana += prize.value;
      }

      if (prize.type === "exp") {
        user.exp += prize.value;
      }

      if (prize.type === "ticket") {
        user.ticket += prize.value;
      }

      if (prize.type === "title") {
        user.title = prize.value;
      }

      return {
        ok: true,
        prize,
        message: `🎰 抽獎成功！\n恭喜獲得：${prize.name}`
      };
    }
  }
}

module.exports = {
  draw
};
