const ChatLog = require("../models/ChatLog");

async function saveLog(user, type, message, exp, banana) {

  await ChatLog.create({

    userId: user.userId,

    displayName: user.displayName,

    messageType: type,

    message,

    exp,

    banana

  });

}

module.exports = {

  saveLog

};
