const connectDB = require("./config/mongodb");
const express = require("express");
require("dotenv").config();

const app = express();

connectDB();

// LINE webhook must be before express.json(), otherwise signature validation fails.
app.use("/webhook", require("./routes/webhook"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.send(`
    <html><head><meta charset="utf-8"><title>Banana Friends</title></head>
    <body style="font-family:Arial,'Noto Sans TC',sans-serif;padding:24px;">
      <h1>🍌 Banana Friends Ultimate V14</h1>
      <p>✅ Server Running</p>
      <p><a href="/admin">進入後台</a></p>
    </body></html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running:" + PORT);
});
