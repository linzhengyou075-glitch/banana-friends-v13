const User = require("../models/User");

async function getUser(userId, displayName = "") {

  let user = await User.findOne({ userId });

  if (!user) {

    user = await User.create({
      userId,
      displayName
    });

  }

  return user;

}

module.exports = {
  getUser
};
