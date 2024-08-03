const axios = require('axios');
const moment = require('moment-timezone');
const { createReadStream, unlinkSync } = require('fs-extra');
const { resolve } = require('path');

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
    try {
      const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
      if (args.length === 0) {
        return api.sendMessage(`=== 𝗩𝗢𝗜𝗖𝗘𝗦 ===\n━━━━━━━━━━━━━━━━━━\n→ 𝗖𝗮́𝗰𝗵 𝗦𝘂̛̉ 𝗗𝘂̣𝗻𝗴\n→ !𝘀𝗮𝘆: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝘁𝗶𝗲̂́𝗻𝗴 𝗩𝗶𝗲̣̂𝘁 𝗡𝗮𝗺 🇻🇳\n→ !𝘀𝗮𝘆 𝗿𝘂: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗴𝗶𝗼̣𝗻𝗴 𝗻𝗼́𝗶 𝗰𝗵𝗶̣ 𝗚𝗼𝗼𝗴𝗹𝗲 𝗡𝘂̛𝗼̛́𝗰 𝗡𝗴𝗮 🇷🇺\n→ !𝘀𝗮𝘆 𝗷𝗮: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗴𝗶𝗼̣𝗻𝗴 𝗻𝗼́𝗶 𝗰𝗵𝗶̣ 𝗚𝗼𝗼𝗴𝗹𝗲 𝗡𝘂̛𝗼̛́𝗰 𝗡𝗵𝗮̣̂𝘁 𝗕𝗮̉𝗻 🇯🇵\n→ !𝘀𝗮𝘆 𝗸𝗼: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗡𝘂̛𝗼̛́𝗰 𝗛𝗮̀𝗻 𝗤𝘂𝗼̂́𝗰 🇰🇷\n=====「${timeNow} 」=====`, message.threadID, message.messageID);
      }

      const content = (message.type === "message_reply") ? message.messageReply.body : args.join(" ");
      const languageToSay = (["ru","en","ko","ja"].some(item => content.indexOf(item) === 0)) ? content.slice(0, content.indexOf(" ")) : global.config.language;
      const msg = (languageToSay !== global.config.language) ? content.slice(3) : content;
      const path = resolve(__dirname, 'cache', `${message.threadID}_${message.senderID}.mp3`);

      // Ensure 'downloadFile' function is defined elsewhere in your code
      await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, path);

      api.sendMessage({ attachment: createReadStream(path) }, message.threadID, (error) => {
        if (error) {
          console.error('Error sending message:', error);
        }
        // Clean up the file after sending the message
        unlinkSync(path);
      }, message.messageID);

    } catch (error) {
      console.error('Failed to convert text to speech:', error);
      api.sendMessage('Failed to convert text to speech. Please check the console for more details.', message.threadID);
    }
  }
};
