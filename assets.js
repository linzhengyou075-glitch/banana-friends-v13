const AvatarFrame = require("../models/AvatarFrame");
const Background = require("../models/Background");

async function seedAppearanceAssets() {
  const baseUrl = process.env.BASE_URL || "https://banana-friends-v13.onrender.com";

  const frames = [
    ["default", "初心頭像框", "普通", 0],
    ["banana", "香蕉金框", "普通", 100],
    ["rainbow", "彩虹發光框", "史詩", 500],
    ["gold", "黃金王者框", "稀有", 300],
    ["diamond", "鑽石星光框", "傳說", 800],
    ["vip", "VIP 紫晶框", "傳說", 0],
    ["admin", "管理員皇冠框", "神話", 0]
  ];

  for (const [frameId, name, rarity, price] of frames) {
    await AvatarFrame.updateOne(
      { frameId },
      {
        frameId, name, rarity, price,
        image: `${baseUrl}/frames/${frameId}.png`,
        enabled: true
      },
      { upsert: true }
    );
  }

  const backgrounds = [
    ["banana", "香蕉樂園", "普通", 0],
    ["rainbow", "彩虹夢境", "史詩", 500],
    ["starry", "星空之夜", "稀有", 300],
    ["sakura", "櫻花午後", "稀有", 300],
    ["pokemon", "Pokémon GO 藍黃", "傳說", 800]
  ];

  for (const [backgroundId, name, rarity, price] of backgrounds) {
    await Background.updateOne(
      { backgroundId },
      {
        backgroundId, name, rarity, price,
        image: `${baseUrl}/backgrounds/${backgroundId}.png`,
        enabled: true
      },
      { upsert: true }
    );
  }
}

module.exports = { seedAppearanceAssets };
