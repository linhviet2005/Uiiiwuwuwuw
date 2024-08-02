const axios = require('axios');

const cheerio = require('cheerio');

const fs = require('fs');



module.exports = {

  name: 'aov',

  author: 'tnt',

  category: 'Account',

  version: '1.0',

  nopre: false,

  admin: true,

  wait: 3,

  desc: 'acc aov',

  async onCall({ api, message }) {

    const url = 'https://apitntxtrick.onlitegix.com/10tracclq?apikey=acclq';

    try {

      const { data } = await axios.get(url);

      const $ = cheerio.load(data);



const { account } = response.data;

    const body = `${account}`;
       

        });

      });

    } catch (error) {

      console.error(error);

    }

  },

};
