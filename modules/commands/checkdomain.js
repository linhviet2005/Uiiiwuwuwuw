const axios = require('axios');

module.exports = {
  name: 'checkdomain',
  author: 'tnt',
  category: 'domain',
  version: '1.0',
  nopre: false,
  admin: true,
  wait: 3,
  desc: 'Check domain details',

  async onCall({ api, message, args }) {
    const link = args[0]; // Assume the URL to check is provided as the first argument

    try {
      const { data } = await axios.get(`https://apitntxtrick.onlitegix.com/checkdomain?url=${encodeURIComponent(link)}`);
      
      // Destructure relevant information from the data object
      const {
        domainName,
        creationDate,
        expirationDate,
        registrar,
        DNSSEC,
        nameServer = [],
        status = []
      } = data;

      const formattedNameServers = nameServer.map(ns => `- ${ns}`).join("\n");
      const formattedStatus = status.map(st => `- ${st}`).join("\n");

      const body = `===[ WHOIS DOMAIN ]===\n🌐 Tên miền: ${domainName}\n✅ Ngày đăng kí: ${creationDate}\n❎ Ngày hết hạn: ${expirationDate}\n👤 Quản lý tại nhà đăng kí: ${registrar}\n📁 DNSSEC: ${DNSSEC}\n🔗 Name servers:\n${formattedNameServers}\n📈 Cờ trạng thái:\n${formattedStatus}`;

      api.sendMessage(body, message.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('Failed to retrieve domain information.', message.threadID);
    }
  },
};
