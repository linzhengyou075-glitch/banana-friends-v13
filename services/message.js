const { helpText } = require("./help");
const reply = require("./reply");
const { getUser } = require("./member");
const { sign } = require("./sign");
const { profileCard } = require("./flex");

async function handle(event) {

  if (event.type !== "message") return;
  if (event.message.type !== "text") return;

  const text = event.message.text.trim();
  const userId = event.source.userId;

  const user = await getUser(userId);

  switch (text) {
    case "指令":
case "幫助":
case "教學":
    return reply(event.replyToken, helpText());

    case "簽到": {
      const result = sign(user);
      await user.save();
      return reply(event.replyToken, result.message);
    }

    case "我的資料":
    case "等級":
    case "名片":
      return reply(event.replyToken, profileCard(user));

    case "排行榜":
      return reply(event.replyToken, "🏆 排行榜功能下一步加入");

    case "商店":
      return reply(event.replyToken, "🛒 商店功能下一步加入");

    case "抽獎":
      return reply(event.replyToken, "🎰 抽獎功能下一步加入");

    default:
      return;
  }
}

module.exports = handle;
