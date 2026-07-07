const { saveLog } = require("./chatLog");
const { levelTop, bananaTop, signTop } = require("./rank");
const { reward } = require("./chatReward");
const { helpText } = require("./help");
const reply = require("./reply");
const { getUser } = require("./member");
const { sign } = require("./sign");
const { profileCard } = require("./flex");
const { draw } = require("./lottery");
const { getSetting } = require("./settings");
const { adminPanel } = require("./adminPanel");
const { spendBanana } = require("./economy");

async function handle(event) {
  if (event.type !== "message") return;
  if (event.message.type !== "text") return;

  const text = event.message.text.trim();
  const userId = event.source.userId;
  const user = await getUser(userId);

  reward(user);
  await saveLog(user, "text", text, 2, 2);
  await user.save();

  switch (text) {
    case "指令":
    case "幫助":
    case "教學":
      return reply(event.replyToken, helpText());

    case "後台":
    case "管理":
    case "控制台":
      return reply(event.replyToken, adminPanel(process.env.BASE_URL || "https://banana-friends-v13.onrender.com"));

    case "簽到": {
      const result = sign(user);
      await user.save();
      return reply(event.replyToken, result.message);
    }

    case "我的資料":
    case "會員":
    case "等級":
    case "名片":
      return reply(event.replyToken, profileCard(user));

    case "公告": {
      const announcement = await getSetting("announcement", "目前沒有公告");
      return reply(event.replyToken, `📢 公告\n\n${announcement || "目前沒有公告"}`);
    }

    case "群規":
      return reply(event.replyToken, "📜 群規\n\n1. 尊重彼此，禁止騷擾與攻擊。\n2. 禁止洗版、廣告、詐騙。\n3. 請勿任意叫出他人名片。\n4. 違規者管理員可處理。\n\n更多功能持續新增中...");

    case "排行榜":
    case "等級排行": {
      const users = await levelTop(10);
      let msg = "🏆 等級排行榜 TOP10\n\n";
      if (!users.length) msg += "目前沒有資料";
      users.forEach((u, i) => {
        msg += `${i + 1}. ${u.displayName || "蕉友"}｜Lv.${u.level}｜EXP ${u.exp}\n`;
      });
      return reply(event.replyToken, msg);
    }

    case "香蕉幣排行": {
      const users = await bananaTop(10);
      let msg = "🍌 香蕉幣排行榜 TOP10\n\n";
      if (!users.length) msg += "目前沒有資料";
      users.forEach((u, i) => {
        msg += `${i + 1}. ${u.displayName || "蕉友"}｜${u.banana} 香蕉幣\n`;
      });
      return reply(event.replyToken, msg);
    }

    case "簽到排行": {
      const users = await signTop(10);
      let msg = "📅 簽到排行榜 TOP10\n\n";
      if (!users.length) msg += "目前沒有資料";
      users.forEach((u, i) => {
        msg += `${i + 1}. ${u.displayName || "蕉友"}｜${u.signDays} 天\n`;
      });
      return reply(event.replyToken, msg);
    }

    case "我的香蕉幣":
      return reply(event.replyToken, `🍌 你的香蕉幣：${user.banana}`);

    case "我的抽獎券":
    case "抽獎券":
      return reply(event.replyToken, `🎫 你的抽獎券：${user.ticket}`);

    case "商店":
      return reply(event.replyToken, "🛒 香蕉商店\n\n🎫 兌換抽獎券：100 香蕉幣 / 張\n\n輸入：兌換抽獎券");

    case "兌換抽獎券": {
      if (!spendBanana(user, 100)) {
        await user.save();
        return reply(event.replyToken, "🍌 香蕉幣不足，兌換抽獎券需要 100 香蕉幣。");
      }
      user.ticket += 1;
      await user.save();
      return reply(event.replyToken, `🎫 兌換成功！\n目前抽獎券：${user.ticket} 張`);
    }

    case "抽獎": {
      const result = draw(user);
      await user.save();
      return reply(event.replyToken, result.message);
    }

    default:
      return;
  }
}

module.exports = handle;
