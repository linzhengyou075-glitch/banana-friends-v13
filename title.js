const Title = require("../models/Title");
const { titleNames, nextTitleInfo, syncLevelReward } = require("./level");

async function listUserTitles(user) {
  syncLevelReward(user);
  return await Title.find({ titleId: { $in: user.titles || [] }, enabled: true }).sort({ level: 1 });
}

async function equipTitle(user, titleNameOrId) {
  syncLevelReward(user);

  const title = await Title.findOne({
    enabled: true,
    $or: [{ titleId: titleNameOrId }, { name: titleNameOrId }]
  });

  if (!title) return { ok: false, message: "找不到這個稱號。" };
  if (!user.titles.includes(title.titleId)) return { ok: false, message: "你尚未擁有這個稱號。" };

  user.titleId = title.titleId;
  user.title = title.name;
  await user.save();

  return { ok: true, message: `🎖️ 已裝備稱號：${title.name}` };
}

function titleBook(page = 1) {
  page = Math.max(1, Number(page) || 1);
  const perPage = 20;
  const start = (page - 1) * perPage;
  const list = titleNames.slice(start, start + perPage);
  const maxPage = Math.ceil(titleNames.length / perPage);

  if (!list.length) return `沒有第 ${page} 頁，稱號表共 ${maxPage} 頁。`;

  return `🎖️ 等級稱號表 ${page}/${maxPage}\n\n` +
    list.map((name, i) => {
      const lv = start + i + 1;
      return `Lv.${lv}｜${name}`;
    }).join("\n") +
    `\n\n輸入：稱號表 ${page + 1}`;
}

function nextTitleText(user) {
  const info = nextTitleInfo(user);
  if (info.currentLevel >= 100) {
    return `🎖️ 目前稱號：${info.currentTitle}\n你已達 Lv.100 稱號系統頂點。`;
  }

  return `🎖️ 稱號進度\n\n目前：Lv.${info.currentLevel}｜${info.currentTitle}\n下一級：Lv.${info.nextLevel}｜${info.nextTitle}\nEXP：${info.currentExp}/${info.needExp}`;
}

module.exports = { listUserTitles, equipTitle, titleBook, nextTitleText };
