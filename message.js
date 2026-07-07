const reply = require("./reply");
const { getUser, fetchLineProfile } = require("./member");
const { sign } = require("./sign");
const { profileCard, adminCard } = require("./flex");
const { quickMenuCard } = require("./menu");
const { helpText } = require("./help");
const { reward } = require("./chatReward");
const { saveLog } = require("./chatLog");
const { getSetting } = require("./settings");
const { listShop, buyItem } = require("./shop");
const { draw, drawTen } = require("./lottery");
const { seedLevelAssets } = require("./level");
const { seedAppearanceAssets } = require("./assets");
const { listUserTitles, equipTitle } = require("./title");
const { listFrames, listBackgrounds, equipFrame, equipBackground } = require("./appearance");
const {
  levelTop,
  bananaTop,
  signTop,
  todayChatTop,
  yesterdayChatTop,
  stickerTop,
  imageTop
} = require("./rank");

let seeded = false;
async function ensureSeeded() {
  if (seeded) return;
  seeded = true;
  await seedLevelAssets();
  await seedAppearanceAssets();
}

function baseUrlFromEvent() {
  return process.env.BASE_URL || "https://banana-friends-v13.onrender.com";
}

function rankingText(title, users, lineFn) {
  let msg = `${title} TOP10\n\n`;
  users.forEach((u, i) => {
    const icon = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
    msg += `${icon} ${u.displayName || "蕉友"}｜${lineFn(u)}\n`;
  });
  return msg;
}

