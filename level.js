function needExp(level) {
  return level * 100;
}

function titleByLevel(level) {
  if (level >= 40) return "永恆彩虹至尊";
  if (level >= 30) return "彩虹冒險家";
  if (level >= 20) return "黃金香蕉";
  if (level >= 10) return "白銀蕉友";
  return "新手蕉友";
}

function addExp(user, amount) {
  user.exp += amount;

  while (user.exp >= needExp(user.level)) {
    user.exp -= needExp(user.level);
    user.level++;
    user.title = titleByLevel(user.level);
    user.badge = `Lv.${user.level} 徽章`;
  }

  return user;
}

module.exports = { needExp, addExp, titleByLevel };
