function addBanana(user, amount) {
  user.banana = Math.max(0, (user.banana || 0) + Number(amount || 0));
  return user.banana;
}
function spendBanana(user, amount) {
  amount = Number(amount || 0);
  if ((user.banana || 0) < amount) return false;
  user.banana -= amount;
  return true;
}
module.exports = { addBanana, spendBanana };
