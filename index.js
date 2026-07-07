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
  res.send("🍌 Banana Friends Ultimate V17");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running：" + PORT);
});
