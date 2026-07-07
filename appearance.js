const AvatarFrame = require("../models/AvatarFrame");
const Background = require("../models/Background");

async function listFrames(user) {
  return await AvatarFrame.find({ frameId: { $in: user.frames || [] }, enabled: true });
}

async function listBackgrounds(user) {
  return await Background.find({ backgroundId: { $in: user.backgrounds || [] }, enabled: true });
}

async function equipFrame(user, frameNameOrId) {
  const frame = await AvatarFrame.findOne({
    enabled: true,
    $or: [{ frameId: frameNameOrId }, { name: frameNameOrId }]
  });

  if (!frame) return { ok: false, message: "找不到這個頭像框。" };
  if (!user.frames.includes(frame.frameId)) return { ok: false, message: "你尚未擁有這個頭像框。" };

  user.frame = frame.frameId;
  await user.save();

  return { ok: true, message: `🖼️ 已裝備頭像框：${frame.name}` };
}

async function equipBackground(user, bgNameOrId) {
  const bg = await Background.findOne({
    enabled: true,
    $or: [{ backgroundId: bgNameOrId }, { name: bgNameOrId }]
  });

  if (!bg) return { ok: false, message: "找不到這個背景。" };
  if (!user.backgrounds.includes(bg.backgroundId)) return { ok: false, message: "你尚未擁有這個背景。" };

  user.background = bg.backgroundId;
  await user.save();

  return { ok: true, message: `🌈 已裝備背景：${bg.name}` };
}

module.exports = { listFrames, listBackgrounds, equipFrame, equipBackground };
