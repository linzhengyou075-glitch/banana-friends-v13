const titles = [
  '新手','香蕉芽','小蕉友','蕉蕉學徒','活力蕉','聊天蕉','銀蕉友','金蕉友','白金蕉友','鑽石蕉友',
  '彩虹蕉友','蕉圈明星','群組守護者','香蕉騎士','蕉香使者','快樂蕉王','閃耀蕉王','榮耀蕉皇','永恆蕉皇','傳說蕉神'
];
function needExp(level) { return Math.max(100, level * 100); }
function titleForLevel(level) { return titles[Math.min(titles.length - 1, Math.floor((level - 1) / 5))] || '新手'; }
function addExp(user, amount) {
  user.exp = (user.exp || 0) + Number(amount || 0);
  while (user.exp >= needExp(user.level || 1)) {
    user.exp -= needExp(user.level || 1);
    user.level = (user.level || 1) + 1;
  }
  user.title = titleForLevel(user.level || 1);
  return user;
}
module.exports = { needExp, addExp, titleForLevel };
