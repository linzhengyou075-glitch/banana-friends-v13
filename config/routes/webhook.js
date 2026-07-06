const express = require("express");
const line = require("@line/bot-sdk");
const router = express.Router();

const config = require("../config/line");

router.post(
  "/",
  line.middleware(config),
  async (req, res) => {
    try {
      console.log(req.body.events);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
