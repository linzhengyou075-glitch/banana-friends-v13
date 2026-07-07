const express = require('express');
const connectDB = require('./config/mongodb');
require('dotenv').config();

const app = express();
connectDB();

app.use('/webhook', require('./routes/webhook'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send(`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Banana Friends V14</title><style>body{font-family:system-ui;background:#fff8df;color:#3b2a05;padding:32px}.card{max-width:680px;margin:auto;background:white;border-radius:24px;padding:28px;box-shadow:0 10px 30px #0002}a{color:#b77900}</style></head><body><div class="card"><h1>🍌 Banana Friends Ultimate V14</h1><p>LINE Bot 已上線。</p><p><a href="/admin">開啟管理後台</a></p></div></body></html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server Running:' + PORT));
