function profileCard(user) {
  return {
    type: "flex",
    altText: "我的資料",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          { type: "text", text: "🍌 我的資料", weight: "bold", size: "xl", color: "#d18a00" },
          { type: "text", text: `👤 ${user.displayName || "蕉友"}`, margin: "md", size: "lg", weight: "bold" },
          { type: "text", text: `🏅 Lv.${user.level}｜${user.title || "新手"}`, margin: "md" },
          { type: "text", text: `⭐ EXP：${user.exp}｜今日 +${user.todayExp || 0}`, margin: "sm" },
          { type: "text", text: `🍌 香蕉幣：${user.banana}｜今日 +${user.todayBanana || 0}`, margin: "sm" },
          { type: "text", text: `🎟️ 抽獎券：${user.ticket || 0}`, margin: "sm" },
          { type: "text", text: `📅 簽到：${user.signDays || 0} 天`, margin: "sm" },
          { type: "text", text: `💬 今日聊天：${user.todayChat || 0}｜昨日：${user.yesterdayChat || 0}`, margin: "sm" },
          { type: "text", text: `😀 貼圖：${user.stickerCount || 0}｜🖼️ 圖片：${user.imageCount || 0}`, margin: "sm" },
          { type: "text", text: `🎖️ 徽章：${user.badge || "初心之蕉"}`, margin: "sm" }
        ]
      }
    }
  };
}

module.exports = { profileCard };
