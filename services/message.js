const { saveLog } = require("./chatLog");
const { levelTop, bananaTop, signTop } = require("./rank");
const { reward } = require("./chatReward");
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
  reward(user);
await user.save();
  switch (text) {
    case "指令":
case "幫助":
case "教學":
    return reply(event.replyToken, helpText());

    case "簽到": {
      reward(user);

await user.save();

await saveLog(
    user,
    "text",
    text,
    2,
    2
);
      return reply(event.replyToken, result.message);
    }

    case "我的資料":
    case "等級":
    case "名片":
      return reply(event.replyToken, profileCard(user));

    case "排行榜":
case "等級排行": {
  const users = await levelTop(10);

  let msg = "🏆 等級排行榜 TOP10\n\n";

  users.forEach((u, i) => {
    msg += `${i + 1}. ${u.displayName || "蕉友"}｜Lv.${u.level}｜EXP ${u.exp}\n`;
  });

  return reply(event.replyToken, msg);
}

case "香蕉幣排行": {
  const users = await bananaTop(10);

  let msg = "🍌 香蕉幣排行榜 TOP10\n\n";

  users.forEach((u, i) => {
    msg += `${i + 1}. ${u.displayName || "蕉友"}｜${u.banana} 香蕉幣\n`;
  });

  return reply(event.replyToken, msg);
}

case "簽到排行": {
  const users = await signTop(10);

  let msg = "📅 簽到排行榜 TOP10\n\n";

  users.forEach((u, i) => {
    msg += `${i + 1}. ${u.displayName || "蕉友"}｜${u.signDays} 天\n`;
  });

  return reply(event.replyToken, msg);
}
    

    case "商店":
      return reply(event.replyToken, "🛒 商店功能下一步加入");

    case "抽獎":
      return reply(event.replyToken, "🎰 抽獎功能下一步加入");

    default:
      return;
  }
}

module.exports = handle;
