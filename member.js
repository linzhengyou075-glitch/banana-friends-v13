const line = require("@line/bot-sdk");
const config = require("../config/line");
const User = require("../models/User");

const client = new line.Client(config);

async function fetchLineProfile(event) {
  try {
    if (!event || !event.source || !event.source.userId) return null;

    if (event.source.type === "group" && event.source.groupId) {
      return await client.getGroupMemberProfile(event.source.groupId, event.source.userId);
    }

    if (event.source.type === "room" && event.source.roomId) {
      return await client.getRoomMemberProfile(event.source.roomId, event.source.userId);
    }

    return await client.getProfile(event.source.userId);
  } catch (err) {
    return null;
  }
}

async function getUser(userId, displayName = "", profile = null) {
  let user = await User.findOne({ userId });

  if (!user) {
    user = await User.create({
      userId,
      displayName: displayName || profile?.displayName || "",
      pictureUrl: profile?.pictureUrl || "",
      statusMessage: profile?.statusMessage || ""
    });
  }

  let changed = false;

  if (profile?.displayName && user.displayName !== profile.displayName) {
    user.displayName = profile.displayName;
    changed = true;
  }

  if (profile?.pictureUrl && user.pictureUrl !== profile.pictureUrl) {
    user.pictureUrl = profile.pictureUrl;
    changed = true;
  }

  if (profile?.statusMessage && user.statusMessage !== profile.statusMessage) {
    user.statusMessage = profile.statusMessage;
    changed = true;
  }

  if (!user.title) user.title = "新手蕉友";
  if (!user.titleId) user.titleId = "title_001";
  if (!user.badge) user.badge = "lv001";
  if (!user.frame) user.frame = "default";
  if (!user.background) user.background = "banana";
  if (!user.titles || !user.titles.length) user.titles = ["title_001"];
  if (!user.badges || !user.badges.length) user.badges = ["lv001"];
  if (!user.frames || !user.frames.length) user.frames = ["default"];
  if (!user.backgrounds || !user.backgrounds.length) user.backgrounds = ["banana"];

  if (changed) await user.save();

  return user;
}

module.exports = { getUser, fetchLineProfile };
