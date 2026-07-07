const { saveLog } = require("./chatLog");
const {
  levelTop,
  bananaTop,
  signTop,
  todayChatTop,
  yesterdayChatTop,
  stickerTop,
  imageTop
} = require("./rank");
const { reward } = require("./chatReward");
const { helpText } = require("./help");
const reply = require("./reply");
const { getUser } = require("./member");
const { sign } = require("./sign");
const { profileCard } = require("./flex");
const { draw, exchangeTicket } = require("./lottery");

function rankText(title, users, lineFn) {
  let msg = `${title} TOP10\n\n`;
  if (!users.length) return `${title}\n\n目前沒有資料`;
  users.forEach((u, i) => {
    msg += `${i + 1}. ${u.displayName || "蕉友"}｜${lineFn(u)}\n`;
  });
  return msg;
}

async function handle(event) {
  if (event.type !== "message") return;

  const userId = event.source.userId;
  if (!userId) return;

  const user = await getUser(userId);
  const messageType = event.message.type;

  if (["text", "sticker", "image"].includes(messageType)) {
    const result = reward(user, messageType);
    await saveLog(user, messageType, messageType === "text" ? event.message.text : "", result.exp, result.banana);
    await user.save();
  }

  if (messageType !== "text") return;

  const text = event.message.text.trim();

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

    case "我的香蕉幣":
    case "香蕉幣":
      return reply(event.replyToken, `🍌 你的香蕉幣：${user.banana}\n今日獲得：${user.todayBanana || 0}`);

    case "我的抽獎券":
    case "抽獎券":
      return reply(event.replyToken, `🎟️ 你的抽獎券：${user.ticket || 0} 張`);

    case "兌換抽獎券": {
      const result = exchangeTicket(user);
      await user.save();
      return reply(event.replyToken, result.message);
    }

    case "抽獎": {
      const result = draw(user);
      await user.save();
      return reply(event.replyToken, result.message);
    }

    case "排行榜":
    case "等級排行": {
      const users = await levelTop(10);
      return reply(event.replyToken, rankText("🏆 等級排行榜", users, (u) => `Lv.${u.level}｜EXP ${u.exp}`));
    }

    case "香蕉幣排行": {
      const users = await bananaTop(10);
      return reply(event.replyToken, rankText("🍌 香蕉幣排行榜", users, (u) => `${u.banana} 香蕉幣`));
    }

    case "簽到排行": {
      const users = await signTop(10);
      return reply(event.replyToken, rankText("📅 簽到排行榜", users, (u) => `${u.signDays} 天`));
    }

    case "本日聊天排行":
    case "今日聊天排行": {
      const users = await todayChatTop(10);
      return reply(event.replyToken, rankText("💬 本日聊天排行榜", users, (u) => `${u.todayChat || 0} 則`));
    }

    case "昨日聊天排行": {
      const users = await yesterdayChatTop(10);
      return reply(event.replyToken, rankText("🗓️ 昨日聊天排行榜", users, (u) => `${u.yesterdayChat || 0} 則`));
    }

    case "貼圖排行": {
      const users = await stickerTop(10);
      return reply(event.replyToken, rankText("😀 貼圖排行榜", users, (u) => `${u.stickerCount || 0} 張`));
    }

    case "圖片排行": {
      const users = await imageTop(10);
      return reply(event.replyToken, rankText("🖼️ 圖片排行榜", users, (u) => `${u.imageCount || 0} 張`));
    }

    case "商店":
      return reply(event.replyToken, "🛒 香蕉商店\n\n🎟️ 抽獎券｜100 香蕉幣\n輸入：兌換抽獎券");

    case "公告":
      return reply(event.replyToken, "📢 公告\n\n目前沒有公告");

    case "群規":
      return reply(event.replyToken, "📜 群規\n\n1. 尊重彼此\n2. 禁止騷擾與廣告\n3. 不要洗版\n4. 開心聊天，蕉個朋友吧！🍌");

    default:
      return;
  }
}

module.exports = handle;
