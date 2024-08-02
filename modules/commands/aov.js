const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: 'aov',
  author: 'tnt',
  category: 'Account',
  version: '1.0',
  nopre: false,
  admin: true,
  wait: 3,
  desc: 'Fetches AOV account data',

  async onCall({ api, message }) {
    const url = 'https://apitntxtrick.onlitegix.com/10tracclq?apikey=acclq';

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      // Assuming 'account' is present in the loaded HTML
      const account = $('selector-for-account').text();  // Replace 'selector-for-account' with the actual selector

      const body = `Account Information: ${account}`;

      // Send the message back to the user
      api.sendMessage(body, message.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('Failed to retrieve account information.', message.threadID);
    }
  },
};
