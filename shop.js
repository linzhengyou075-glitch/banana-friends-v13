const ShopItem = require('../models/ShopItem');
const { spendBanana } = require('./economy');
const { addExp } = require('./level');

async function ensureDefaults() {
  const count = await ShopItem.countDocuments();
  if (count > 0) return;
  await ShopItem.insertMany([
    { name: '抽獎券 1 張', type: 'ticket', value: '1', price: 100 },
    { name: 'EXP 100', type: 'exp', value: '100', price: 150 },
    { name: '稱號：香蕉富翁', type: 'title', value: '香蕉富翁', price: 500 }
  ]);
}
async function listShop() {
  await ensureDefaults();
  const items = await ShopItem.find({ enabled: true }).sort({ price: 1 });
  let msg = '🛒 香蕉商店\n\n';
  items.forEach((it, i) => { msg += `${i + 1}. ${it.name}｜${it.price} 香蕉幣\n`; });
  msg += '\n輸入：購買 1';
  return msg;
}
async function buy(user, index) {
  await ensureDefaults();
  const items = await ShopItem.find({ enabled: true }).sort({ price: 1 });
  const item = items[Number(index) - 1];
  if (!item) return '找不到商品，請輸入：商店';
  if (!spendBanana(user, item.price)) return '🍌 香蕉幣不足';
  if (item.type === 'ticket') user.ticket = (user.ticket || 0) + Number(item.value || 1);
  if (item.type === 'exp') addExp(user, Number(item.value || 0));
  if (item.type === 'title') user.title = item.value;
  user.items = user.items || [];
  user.items.push(item.name);
  await user.save();
  return `🎁 成功購買：${item.name}`;
}
module.exports = { listShop, buy, ensureDefaults };
