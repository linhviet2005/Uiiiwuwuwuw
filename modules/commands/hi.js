const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  name: 'hi',
  author: 'tnt',
  category: 'Box',
  version: '1.0',
  nopre: false,
  admin: true,
  wait: 3,
  desc: 'hi',
  async onCall({ api, event, Users }) {
    const KEY = [
      "hello", "hi", "hai", "chào", "chao", "hí", "híí", "hì", "hìì", "lô", "hii", 
      "helo", "hê nhô"
    ];
    let thread = global.data.threadData.get(event.threadID) || {};
    
    if (typeof thread['hi'] === 'undefined' || thread['hi'] === false) return;
    
    if (event.body && KEY.includes(event.body.toLowerCase())) {
      const stickerData = [
        "526214684778630", "526220108111421", "526220308111401", "526220484778050", 
        "526220691444696", "526220814778017", "526220978111334", "526221104777988", 
        "526221318111300", "526221564777942", "526221711444594", "526221971444568", 
        "2041011389459668", "2041011569459650", "2041011726126301", "2041011836126290", 
        "2041011952792945", "2041012109459596", "2041012262792914", "2041012406126233", 
        "2041012539459553", "2041012692792871", "2041014432792697", "2041014739459333", 
        "2041015016125972", "2041015182792622", "2041015329459274", "2041015422792598", 
        "2041015576125916", "2041017422792398", "2041020049458802", "2041020599458747", 
        "2041021119458695", "2041021609458646", "2041022029458604", "2041022286125245"
      ];
      
      const sticker = stickerData[Math.floor(Math.random() * stickerData.length)];
      const hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
      const greetings = ["tốt lành", "vui vẻ"];
      const text = greetings[Math.floor(Math.random() * greetings.length)];
      
      const session = (
        hours > 0001 && hours <= 400 ? "sáng tinh mơ" : 
        hours > 401 && hours <= 700 ? "sáng sớm" :
        hours > 701 && hours <= 1000 ? "sáng" :
        hours > 1001 && hours <= 1200 ? "trưa" : 
        hours > 1201 && hours <= 1700 ? "chiều" : 
        hours > 1701 && hours <= 1800 ? "chiều tà" : 
        hours > 1801 && hours <= 2100 ? "tối" : 
        hours > 2101 && hours <= 2400 ? "tối muộn" : 
        "lỗi"
      );
      
      const name = await Users.getNameUser(event.senderID);
      const mentions = [{
        tag: name,
        id: event.senderID
      }];
      
      const msg = {
        body: `💬 Xin chào ${name}\n💓 chúc bạn một buổi ${session} ${text}\n🩷 Love ${name}\n⏰ Bây giờ là : ${moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY")}`, 
        mentions
      };
      
      api.sendMessage(msg, event.threadID, (e, info) => {
        setTimeout(() => {
          api.sendMessage({ sticker: sticker }, event.threadID);
        }, 100);
      }, event.messageID);
    }
  },
  async run({ api, event, Threads, getText }) {
    const { threadID, messageID } = event;
    const data = (await Threads.getData(threadID)).data;
    
    if (typeof data['hi'] === 'undefined' || data['hi'] === true) {
      data['hi'] = false;
    } else {
      data['hi'] = true;
    }
    
    await Threads.setData(threadID, { data });
    global.data.threadData.set(threadID, data);
    
    return api.sendMessage(
      `${data['hi'] === false ? getText('off') : getText('on')} ${getText('successText')}`, 
      threadID, 
      messageID
    );
  },
  languages: {
    "vi": {
      "on": "Bật",
      "off": "Tắt",
      "successText": "thành công"
    },
    "en": {
      "on": "on",
      "off": "off",
      "successText": "success!"
    }
  }
};
