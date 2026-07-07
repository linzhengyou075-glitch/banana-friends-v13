const { addExp } = require("./level");
const { addBanana } = require("./economy");
const { getAllSettings } = require("./settings");
const { resetDaily } = require("./date");

async function reward(user, type = "text", text = "") {
  resetDaily(user);

  const s = await getAllSettings();
  const now = Date.now();

  if (user.lastMessage === text && now - (user.lastMessageAt || 0) < 30000) {
    user.lastMessageAt = now;
    return { exp: 0, banana: 0 };
  }

  user.lastMessage = text;
  user.lastMessageAt = now;

  let exp = Number(s.chatExp || 2);
  let banana = Number(s.chatBanana || 2);

  if (type === "sticker") exp = 2;
  if (type === "image") exp = 3;

  const expRemain = Math.max(0, Number(s.dailyExpLimit || 300) - (user.todayExp || 0));
  const bananaRemain = Math.max(0, Number(s.dailyBananaLimit || 500) - (user.todayBanana || 0));

  exp = Math.min(exp, expRemain);
  banana = Math.min(banana, bananaRemain);

  if (exp > 0) addExp(user, exp);
  if (banana > 0) addBanana(user, banana);

  user.todayExp += exp;
  user.todayBanana += banana;
  user.chatCount += type === "text" ? 1 : 0;
  user.todayChat += type === "text" ? 1 : 0;
  if (type === "sticker") user.stickerCount += 1;
  if (type === "image") user.imageCount += 1;

  return { exp, banana };
}

module.exports = { reward };
