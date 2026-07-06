const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/webhook", require("./routes/webhook"));

app.get("/", (req, res) => {
  res.send("🍌 Banana Friends Ultimate V13");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running：" + PORT);
});
