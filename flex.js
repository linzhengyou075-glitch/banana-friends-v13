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
          { type: "text", text: `🏅 Lv.${user.level}`, margin: "md" },
          { type: "text", text: `⭐ EXP：${user.exp}`, margin: "sm" },
          { type: "text", text: `🍌 香蕉幣：${user.banana}`, margin: "sm" },
          { type: "text", text: `🎟️ 抽獎券：${user.ticket}`, margin: "sm" },
          { type: "text", text: `📅 簽到：${user.signDays} 天`, margin: "sm" },
          { type: "text", text: `🔥 連續簽到：${user.streak || 0} 天`, margin: "sm" },
          { type: "text", text: `🎖️ 稱號：${user.title || "新手"}`, margin: "sm" }
        ]
      }
    }
  };
}

function adminCard(baseUrl) {
  return {
    type: "flex",
    altText: "後台快捷鍵",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          { type: "text", text: "🍌 Banana Friends 後台", weight: "bold", size: "xl", color: "#d18a00" },
          { type: "text", text: "點下方按鈕開啟管理中心", margin: "md", wrap: true },
          {
            type: "button",
            style: "primary",
            color: "#ffcc33",
            margin: "lg",
            action: { type: "uri", label: "開啟後台", uri: `${baseUrl}/admin` }
          }
        ]
      }
    }
  };
}

module.exports = { profileCard, adminCard };
