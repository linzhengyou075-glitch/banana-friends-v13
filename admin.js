function adminIds() {
  return (process.env.ADMIN_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
}
function isAdmin(userId) {
  const ids = adminIds();
  return ids.length > 0 && ids.includes(userId);
}
module.exports = { isAdmin };
