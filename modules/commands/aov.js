const axios = require('axios');

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
    const url = 'https://apitntxtrick.onlitegix.com/accaov?apikey=acclq';

    try {
      const { data } = await axios.get(url);

      // Directly accessing account from the data object
      const account = data.account;

      const body = `Account Information: ${account}`;

      // Send the message back to the user
      api.sendMessage(body, message.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('Failed to retrieve account information.', message.threadID);
    }
  },
};
