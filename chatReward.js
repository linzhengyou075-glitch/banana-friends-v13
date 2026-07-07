const { addExp } = require("./level");
const { addBanana } = require("./economy");

function reward(user, messageType = "text") {
  const maxExp = 300;
  const maxBanana = 300;
  let exp = 0;
  let banana = 0;

  if (messageType === "text") {
    exp = 2;
    banana = 2;
    user.totalChat += 1;
    user.todayChat += 1;
  }

  if (messageType === "sticker") {
    exp = 1;
    banana = 1;
    user.stickerCount += 1;
  }

  if (messageType === "image") {
    exp = 1;
    banana = 1;
    user.imageCount += 1;
  }

  if (user.todayExp >= maxExp) exp = 0;
  if (user.todayBanana >= maxBanana) banana = 0;

  exp = Math.max(0, Math.min(exp, maxExp - user.todayExp));
  banana = Math.max(0, Math.min(banana, maxBanana - user.todayBanana));

  if (exp > 0) {
    addExp(user, exp);
    user.todayExp += exp;
  }

  if (banana > 0) {
    addBanana(user, banana);
    user.todayBanana += banana;
  }

  return { exp, banana };
}

module.exports = { reward };
