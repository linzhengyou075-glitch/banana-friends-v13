function helpText() {
  return `🍌〔蕉〕個朋友吧！\n\n📖 指令教學\n\n👤 我的資料 / 會員\n📅 簽到\n🏆 排行榜\n🛒 商店\n🎟️ 兌換抽獎券\n🎰 抽獎 / 十連抽\n🎟️ 我的抽獎券\n🍌 我的香蕉幣\n📢 公告\n📜 群規\n🛠️ 後台\n🆔 我的ID`;
}
function adminHelp() {
  return `🛠️ 管理指令\n\n設公告 內容\n設群規 內容\n發幣 USER_ID 數量\n發券 USER_ID 數量\n發經驗 USER_ID 數量\n\n網頁後台：/admin`;
}
module.exports = { helpText, adminHelp };
