const Title = require("../models/Title");

async function listUserTitles(user) {
  return await Title.find({ titleId: { $in: user.titles || [] }, enabled: true }).sort({ level: 1 });
}

async function equipTitle(user, titleNameOrId) {
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

module.exports = { listUserTitles, equipTitle };
