const { profileCard } = require("./flexProfile");

function adminCard(baseUrl) {
  return {
    type: "flex",
    altText: "🛠️ 後台快捷鍵",
    contents: {
      type: "bubble",
      size: "mega",
      header: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#845EC2",
        paddingAll: "18px",
        contents: [
          { type: "text", text: "🛠️ Banana Friends 後台", weight: "bold", size: "xl", color: "#FFFFFF" },
          { type: "text", text: "管理公告、會員、商店、抽獎與設定", size: "xs", color: "#F4EFFF", margin: "sm" }
        ]
      },
      body: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#F7F1FF",
        contents: [
          { type: "text", text: "請點下方按鈕開啟管理中心。", wrap: true, color: "#3A2A00" },
          {
            type: "button",
            style: "primary",
            color: "#845EC2",
            margin: "lg",
            action: { type: "uri", label: "🌐 開啟後台", uri: `${baseUrl}/admin` }
          }
        ]
      }
    }
  };
}

module.exports = { profileCard, adminCard };
