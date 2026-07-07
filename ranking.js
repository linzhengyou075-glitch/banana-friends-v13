async function topUsers(User, field, limit = 10) {
  return await User.find({})
    .sort({ [field]: -1 })
    .limit(limit);
}

module.exports = {
  topUsers
};
