const Title = require("../models/Title");
const Badge = require("../models/Badge");

const titleNames = [
  "新芽",
  "萌芽者",
  "初心者",
  "蕉友入門",
  "微光旅人",
  "晨光蕉友",
  "活力新星",
  "簽到學徒",
  "香蕉守護",
  "青銅蕉士",
  "白銀蕉友",
  "閃耀新星",
  "活躍玩家",
  "香蕉騎士",
  "歡樂使者",
  "蕉圈探險家",
  "社群旅者",
  "金色學徒",
  "蕉友勇者",
  "白銀守護",
  "黃金香蕉",
  "金光旅人",
  "人氣蕉友",
  "互動高手",
  "金蕉騎士",
  "閃耀冒險家",
  "社群菁英",
  "黃金守護者",
  "光輝蕉士",
  "金色傳說",
  "彩虹蕉友",
  "彩虹旅人",
  "虹光使者",
  "七彩冒險家",
  "彩虹守護",
  "光譜騎士",
  "虹翼玩家",
  "夢幻蕉友",
  "彩虹王者",
  "永恆彩虹至尊",
  "傳奇蕉友",
  "傳奇旅人",
  "榮耀使者",
  "蕉界大師",
  "星耀傳奇",
  "金冠守護",
  "王者蕉友",
  "榮耀騎士",
  "傳說新星",
  "香蕉傳奇",
  "星辰蕉友",
  "星河旅人",
  "星光使者",
  "銀河冒險家",
  "星辰守護",
  "月光騎士",
  "星翼玩家",
  "宇宙蕉友",
  "銀河王者",
  "星辰傳說",
  "神話蕉友",
  "烈焰旅人",
  "火光使者",
  "神話冒險家",
  "烈焰守護",
  "鳳凰騎士",
  "神翼玩家",
  "不滅蕉友",
  "神話王者",
  "烈焰傳說",
  "至尊蕉友",
  "雷光旅人",
  "閃電使者",
  "至尊冒險家",
  "雷霆守護",
  "天翼騎士",
  "至尊玩家",
  "極光蕉友",
  "雷霆王者",
  "至尊傳說",
  "永恆蕉友",
  "極光旅人",
  "永恆使者",
  "彩虹神話",
  "永恆守護",
  "時空騎士",
  "永恆玩家",
  "不朽蕉友",
  "彩虹帝王",
  "永恆傳說",
  "Ultimate I",
  "Ultimate II",
  "Ultimate III",
  "Ultimate IV",
  "Ultimate V",
  "Ultimate VI",
  "Ultimate VII",
  "Ultimate VIII",
  "Ultimate IX",
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
  const idx = Math.max(1, Math.min(100, level)) - 1;
  return titleNames[idx] || `Lv.${level} 傳奇蕉友`;
}

function badgeIdByLevel(level) {
  return `lv${String(Math.max(1, Math.min(999, level))).padStart(3, "0")}`;
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
    const titleId = `title_${String(level).padStart(3, "0")}`;
    const badgeId = badgeIdByLevel(level);

    await Title.updateOne(
      { titleId },
      {
        titleId,
        name: titleByLevel(level),
        level,
        rarity: level >= 91 ? "神話" : level >= 71 ? "傳說" : level >= 41 ? "史詩" : level >= 21 ? "稀有" : "普通",
        color: level >= 81 ? "#b983ff" : level >= 41 ? "#ff8c42" : "#d18a00",
        image: `${baseUrl}/titles/${titleId}.png`,
        description: `Lv.${level} 解鎖稱號`
      },
      { upsert: true }
    );

    await Badge.updateOne(
      { badgeId },
      {
        badgeId,
        name: `Lv.${level} ${titleByLevel(level)}徽章`,
        level,
        image: `${baseUrl}/badges/${badgeId}.png`,
        rarity: level >= 91 ? "神話" : level >= 71 ? "傳說" : level >= 41 ? "史詩" : level >= 21 ? "稀有" : "普通",
        description: `Lv.${level} 自動解鎖`
      },
      { upsert: true }
    );
  }
}

function addExp(user, amount) {
  amount = Number(amount || 0);
  user.exp += amount;
  user.totalExp = (user.totalExp || 0) + amount;

  while (user.level < 999 && user.exp >= needExp(user.level)) {
    user.exp -= needExp(user.level);
    user.level++;
    user.title = titleByLevel(user.level);
    user.titleId = `title_${String(Math.min(100, user.level)).padStart(3, "0")}`;
    user.badge = badgeIdByLevel(user.level);
    if (!user.titles.includes(user.titleId)) user.titles.push(user.titleId);
    if (!user.badges.includes(user.badge)) user.badges.push(user.badge);
  }

  return user;
}

module.exports = {
  needExp,
  totalExpForLevel,
  titleByLevel,
  badgeIdByLevel,
  progress,
  addExp,
  seedLevelAssets,
  titleNames
};
