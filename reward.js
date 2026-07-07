const RewardLog = require("../models/RewardLog");
const { addExp } = require("./level");

async function grantReward(user, reward, source, sourceId, note = "") {
  const exp = Number(reward.rewardExp || reward.exp || 0);
  const banana = Number(reward.rewardBanana || reward.banana || 0);
  const ticket = Number(reward.rewardTicket || reward.ticket || 0);
  const titleId = reward.rewardTitleId || reward.titleId || "";

  if (exp > 0) addExp(user, exp);
  if (banana > 0) user.banana = (user.banana || 0) + banana;
  if (ticket > 0) user.ticket = (user.ticket || 0) + ticket;

  if (titleId) {
    if (!Array.isArray(user.titles)) user.titles = [];
    if (!user.titles.includes(titleId)) user.titles.push(titleId);
  }

  await user.save();

  await RewardLog.create({
    userId: user.userId,
    source,
    sourceId,
    exp,
    banana,
    ticket,
    titleId,
    note
  });

  return { exp, banana, ticket, titleId };
}

function rewardText(prefix, reward) {
  const parts = [];
  if (reward.exp) parts.push(`⭐ EXP +${reward.exp}`);
  if (reward.banana) parts.push(`🍌 香蕉幣 +${reward.banana}`);
  if (reward.ticket) parts.push(`🎟️ 抽獎券 +${reward.ticket}`);
  if (reward.titleId) parts.push(`🎖️ 稱號解鎖`);
  return `${prefix}\n${parts.length ? parts.join("\n") : "無獎勵"}`;
}

module.exports = { grantReward, rewardText };
