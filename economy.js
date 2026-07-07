function addBanana(user, amount) {
  user.banana += amount;
  if (user.banana < 0) user.banana = 0;
  return user.banana;
}

function spendBanana(user, amount) {
  if (user.banana < amount) return false;
  user.banana -= amount;
  return true;
}

module.exports = { addBanana, spendBanana };
