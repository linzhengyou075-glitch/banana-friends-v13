const { progress } = require("./level");

function baseUrl() {
  return process.env.BASE_URL || "https://banana-friends-v13.onrender.com";
}

function progressBar(percent) {
  const p = Math.round(percent / 10);
  return "█".repeat(p) + "░".repeat(10 - p);
}

function row(label, value) {
  return {
    type: "box",
    layout: "horizontal",
    margin: "sm",
    contents: [
      { type: "text", text: label, size: "sm", color: "#8A5A00", flex: 4 },
      { type: "text", text: String(value), size: "sm", color: "#333333", weight: "bold", align: "end", flex: 5 }
    ]
  };
}

function profileCard(user) {
  const p = progress(user);
  const url = baseUrl();
  const avatar = user.pictureUrl || `${url}/backgrounds/banana.png`;
  const badge = `${url}/badges/${user.badge || "lv001"}.png`;
  const titleImg = `${url}/titles/${user.titleId || "title_001"}.png`;
  const frame = `${url}/frames/${user.frame || "default"}.png`;
  const bg = `${url}/backgrounds/${user.background || "banana"}.png`;

  return {
    type: "flex",
    altText: "🍌 Banana Friends 名片",
    contents: {
      type: "bubble",
      size: "mega",
      hero: {
        type: "image",
        url: bg,
        size: "full",
        aspectRatio: "20:10",
        aspectMode: "cover"
      },
      body: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#FFF8DC",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "vertical",
                flex: 2,
                contents: [
                  {
                    type: "image",
                    url: avatar,
                    size: "full",
                    aspectRatio: "1:1",
                    aspectMode: "cover"
                  },
                  {
                    type: "image",
                    url: frame,
                    size: "full",
                    aspectRatio: "1:1",
                    aspectMode: "fit",
                    margin: "none"
                  }
                ]
              },
              {
                type: "box",
                layout: "vertical",
                flex: 4,
                contents: [
                  { type: "text", text: user.displayName || "蕉友", weight: "bold", size: "xl", color: "#3A2A00", wrap: true },
                  { type: "text", text: `🎖️ ${user.title || "新手蕉友"}`, color: "#8A5A00", size: "sm", margin: "sm", wrap: true },
                  { type: "text", text: `🏅 Lv.${user.level}`, color: "#D18A00", weight: "bold", size: "lg", margin: "sm" },
                  {
                    type: "box",
                    layout: "horizontal",
                    margin: "sm",
                    contents: [
                      { type: "image", url: badge, size: "xxs", aspectMode: "fit" },
                      { type: "text", text: user.badge || "lv001", size: "xs", color: "#555555", margin: "sm" }
                    ]
                  }
                ]
              }
            ]
          },
          { type: "separator", margin: "lg" },
          { type: "image", url: titleImg, size: "full", aspectRatio: "20:5", aspectMode: "fit", margin: "md" },
          { type: "text", text: `⭐ EXP ${p.current}/${p.need}`, size: "sm", color: "#3A2A00", margin: "lg" },
          { type: "text", text: progressBar(p.percent), size: "sm", color: "#D18A00", margin: "xs" },
          row("🍌 香蕉幣", user.banana || 0),
          row("🎟️ 抽獎券", user.ticket || 0),
          row("📅 簽到", `${user.signDays || 0} 天`),
          row("🔥 連續簽到", `${user.streak || 0} 天`),
          row("🖼️ 頭像框", user.frame || "default"),
          row("🌈 背景", user.background || "banana")
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#3A2A00",
        contents: [
          {
            type: "button",
            style: "primary",
            color: "#FFD24D",
            action: { type: "message", label: "查看選單", text: "選單" }
          }
        ]
      }
    }
  };
}

module.exports = { profileCard };
