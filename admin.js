const admins = [];

function isAdmin(userId) {
  return admins.includes(userId);
}

function addAdmin(userId) {
  if (!admins.includes(userId)) {
    admins.push(userId);
  }
}

function removeAdmin(userId) {
  const index = admins.indexOf(userId);

  if (index !== -1) {
    admins.splice(index, 1);
  }
}

module.exports = {
  isAdmin,
  addAdmin,
  removeAdmin
};
