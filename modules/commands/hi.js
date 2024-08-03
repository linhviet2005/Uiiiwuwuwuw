const axios = require('axios');
const moment = require('moment-timezone');

module.exports = {
  name: 'hi',
  author: 'tnt',
  category: 'Tiện ích',
  version: '1.0',
  nopre: false,
  admin: true,
  wait: 3,
  desc: 'Bot tự động hi',

  async onCall({ api, message, args }) {
    const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
    const hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
    
    const data2 = [
      "tốt lành",
      "vui vẻ"
    ];
    const text = data2[Math.floor(Math.random() * data2.length)];

    const session = (
      hours > 0 && hours <= 400 ? "sáng tinh mơ" : 
      hours > 400 && hours <= 700 ? "sáng sớm" :
      hours > 700 && hours <= 1000 ? "sáng" :
      hours > 1000 && hours <= 1200 ? "trưa" : 
      hours > 1200 && hours <= 1700 ? "chiều" : 
      hours > 1700 && hours <= 1800 ? "chiều tà" : 
      hours > 1800 && hours <= 2100 ? "tối" : 
      hours > 2100 && hours <= 2400 ? "tối muộn" : 
      "lỗi"
    );

    const name = await Users.getNameUser(message.senderID);
    const mentions = [{
      tag: name,
      id: message.senderID
    }];

    const msg = {
      body: `🎀 [ 𝗔𝗨𝗧𝗢𝗠𝗔𝗧𝗜𝗖 ] 🎀\n━━━━━━━━━━━━━━\n🌸 𝗛𝗲𝗹𝗹𝗼 ${name} 𝗰𝘂𝘁𝗲 𝗽𝗵𝗼̂ 𝗺𝗮𝗶 𝗾𝘂𝗲\n🌱 𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝗰𝗼́ 𝗺𝗼̣̂𝘁 𝗻𝗴𝗮̀𝘆 𝘃𝘂𝗶 𝘃𝗲̉, 𝘁𝗼̂́𝘁 𝗹𝗮̀𝗻𝗵 𝗻𝗵𝗲́ ${name} 🌤️\n→ 𝗯𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: ${timeNow}`, 
      mentions
    };

    api.sendMessage(msg, message.threadID, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        // Uncomment and define `sticker` if you want to send a sticker
        // setTimeout(() => {
        //   api.sendMessage({ sticker: sticker }, message.threadID);
        // }, 100);
      }
    }, message.messageID);
  }
};
