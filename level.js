const Title = require("../models/Title");
const Badge = require("../models/Badge");

const titleNames = [
  "新芽",
  "萌芽者",
  "初心者",
  "新朋友",
  "活力新星",
  "香蕉夥伴",
  "歡樂旅人",
  "聊天高手",
  "暖心使者",
  "人氣新秀",
  "彩虹旅人",
  "彩虹好友",
  "彩虹使者",
  "彩虹精靈",
  "彩虹守護者",
  "星光達人",
  "活躍達人",
  "榮耀之星",
  "榮耀勇者",
  "榮耀騎士",
  "白金菁英",
  "鑽石菁英",
  "星耀菁英",
  "榮耀領主",
  "彩虹領主",
  "彩虹公爵",
  "彩虹君王",
  "彩虹霸主",
  "永恆之星",
  "永恆守護者",
  "永恆彩虹",
  "永恆璀璨",
  "永恆璀璨彩虹",
  "永恆聖翼",
  "永恆不滅",
  "永恆璀璨彩虹不滅",
  "彩虹神話",
  "彩虹創世者",
  "彩虹至高神",
  "永恆璀璨彩虹不滅創世神",
  "蕉界傳奇",
  "星河旅者",
  "星辰守望",
  "光耀使徒",
  "銀河領航",
  "榮耀聖者",
  "夢境編織者",
  "水晶賢者",
  "星空守護神",
  "傳說蕉王",
  "神話新星",
  "神話旅人",
  "神話使者",
  "神話守護者",
  "神話騎士",
  "神話領主",
  "神話君王",
  "神話霸主",
  "神話帝王",
  "神話至尊",
  "烈焰之星",
  "烈焰旅者",
  "烈焰使者",
  "烈焰守護者",
  "烈焰騎士",
  "烈焰領主",
  "烈焰君王",
  "烈焰霸主",
  "烈焰帝王",
  "不滅烈焰",
  "雷霆之星",
  "雷霆旅者",
  "雷霆使者",
  "雷霆守護者",
  "雷霆騎士",
  "雷霆領主",
  "雷霆君王",
  "雷霆霸主",
  "雷霆帝王",
  "至尊雷霆",
  "極光之星",
  "極光旅者",
  "極光使者",
  "極光守護者",
  "極光騎士",
  "極光領主",
  "極光君王",
  "極光霸主",
  "極光帝王",
  "永恆極光",
  "時空之星",
  "時空旅者",
  "時空使者",
  "時空守護者",
  "時空騎士",
  "時空領主",
  "時空君王",
  "時空霸主",
  "時空帝王",
  "Banana Ultimate"
];

function needExp(level) {
  return Math.floor(60 * level + 15 * level * level + Math.pow(level, 2.1));
}

function totalExpForLevel(level) {
  let total = 0;
  for (let i = 1; i < level; i++) total += needExp(i);
  return total;
}

function titleByLevel(level) {
  const idx = Math.max(1, Math.min(100, Number(level) || 1)) - 1;
  return titleNames[idx] || `Lv.${level} 傳奇蕉友`;
}

function badgeIdByLevel(level) {
  return `lv${String(Math.max(1, Math.min(999, Number(level) || 1))).padStart(3, "0")}`;
}

function titleIdByLevel(level) {
  return `title_${String(Math.max(1, Math.min(100, Number(level) || 1))).padStart(3, "0")}`;
}

function rarityByLevel(level) {
  if (level >= 91) return "神話";
  if (level >= 71) return "傳說";
  if (level >= 51) return "史詩";
  if (level >= 31) return "稀有";
  return "普通";
}

function progress(user) {
  const need = needExp(user.level || 1);
  const current = user.exp || 0;
  const percent = need ? Math.max(0, Math.min(100, Math.round((current / need) * 100))) : 100;
  return { current, need, percent };
}

async function seedLevelAssets() {
  const baseUrl = process.env.BASE_URL || "https://banana-friends-v13.onrender.com";

  for (let level = 1; level <= 100; level++) {
    const titleId = titleIdByLevel(level);
    const badgeId = badgeIdByLevel(level);
    const name = titleByLevel(level);

    await Title.updateOne(
      { titleId },
      {
        titleId,
        name,
        level,
        rarity: rarityByLevel(level),
        color: level >= 81 ? "#b983ff" : level >= 41 ? "#ff8c42" : "#d18a00",
        image: `${baseUrl}/titles/${titleId}.png`,
        description: `Lv.${level} 解鎖稱號：${name}`,
        enabled: true
      },
      { upsert: true }
    );

    await Badge.updateOne(
      { badgeId },
      {
        badgeId,
        name: `Lv.${level} ${name}徽章`,
        level,
        image: `${baseUrl}/badges/${badgeId}.png`,
        rarity: rarityByLevel(level),
        description: `Lv.${level} 自動解鎖：${name}`,
        enabled: true
      },
      { upsert: true }
    );
  }
}

function syncLevelReward(user) {
  const level = Number(user.level || 1);
  user.title = titleByLevel(level);
  user.titleId = titleIdByLevel(level);
  user.badge = badgeIdByLevel(level);

  if (!Array.isArray(user.titles)) user.titles = [];
  if (!Array.isArray(user.badges)) user.badges = [];

  for (let i = 1; i <= Math.min(100, level); i++) {
    const tid = titleIdByLevel(i);
    const bid = badgeIdByLevel(i);
    if (!user.titles.includes(tid)) user.titles.push(tid);
    if (!user.badges.includes(bid)) user.badges.push(bid);
  }

  return user;
}

function addExp(user, amount) {
  amount = Number(amount || 0);
  user.exp += amount;
  user.totalExp = (user.totalExp || 0) + amount;

  while (user.level < 999 && user.exp >= needExp(user.level)) {
    user.exp -= needExp(user.level);
    user.level++;
  }

  syncLevelReward(user);
  return user;
}

function nextTitleInfo(user) {
  const level = Number(user.level || 1);
  const next = Math.min(100, level + 1);
  return {
    currentLevel: level,
    currentTitle: titleByLevel(level),
    nextLevel: next,
    nextTitle: titleByLevel(next),
    needExp: needExp(level),
    currentExp: user.exp || 0
  };
}

module.exports = {
  needExp,
  totalExpForLevel,
  titleByLevel,
  titleIdByLevel,
  badgeIdByLevel,
  rarityByLevel,
  progress,
  addExp,
  syncLevelReward,
  seedLevelAssets,
  nextTitleInfo,
  titleNames
};
