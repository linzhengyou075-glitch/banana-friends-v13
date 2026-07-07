function textLine(text, size = 'md', weight = 'regular') {
  return { type: 'text', text, size, weight, wrap: true, margin: 'sm' };
}
function profileCard(user) {
  return {
    type: 'flex', altText: '我的資料', contents: {
      type: 'bubble', size: 'mega', body: { type: 'box', layout: 'vertical', spacing: 'sm', contents: [
        { type: 'text', text: '🍌 我的資料', weight: 'bold', size: 'xl', color: '#d18a00' },
        textLine(`👤 ${user.displayName || '蕉友'}`, 'lg', 'bold'),
        textLine(`🏅 Lv.${user.level || 1}`),
        textLine(`⭐ EXP：${user.exp || 0}`),
        textLine(`🍌 香蕉幣：${user.banana || 0}`),
        textLine(`🎟️ 抽獎券：${user.ticket || 0}`),
        textLine(`📅 簽到：${user.signDays || 0} 天`),
        textLine(`🔥 連續：${user.streak || 0} 天`),
        textLine(`🎖️ 稱號：${user.title || '新手'}`)
      ] }
    }
  };
}
function button(label, text) { return { type: 'button', style: 'secondary', height: 'sm', action: { type: 'message', label, text } }; }
function uriButton(label, uri) { return { type: 'button', style: 'primary', height: 'sm', action: { type: 'uri', label, uri } }; }
function adminPanel(baseUrl) {
  return { type: 'flex', altText: '管理後台', contents: { type: 'bubble', size: 'mega', body: { type: 'box', layout: 'vertical', spacing: 'md', contents: [
    { type: 'text', text: '🛠️ 香蕉朋友管理中心', weight: 'bold', size: 'xl', color: '#8a5a00', wrap: true },
    { type: 'text', text: '請選擇快捷功能', size: 'sm', color: '#777777' },
    uriButton('🌐 開啟網頁後台', `${baseUrl}/admin`),
    button('📢 查看公告', '公告'), button('🏆 排行榜', '排行榜'), button('🛒 商店', '商店'), button('🎰 抽獎', '抽獎'), button('⚙️ 設定說明', '後台說明')
  ] } } };
}
function rankMenu() {
  return { type: 'flex', altText: '排行榜', contents: { type: 'bubble', body: { type: 'box', layout: 'vertical', spacing: 'sm', contents: [
    { type: 'text', text: '🏆 排行榜選單', weight: 'bold', size: 'xl' },
    button('等級排行', '等級排行'), button('香蕉幣排行', '香蕉幣排行'), button('簽到排行', '簽到排行'), button('本日聊天排行', '本日聊天排行'), button('昨日聊天排行', '昨日聊天排行'), button('貼圖排行', '貼圖排行'), button('圖片排行', '圖片排行')
  ] } } };
}
module.exports = { profileCard, adminPanel, rankMenu };
