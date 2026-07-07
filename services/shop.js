function buy(user, item) {

  if (user.banana < item.price) {
    return {
      ok: false,
      message: "🍌 香蕉幣不足"
    };
  }

  user.banana -= item.price;

  if (!user.items) {
    user.items = [];
  }

  user.items.push(item.name);

  return {
    ok: true,
    message: `🎁 成功購買 ${item.name}`
  };
}

module.exports = {
  buy
};
