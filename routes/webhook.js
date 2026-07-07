const express = require("express");
const line = require("@line/bot-sdk");
const router = express.Router();

const config = require("../config/line");
const handleMessage = require("../services/message");

router.post(
  "/",
  line.middleware(config),
  async (req, res) => {
    try {
      await Promise.all(
        req.body.events.map(async (event) => {
          await handleMessage(event);
        })
      );

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

router.get("/", (req, res) => {
  res.send("LINE Webhook Ready");
});

module.exports = router;
