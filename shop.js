const Shop = require("../models/Shop");
const { spendBanana } = require("./economy");

async function ensureDefaultShop() {
  const count = await Shop.countDocuments();
  if (count > 0) return;

  await Shop.create([
    { name: "抽獎券", price: 100, type: "ticket", description: "可用於抽獎" },
    { name: "彩虹蕉友稱號", price: 300, type: "title", description: "獲得稱號：彩虹蕉友" },
    { name: "香蕉背景", price: 500, type: "item", description: "名片背景道具" }
  ]);
}

async function listShop() {
  await ensureDefaultShop();
  return await Shop.find({ enabled: true }).sort({ price: 1 });
}

async function buyItem(user, itemName) {
  await ensureDefaultShop();
  const item = await Shop.findOne({ name: itemName, enabled: true });
  if (!item) return { ok: false, message: "找不到這個商品。" };

  if (!spendBanana(user, item.price)) {
    return { ok: false, message: "🍌 香蕉幣不足。" };
  }

  if (item.type === "ticket") user.ticket += 1;
  else if (item.type === "title") user.title = item.name.replace("稱號", "");
  else user.items.push(item.name);

  await user.save();
  return { ok: true, message: `✅ 成功購買：${item.name}\n🍌 剩餘香蕉幣：${user.banana}` };
}

module.exports = { listShop, buyItem };
