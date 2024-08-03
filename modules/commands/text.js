const axios = require('axios');

module.exports = {
  name: 'text',
  author: 'tnt',
  category: 'Tiện ích',
  version: '1.0',
  nopre: false,
  admin: true,
  wait: 3,
  desc: 'Convert Text',

  async onCall({ api, message, args }) {
    const text = args[0]; 

    const url = `https://apitntxtrickv2.onlitegix.com/convert?text=${encodeURIComponent(text)}`;

    try {
      const { data } = await axios.get(url);
      
      const texts = data.map(item => item.text).join("\n");

      const body = `\n${texts}`;

      api.sendMessage(body, message.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('Failed to retrieve text information.', message.threadID);
    }
  },
};
