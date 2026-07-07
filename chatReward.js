const { addExp } = require('./level');
const { addBanana } = require('./economy');
const { allSettings } = require('./settings');

async function reward(user, type = 'text') {
  const settings = await allSettings();
  let exp = 0;
  let banana = 0;
  if (type === 'text') {
    const expLeft = Math.max(0, Number(settings.dailyExpLimit) - (user.todayExp || 0));
    const bananaLeft = Math.max(0, Number(settings.dailyBananaLimit) - (user.todayBanana || 0));
    exp = Math.min(Number(settings.chatExp), expLeft);
    banana = Math.min(Number(settings.chatBanana), bananaLeft);
    if (exp > 0) addExp(user, exp);
    if (banana > 0) addBanana(user, banana);
    user.todayExp = (user.todayExp || 0) + exp;
    user.todayBanana = (user.todayBanana || 0) + banana;
    user.todayMessages = (user.todayMessages || 0) + 1;
  }
  if (type === 'sticker') user.stickerCount = (user.stickerCount || 0) + 1;
  if (type === 'image') user.imageCount = (user.imageCount || 0) + 1;
  return { exp, banana };
}
module.exports = { reward };
