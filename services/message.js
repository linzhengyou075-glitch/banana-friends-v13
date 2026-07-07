const reply = require("./reply");
const { getUser } = require("./member");

async function handle(event) {

  if (event.type !== "message") return;

  if (event.message.type !== "text") return;

  const text = event.message.text.trim();

  const profile = await event.source.userId;

  const user = await getUser(profile);

  switch (text) {

    case "簽到":
      return reply(event.replyToken, "🍌 簽到功能建置中");

    case "我的資料":
      return reply(event.replyToken, "👤 我的資料功能建置中");

    case "排行榜":
      return reply(event.replyToken, "🏆 排行榜功能建置中");

    case "商店":
      return reply(event.replyToken, "🛒 商店功能建置中");

    case "抽獎":
      return reply(event.replyToken, "🎰 抽獎功能建置中");

    default:
      return;
  }

}

module.exports = handle;
