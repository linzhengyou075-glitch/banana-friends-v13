const { addExp } = require("./level");
const { addBanana } = require("./economy");

function reward(user) {

  if (user.todayExp >= 300) return;

  addExp(user, 2);

  addBanana(user, 2);

  user.todayExp += 2;
  user.todayBanana += 2;

}

module.exports = {
  reward
};
