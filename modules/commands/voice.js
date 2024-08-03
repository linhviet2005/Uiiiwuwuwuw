const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');

module.exports = {
  name: 'voice',
  author: 'tnt',
  category: 'Tiện ích',
  version: '1.0',
  nopre: false,
  admin: true,
  wait: 3,
  desc: 'voice gg',

  async onCall({ api, message, args }) {
    const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    
    try {
      if (args.length === 0) {
        return api.sendMessage(`=== 𝗩𝗢𝗜𝗖𝗘𝗦 ===\n━━━━━━━━━━━━━━━━━━\n→ 𝗖𝗮́𝗰𝗵 𝗦𝘂̛̉ 𝗗𝘂̣𝗻𝗴\n→ !𝘀𝗮𝘆: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝘁𝗶𝗲̂́𝗻𝗴 𝗩𝗶𝗲̣̂𝘁 𝗡𝗮𝗺 🇻🇳\n→ !𝘀𝗮𝘆 𝗿𝘂: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗴𝗶𝗼̣𝗻𝗴 𝗻𝗼́𝗶 𝗰𝗵𝗶̣ 𝗚𝗼𝗼𝗴𝗹𝗲 𝗡𝘂̛𝗼̛́𝗰 𝗡𝗴𝗮 🇷🇺\n→ !𝘀𝗮𝘆 𝗷𝗮: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗴𝗶𝗼̣𝗻𝗴 𝗻𝗼́𝗶 𝗰𝗵𝗶̣ 𝗚𝗼𝗼𝗴𝗹𝗲 𝗡𝘂̛𝗼̛́𝗰 𝗡𝗵𝗮̣̂𝘁 𝗕𝗮̉𝗻 🇯🇵\n→ !𝘀𝗮𝘆 𝗸𝗼: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗡𝘂̛𝗼̛́𝗰 𝗛𝗮̀𝗻 𝗤𝘂𝗼̂́𝗰 🇰🇷\n=====「${timeNow} 」=====`, message.threadID, message.messageID);
      }

      const content = (message.type === 'message_reply') ? message.messageReply.body : args.join(' ');
      const languageToSay = ["ru", "en", "ko", "ja"].find(item => content.startsWith(item)) || 'vi';
      const msg = content.replace(/^(\w{2})\s*/, '');
      const filePath = path.resolve(__dirname, 'cache', `${message.threadID}_${message.senderID}.mp3`);

      await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, filePath);
      api.sendMessage({ attachment: fs.createReadStream(filePath) }, message.threadID, () => fs.unlinkSync(filePath));
    } catch (error) {
      console.error(error);
      api.sendMessage('Failed to convert text to speech. Please check the console for more details.', message.threadID);
    }
  },
};
