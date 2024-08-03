const axios = require('axios');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');  // Directly import v4 from uuid

module.exports = {
  name: 'note',
  version: '1.0',
  hasPermission: 3,
  credits: 'Niio-team (DC-Nam)',//covert tnt
  description: 'https://niiozic.site/note/:UUID',
  commandCategory: 'Admin',
  usages: '[]',
  cooldowns: 3,
  usePrefix: false,

  async onCall({ api, event, args }) {
    const name = module.exports.name;
    const url = event?.messageReply?.args?.[0] || args[1];
    let path = `${__dirname}/${args[0]}`;
    const send = (msg) => new Promise(r => api.sendMessage(msg, event.threadID, (err, res) => r(res), event.messageID));

    try {
      if (/^https:\/\//.test(url)) {
        return send(`🔗 File: ${path}\n\nThả cảm xúc để xác nhận thay thế nội dung file`).then(res => {
          res = {
            ...res,
            name,
            path,
            url,
            action: 'confirm_replace_content',
          };
          global.client.handleReaction.push(res);
        });
      } else {
        if (!fs.existsSync(path)) return send(`❎ Đường dẫn file không tồn tại để export`);
        const uuid_raw = uuidv4();
        const url_raw = new URL(`https://niiozic.site/note/${uuid_raw}`);
        const url_redirect = new URL(`https://niiozic.site/note/${uuidv4()}`);
        await axios.put(url_raw.href, fs.readFileSync(path, 'utf8'));
        url_redirect.searchParams.append('raw', uuid_raw);
        await axios.put(url_redirect.href);
        url_redirect.searchParams.delete('raw');
        return send(`📝 Raw: ${url_redirect.href}\n\n✏️ Edit: ${url_raw.href}\n\n🔗 File: ${path}\n\n📌 Thả cảm xúc để upload code`).then(res => {
          res = {
            ...res,
            name,
            path,
            url: url_redirect.href,
            action: 'confirm_replace_content',
          };
          global.client.handleReaction.push(res);
        });
      }
    } catch (e) {
      console.error(e);
      send(e.toString());
    }
  },

  async handleReaction(o) {
    const { handleReaction } = o;
    const send = (msg) => new Promise(r => o.api.sendMessage(msg, o.event.threadID, (err, res) => r(res), o.event.messageID));

    try {
      if (o.event.userID !== handleReaction.event.senderID) return;

      switch (handleReaction.action) {
        case 'confirm_replace_content': {
          const data = (await axios.get(handleReaction.url, {
            responseType: 'arraybuffer',
          })).data;

          fs.writeFileSync(handleReaction.path, data);
          send(`✅ Đã upload code thành công\n\n🔗 File: ${handleReaction.path}`).then(res => {
            res = {
              ...handleReaction,
              ...res,
            };
            global.client.handleReaction.push(res);
          });
          break;
        }
        default:
          break;
      }
    } catch (e) {
      console.error(e);
      send(e.toString());
    }
  },
};
