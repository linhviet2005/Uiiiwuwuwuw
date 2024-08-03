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

    const url = `https://tntxtrickapiv2.onlitegix.com/convert?text=${encodeURIComponent(text)}`;

    try {
      const response = await axios.get(url);
      
      if (Array.isArray(response.data)) {
        const texts = response.data.map(item => item.text).join("\n");
        const body = `Converted Texts:\n${texts}`;
        api.sendMessage(body, message.threadID);
      } else {
        api.sendMessage('Unexpected response format.', message.threadID);
      }
    } catch (error) {
      console.error('API Error:', error); 
      api.sendMessage('Failed to retrieve text information. Please check the console for more details.', message.threadID);
    }
  },
};
