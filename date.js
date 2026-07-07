function dateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(date);
}
function yesterdayKey() {
  const d = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return dateKey(d);
}
module.exports = { dateKey, yesterdayKey };
