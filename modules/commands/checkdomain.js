const axios = require('axios');

module.exports = {
  name: 'checkdomain',
  author: 'tnt',
  category: 'domain',
  version: '1.0',
  nopre: false,
  admin: true,
  wait: 3,
  desc: 'Checkdomain',

  async onCall({ api, message }) {
        const response = await axios.get(`https://apitntxtrick.onlitegix.com/checkdomain?url=${link}`);
    const { domainName, creationDate, expirationDate, registrar, nameServer, status, DNSSEC, message } = response.data;
    const formattedNameServers = nameServer.map(ns => `- ${ns}`).join("\n");
    const formattedStatus = status.map(st => `- ${st}`).join("\n");

    const body = `===[ WHIOS DOMAIN ]===\n🌐 Tên miền: ${domainName}\n✅ Ngày đăng kí: ${creationDate}\n❎ Ngày hết hạn: ${expirationDate} \n👤 Quản lý tại nhà đăng kí: ${registrar}\n📁DNSSEC: ${DNSSEC}\n🔗 Name servers: \n${formattedNameServers}\n📈 Cờ trạng thái: \n${formattedStatus}\n⚠️ Trạng thái: ${message}`;

      api.sendMessage(body, message.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('Failed to retrieve account information.', message.threadID);
    }
  },
};
