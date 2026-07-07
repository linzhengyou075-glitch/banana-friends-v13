const reply = require('./reply');
const { getUser } = require('./member');
const { reward } = require('./chatReward');
const { saveLog } = require('./chatLog');
const { sign } = require('./sign');
const { profileCard, adminPanel, rankMenu } = require('./flex');
const { helpText, adminHelp } = require('./help');
const { getSetting, setSetting } = require('./settings');
const { isAdmin } = require('./admin');
const { addBanana } = require('./economy');
const { addExp } = require('./level');
const { draw } = require('./lottery');
const { listShop, buy } = require('./shop');
const User = require('../models/User');
const rank = require('./rank');

function baseUrl() { return process.env.BASE_URL || 'https://banana-friends-v13.onrender.com'; }
function userName(user) { return user.displayName || '蕉友'; }

async function handleText(event) {
  const text = event.message.text.trim();
  const userId = event.source.userId;
  const user = await getUser(userId);
  const rewardResult = await reward(user, 'text');
  await saveLog(user, 'text', text, rewardResult.exp, rewardResult.banana);
  await user.save();

  if (['指令', '幫助', '教學', 'help'].includes(text)) return reply(event.replyToken, helpText());
  if (['後台', '管理', '控制台'].includes(text)) return reply(event.replyToken, adminPanel(baseUrl()));
  if (text === '後台說明') return reply(event.replyToken, adminHelp());
  if (text === '我的ID') return reply(event.replyToken, `🆔 你的 userId：\n${userId}\n\n要設成管理員，請放到 Render 環境變數 ADMIN_USER_IDS。`);

  if (text === '簽到') {
    const result = await sign(user);
    await user.save();
    return reply(event.replyToken, result.message);
  }
  if (['我的資料', '會員', '等級', '名片'].includes(text)) return reply(event.replyToken, profileCard(user));
  if (text === '我的香蕉幣') return reply(event.replyToken, `🍌 你的香蕉幣：${user.banana || 0}`);
  if (text === '我的抽獎券' || text === '抽獎券') return reply(event.replyToken, `🎟️ 你的抽獎券：${user.ticket || 0}`);

  if (text === '公告') return reply(event.replyToken, `📢 公告\n\n${await getSetting('announcement', '目前沒有公告')}`);
  if (text === '群規') return reply(event.replyToken, await getSetting('rules'));

  if (text.startsWith('設公告 ')) {
    if (!isAdmin(userId)) return reply(event.replyToken, '⛔ 只有管理員可以設定公告');
    const value = text.replace('設公告 ', '').trim();
    await setSetting('announcement', value);
    return reply(event.replyToken, '✅ 公告已更新');
  }
  if (text.startsWith('設群規 ')) {
    if (!isAdmin(userId)) return reply(event.replyToken, '⛔ 只有管理員可以設定群規');
    const value = text.replace('設群規 ', '').trim();
    await setSetting('rules', value);
    return reply(event.replyToken, '✅ 群規已更新');
  }

  if (text === '排行榜' || text === '排名') return reply(event.replyToken, rankMenu());
  if (text === '等級排行') {
    const users = await rank.levelTop(10);
    return reply(event.replyToken, rank.formatTop('🏆 等級排行榜 TOP10', users, u => `${userName(u)}｜Lv.${u.level || 1}｜EXP ${u.exp || 0}`));
  }
  if (text === '香蕉幣排行') {
    const users = await rank.bananaTop(10);
    return reply(event.replyToken, rank.formatTop('🍌 香蕉幣排行榜 TOP10', users, u => `${userName(u)}｜${u.banana || 0} 香蕉幣`));
  }
  if (text === '簽到排行') {
    const users = await rank.signTop(10);
    return reply(event.replyToken, rank.formatTop('📅 簽到排行榜 TOP10', users, u => `${userName(u)}｜${u.signDays || 0} 天`));
  }
  if (text === '本日聊天排行') {
    const users = await rank.todayChatTop(10);
    return reply(event.replyToken, rank.formatTop('💬 本日聊天排行榜 TOP10', users, u => `${userName(u)}｜${u.todayMessages || 0} 則`));
  }
  if (text === '昨日聊天排行') {
    const users = await rank.yesterdayChatTop(10);
    return reply(event.replyToken, rank.formatTop('📆 昨日聊天排行榜 TOP10', users, u => `${userName(u)}｜${u.yesterdayMessages || 0} 則`));
  }
  if (text === '貼圖排行') {
    const users = await rank.stickerTop(10);
    return reply(event.replyToken, rank.formatTop('😀 貼圖排行榜 TOP10', users, u => `${userName(u)}｜${u.stickerCount || 0} 張`));
  }
  if (text === '圖片排行') {
    const users = await rank.imageTop(10);
    return reply(event.replyToken, rank.formatTop('🖼️ 圖片排行榜 TOP10', users, u => `${userName(u)}｜${u.imageCount || 0} 張`));
  }

  if (text === '商店') return reply(event.replyToken, await listShop());
  if (text.startsWith('購買 ')) return reply(event.replyToken, await buy(user, text.replace('購買 ', '').trim()));
  if (text === '兌換抽獎券' || text === '買抽獎券') {
    const price = Number(await getSetting('ticketPrice', 100));
    if ((user.banana || 0) < price) return reply(event.replyToken, `🍌 香蕉幣不足，需要 ${price}`);
    user.banana -= price;
    user.ticket = (user.ticket || 0) + 1;
    await user.save();
    return reply(event.replyToken, `🎟️ 兌換成功！花費 ${price} 香蕉幣，獲得抽獎券 +1`);
  }
  if (text === '抽獎') {
    const result = await draw(user, 1);
    return reply(event.replyToken, result.message);
  }
  if (text === '十連抽') {
    const result = await draw(user, 10);
    return reply(event.replyToken, result.message);
  }

  if (text.startsWith('發幣 ')) {
    if (!isAdmin(userId)) return reply(event.replyToken, '⛔ 只有管理員可以發幣');
    const [, target, amount] = text.split(/\s+/);
    const targetUser = await User.findOne({ userId: target });
    if (!targetUser) return reply(event.replyToken, '找不到該使用者');
    addBanana(targetUser, Number(amount)); await targetUser.save();
    return reply(event.replyToken, `✅ 已發放 ${amount} 香蕉幣給 ${targetUser.displayName}`);
  }
  if (text.startsWith('發券 ')) {
    if (!isAdmin(userId)) return reply(event.replyToken, '⛔ 只有管理員可以發券');
    const [, target, amount] = text.split(/\s+/);
    const targetUser = await User.findOne({ userId: target });
    if (!targetUser) return reply(event.replyToken, '找不到該使用者');
    targetUser.ticket = (targetUser.ticket || 0) + Number(amount); await targetUser.save();
    return reply(event.replyToken, `✅ 已發放 ${amount} 張抽獎券給 ${targetUser.displayName}`);
  }
  if (text.startsWith('發經驗 ')) {
    if (!isAdmin(userId)) return reply(event.replyToken, '⛔ 只有管理員可以發經驗');
    const [, target, amount] = text.split(/\s+/);
    const targetUser = await User.findOne({ userId: target });
    if (!targetUser) return reply(event.replyToken, '找不到該使用者');
    addExp(targetUser, Number(amount)); await targetUser.save();
    return reply(event.replyToken, `✅ 已發放 ${amount} EXP 給 ${targetUser.displayName}`);
  }
}

async function handle(event) {
  if (event.type === 'message' && event.message.type === 'text') return handleText(event);
  if (event.type === 'message' && ['sticker', 'image'].includes(event.message.type)) {
    const user = await getUser(event.source.userId);
    const type = event.message.type;
    await reward(user, type);
    await saveLog(user, type, '', 0, 0);
    await user.save();
    return;
  }
  if (event.type === 'follow') return reply(event.replyToken, '🍌 歡迎加入〔蕉〕個朋友吧！輸入「幫助」查看指令。');
  if (event.type === 'join') return reply(event.replyToken, '🍌 大家好，我是〔蕉〕個朋友吧！Bot，輸入「幫助」查看功能。');
  if (event.type === 'memberJoined') return reply(event.replyToken, '👋 歡迎新朋友加入！請先看「群規」，也可以輸入「簽到」領香蕉幣。');
}
module.exports = handle;
