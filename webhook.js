const express = require('express');
const line = require('@line/bot-sdk');
const router = express.Router();
const config = require('../config/line');
const handleEvent = require('../services/message');

router.post('/', line.middleware(config), async (req, res) => {
  try {
    await Promise.all((req.body.events || []).map(handleEvent));
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(200).end();
  }
});
router.get('/', (req, res) => res.send('LINE Webhook Ready'));
module.exports = router;