async function handle(event) {
  await ensureSeeded();

  if (event.type === "join") {
    const welcome = await getSetting("welcome", "👋 歡迎加入 🍌〔蕉〕個朋友吧！");
    return reply(event.replyToken, welcome);
  }

  if (event.type !== "message") return;

  const userId = event.source.userId || event.source.groupId || "unknown";
  const profile = await fetchLineProfile(event);
  const user = await getUser(userId, "", profile);

  if (event.message.type === "sticker") {
    const r = await reward(user, "sticker", "sticker");
    await user.save();
    await saveLog(user, "sticker", "sticker", r.exp, r.banana);
    return;
  }

  if (event.message.type === "image") {
    const r = await reward(user, "image", "image");
    await user.save();
    await saveLog(user, "image", "image", r.exp, r.banana);
    return;
  }

  if (event.message.type !== "text") return;

  const text = event.message.text.trim();

  const noRewardCommands = ["簽到", "幫助", "指令", "教學", "我的資料", "等級", "名片", "排行榜", "公告", "群規", "後台", "選單", "主選單", "快捷鍵", "稱號", "我的稱號", "頭像框", "背景"];
  if (!noRewardCommands.includes(text) && !text.startsWith("購買 ") && !text.startsWith("裝備稱號 ") && !text.startsWith("裝備頭像框 ") && !text.startsWith("裝備背景 ")) {
    const r = await reward(user, "text", text);
    await saveLog(user, "text", text, r.exp, r.banana);
    await user.save();
  }

  switch (text) {
    case "指令":
    case "幫助":
    case "教學":
      return reply(event.replyToken, helpText());

    case "選單":
    case "主選單":
    case "快捷鍵":
    case "功能":
      return reply(event.replyToken, quickMenuCard());

    case "後台":
    case "管理":
    case "控制台":
      return reply(event.replyToken, adminCard(baseUrlFromEvent()));

    case "簽到": {
      const result = await sign(user);
      await user.save();
      return reply(event.replyToken, result.message);
    }

    case "我的資料":
    case "我的香蕉幣":
    case "香蕉幣":
    case "會員":
    case "等級":
    case "名片":
    case "展示我的名片":
      return reply(event.replyToken, profileCard(user));

    case "背包":
      return reply(event.replyToken, `🎒 我的背包\n\n🎟️ 抽獎券：${user.ticket}\n🎖️ 稱號：${user.title || "新手蕉友"}\n🖼️ 頭像框：${user.frame}\n🌈 背景：${user.background}\n🎁 道具：${(user.backpack && user.backpack.length) ? user.backpack.join("、") : "目前沒有道具"}`);

    case "稱號":
    case "我的稱號": {
      const titles = await listUserTitles(user);
      const msg = titles.length
        ? `🎖️ 我的稱號\n\n${titles.map(t => `・${t.name}（${t.rarity}）\n裝備：裝備稱號 ${t.name}`).join("\n\n")}`
        : "你目前沒有稱號。";
      return reply(event.replyToken, msg);
    }

    case "頭像框": {
      const frames = await listFrames(user);
      const msg = frames.length
        ? `🖼️ 我的頭像框\n\n${frames.map(f => `・${f.name}（${f.rarity}）\n裝備：裝備頭像框 ${f.name}`).join("\n\n")}`
        : "你目前沒有頭像框。";
      return reply(event.replyToken, msg);
    }

    case "背景": {
      const bgs = await listBackgrounds(user);
      const msg = bgs.length
        ? `🌈 我的背景\n\n${bgs.map(b => `・${b.name}（${b.rarity}）\n裝備：裝備背景 ${b.name}`).join("\n\n")}`
        : "你目前沒有背景。";
      return reply(event.replyToken, msg);
    }

    case "公告": {
      const announcement = await getSetting("announcement", "目前沒有公告");
      return reply(event.replyToken, `📢 公告\n\n${announcement}`);
    }

    case "群規": {
      const rules = await getSetting("groupRules", "目前沒有群規");
      return reply(event.replyToken, `📜 群規\n\n${rules}`);
    }

    case "排行榜":
    case "等級排行": {
      const users = await levelTop(10);
      return reply(event.replyToken, rankingText("🏆 等級排行榜", users, u => `Lv.${u.level}｜${u.title || "新手蕉友"}`));
    }

    case "香蕉幣排行": {
      const users = await bananaTop(10);
      return reply(event.replyToken, rankingText("🍌 香蕉幣排行榜", users, u => `${u.banana} 香蕉幣`));
    }

    case "簽到排行": {
      const users = await signTop(10);
      return reply(event.replyToken, rankingText("📅 簽到排行榜", users, u => `${u.signDays} 天`));
    }

    case "本日聊天排行": {
      const users = await todayChatTop(10);
      return reply(event.replyToken, rankingText("💬 本日聊天排行榜", users, u => `${u.todayChat || 0} 則`));
    }

    case "昨日聊天排行": {
      const users = await yesterdayChatTop(10);
      return reply(event.replyToken, rankingText("🗓️ 昨日聊天排行榜", users, u => `${u.yesterdayChat || 0} 則`));
    }

    case "貼圖排行": {
      const users = await stickerTop(10);
      return reply(event.replyToken, rankingText("😀 貼圖排行榜", users, u => `${u.stickerCount || 0} 張`));
    }

    case "圖片排行": {
      const users = await imageTop(10);
      return reply(event.replyToken, rankingText("🖼️ 圖片排行榜", users, u => `${u.imageCount || 0} 張`));
    }

    case "商店": {
      const items = await listShop();
      let msg = "🛒 香蕉商店\n\n";
      items.forEach((item, i) => {
        msg += `${i + 1}. ${item.name}｜🍌${item.price}\n${item.description || ""}\n輸入：購買 ${item.name}\n\n`;
      });
      return reply(event.replyToken, msg.trim());
    }

    case "抽獎": {
      const result = await draw(user);
      return reply(event.replyToken, result.message);
    }

    case "十連抽": {
      const result = await drawTen(user);
      return reply(event.replyToken, result.message);
    }

    default:
      if (text.startsWith("購買 ")) {
        const itemName = text.replace("購買 ", "").trim();
        const result = await buyItem(user, itemName);
        return reply(event.replyToken, result.message);
      }

      if (text.startsWith("裝備稱號 ")) {
        const name = text.replace("裝備稱號 ", "").trim();
        const result = await equipTitle(user, name);
        return reply(event.replyToken, result.message);
      }

      if (text.startsWith("裝備頭像框 ")) {
        const name = text.replace("裝備頭像框 ", "").trim();
        const result = await equipFrame(user, name);
        return reply(event.replyToken, result.message);
      }

      if (text.startsWith("裝備背景 ")) {
        const name = text.replace("裝備背景 ", "").trim();
        const result = await equipBackground(user, name);
        return reply(event.replyToken, result.message);
      }

      return;
  }
}

module.exports = handle;
