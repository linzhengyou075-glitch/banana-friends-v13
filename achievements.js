const Achievement = require("../models/Achievement");
const UserAchievement = require("../models/UserAchievement");
const { grantReward, rewardText } = require("./reward");

const defaults = [
  { achievementId: "sign_1", name: "初次簽到", description: "累積簽到 1 天", targetKey: "signDays", targetValue: 1, rewardExp: 20, rewardBanana: 50, rewardTicket: 0, rarity: "普通" },
  { achievementId: "sign_7", name: "一週蕉友", description: "累積簽到 7 天", targetKey: "signDays", targetValue: 7, rewardExp: 80, rewardBanana: 200, rewardTicket: 1, rarity: "稀有" },
  { achievementId: "sign_30", name: "月簽守護者", description: "累積簽到 30 天", targetKey: "signDays", targetValue: 30, rewardExp: 300, rewardBanana: 800, rewardTicket: 3, rarity: "史詩" },
  { achievementId: "level_10", name: "白銀蕉友", description: "等級達到 Lv.10", targetKey: "level", targetValue: 10, rewardExp: 50, rewardBanana: 200, rewardTicket: 1, rarity: "稀有" },
  { achievementId: "level_30", name: "彩虹蕉友", description: "等級達到 Lv.30", targetKey: "level", targetValue: 30, rewardExp: 200, rewardBanana: 600, rewardTicket: 2, rarity: "史詩" },
  { achievementId: "level_50", name: "傳奇蕉友", description: "等級達到 Lv.50", targetKey: "level", targetValue: 50, rewardExp: 500, rewardBanana: 1500, rewardTicket: 5, rarity: "傳說" },
  { achievementId: "banana_1000", name: "香蕉小富翁", description: "香蕉幣達到 1000", targetKey: "banana", targetValue: 1000, rewardExp: 100, rewardBanana: 100, rewardTicket: 1, rarity: "稀有" },
  { achievementId: "chat_100", name: "聊天新星", description: "累積聊天 100 則", targetKey: "totalChat", targetValue: 100, rewardExp: 100, rewardBanana: 200, rewardTicket: 1, rarity: "稀有" },
  { achievementId: "sticker_50", name: "貼圖收藏家", description: "累積貼圖 50 張", targetKey: "stickerCount", targetValue: 50, rewardExp: 80, rewardBanana: 150, rewardTicket: 1, rarity: "普通" },
  { achievementId: "image_20", name: "圖片分享家", description: "累積圖片 20 張", targetKey: "imageCount", targetValue: 20, rewardExp: 80, rewardBanana: 150, rewardTicket: 1, rarity: "普通" }
];

async function seedAchievements() {
  for (const a of defaults) {
    await Achievement.updateOne({ achievementId: a.achievementId }, { ...a, enabled: true }, { upsert: true });
  }
}

function valueOf(user, key) {
  return Number(user[key] || 0);
}

async function checkAchievements(user) {
  await seedAchievements();
  const achievements = await Achievement.find({ enabled: true });
  const unlocked = [];

  for (const a of achievements) {
    const exists = await UserAchievement.findOne({ userId: user.userId, achievementId: a.achievementId });
    if (exists) continue;

    if (valueOf(user, a.targetKey) >= a.targetValue) {
      await UserAchievement.create({
        userId: user.userId,
        achievementId: a.achievementId,
        unlocked: true,
        claimed: false
      });
      unlocked.push(a);
    }
  }

  return unlocked;
}

async function listUserAchievements(user) {
  await seedAchievements();
  await checkAchievements(user);

  const all = await Achievement.find({ enabled: true }).sort({ targetKey: 1, targetValue: 1 });
  const owned = await UserAchievement.find({ userId: user.userId });
  const map = new Map(owned.map(x => [x.achievementId, x]));

  return all.map(a => ({ achievement: a, record: map.get(a.achievementId) || null }));
}

async function claimAchievement(user, nameOrId) {
  await seedAchievements();
  await checkAchievements(user);

  const a = await Achievement.findOne({
    enabled: true,
    $or: [{ achievementId: nameOrId }, { name: nameOrId }]
  });

  if (!a) return { ok: false, message: "找不到這個成就。" };

  const record = await UserAchievement.findOne({ userId: user.userId, achievementId: a.achievementId });
  if (!record) return { ok: false, message: `尚未解鎖成就：${a.name}` };
  if (record.claimed) return { ok: false, message: `成就已領取：${a.name}` };

  record.claimed = true;
  await record.save();

  const reward = await grantReward(user, a, "achievement", a.achievementId, a.name);
  return { ok: true, message: rewardText(`🏆 成就獎勵已領取：${a.name}`, reward) };
}

function achievementText(rows) {
  return `🏆 我的成就\n\n` + rows.map(({ achievement, record }) => {
    const status = record?.claimed ? "✅ 已領" : record ? "🎁 可領" : "🔒 未解鎖";
    return `【${status}】${achievement.name}（${achievement.rarity}）\n${achievement.description}\n獎勵：EXP ${achievement.rewardExp}｜🍌 ${achievement.rewardBanana}｜🎟️ ${achievement.rewardTicket}\n${record && !record.claimed ? `領取：領取成就 ${achievement.name}` : ""}`;
  }).join("\n\n");
}

module.exports = {
  seedAchievements,
  checkAchievements,
  listUserAchievements,
  claimAchievement,
  achievementText
};
