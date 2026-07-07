const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <h1>🍌 Banana Friends 後台</h1>
    <p>V14 管理後台已啟用</p>
    <ul>
      <li>✅ Bot 狀態：正常</li>
      <li>✅ MongoDB：已連線</li>
      <li>✅ Webhook：已啟用</li>
    </ul>
  `);
});

module.exports = router;
