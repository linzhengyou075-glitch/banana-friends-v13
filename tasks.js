const Task = require("../models/Task");
const UserTask = require("../models/UserTask");
const { periodKey } = require("./period");
const { grantReward, rewardText } = require("./reward");

const defaultTasks = [
  { taskId: "daily_sign", name: "每日簽到", description: "完成今日簽到 1 次", type: "daily", targetKey: "sign", targetValue: 1, rewardExp: 20, rewardBanana: 50, rewardTicket: 0 },
  { taskId: "daily_chat_10", name: "聊天達人", description: "今日聊天 10 則", type: "daily", targetKey: "chat", targetValue: 10, rewardExp: 30, rewardBanana: 80, rewardTicket: 0 },
  { taskId: "daily_sticker_3", name: "貼圖玩家", description: "今日傳送貼圖 3 張", type: "daily", targetKey: "sticker", targetValue: 3, rewardExp: 15, rewardBanana: 30, rewardTicket: 0 },
  { taskId: "daily_image_1", name: "分享圖片", description: "今日傳送圖片 1 張", type: "daily", targetKey: "image", targetValue: 1, rewardExp: 15, rewardBanana: 30, rewardTicket: 0 },
  { taskId: "weekly_sign_5", name: "本週簽到王", description: "本週簽到 5 天", type: "weekly", targetKey: "sign", targetValue: 5, rewardExp: 120, rewardBanana: 250, rewardTicket: 1 },
  { taskId: "weekly_chat_50", name: "本週活躍王", description: "本週聊天 50 則", type: "weekly", targetKey: "chat", targetValue: 50, rewardExp: 150, rewardBanana: 300, rewardTicket: 1 }
];

async function seedTasks() {
  for (const t of defaultTasks) {
    await Task.updateOne({ taskId: t.taskId }, { ...t, enabled: true }, { upsert: true });
  }
}

async function getOrCreateUserTask(user, task) {
  const key = periodKey(task.type);
  let record = await UserTask.findOne({ userId: user.userId, taskId: task.taskId, periodKey: key });
  if (!record) {
    record = await UserTask.create({
      userId: user.userId,
      taskId: task.taskId,
      periodKey: key,
      progress: 0,
      completed: false,
      claimed: false
    });
  }
  return record;
}

async function addTaskProgress(user, targetKey, amount = 1) {
  await seedTasks();
  const tasks = await Task.find({ enabled: true, targetKey });
  const completed = [];

  for (const task of tasks) {
    const record = await getOrCreateUserTask(user, task);
    if (record.claimed) continue;

    record.progress += Number(amount || 1);
    if (record.progress >= task.targetValue) record.completed = true;
    await record.save();

    if (record.completed && !record.claimed) completed.push(task.name);
  }

  return completed;
}

async function listUserTasks(user, type = "daily") {
  await seedTasks();
  const tasks = await Task.find({ enabled: true, type }).sort({ targetKey: 1, targetValue: 1 });
  const rows = [];

  for (const task of tasks) {
    const record = await getOrCreateUserTask(user, task);
    rows.push({ task, record });
  }

  return rows;
}

async function claimTask(user, taskNameOrId) {
  await seedTasks();
  const task = await Task.findOne({
    enabled: true,
    $or: [{ taskId: taskNameOrId }, { name: taskNameOrId }]
  });

  if (!task) return { ok: false, message: "找不到這個任務。" };

  const record = await getOrCreateUserTask(user, task);

  if (!record.completed) {
    return { ok: false, message: `任務尚未完成：${task.name}\n進度：${record.progress}/${task.targetValue}` };
  }

  if (record.claimed) {
    return { ok: false, message: `這個任務今天/本週已領取：${task.name}` };
  }

  record.claimed = true;
  await record.save();

  const reward = await grantReward(user, task, "task", task.taskId, task.name);

  return {
    ok: true,
    message: rewardText(`✅ 任務獎勵已領取：${task.name}`, reward)
  };
}

function taskListText(rows, title) {
  if (!rows.length) return `${title}\n目前沒有任務。`;

  return `${title}\n\n` + rows.map(({ task, record }) => {
    const status = record.claimed ? "✅ 已領" : record.completed ? "🎁 可領" : "進行中";
    return `【${status}】${task.name}\n${task.description}\n進度：${Math.min(record.progress, task.targetValue)}/${task.targetValue}\n獎勵：EXP ${task.rewardExp}｜🍌 ${task.rewardBanana}｜🎟️ ${task.rewardTicket}\n領取：領取任務 ${task.name}`;
  }).join("\n\n");
}

module.exports = {
  seedTasks,
  addTaskProgress,
  listUserTasks,
  claimTask,
  taskListText
};
