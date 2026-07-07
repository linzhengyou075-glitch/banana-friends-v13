function adminPanel(baseUrl) {
  const adminUrl = `${baseUrl || ""}/admin`;

  return {
    type: "flex",
    altText: "香蕉朋友管理後台",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          { type: "text", text: "🍌 Banana Friends 後台", weight: "bold", size: "xl", color: "#d18a00" },
          { type: "text", text: "管理快捷鍵", size: "sm", color: "#666666" },
          { type: "separator", margin: "md" },
          { type: "text", text: "📢 公告｜👥 會員｜🍌 香蕉幣｜🎫 抽獎券｜🏆 排行榜", wrap: true, size: "sm" }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          { type: "button", style: "primary", color: "#f5a623", action: { type: "uri", label: "🌐 開啟網頁後台", uri: adminUrl } },
          { type: "button", action: { type: "message", label: "📢 查看公告", text: "公告" } },
          { type: "button", action: { type: "message", label: "🏆 查看排行榜", text: "排行榜" } }
        ]
      }
    }
  };
}

module.exports = { adminPanel };
