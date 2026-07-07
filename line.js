module.exports = {
  channelSecret: process.env.CHANNEL_SECRET || process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || process.env.LINE_CHANNEL_ACCESS_TOKEN
};
