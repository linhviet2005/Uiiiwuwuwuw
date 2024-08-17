const axios = require('axios');
const { getData, increaseMoney, decreaseMoney } = Currencies;

function replace(int){
    return int.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,');
}

function getImage(number) {
    const images = {
        1: "https://imgur.com/qn9PXUX.jpg",
        2: "https://imgur.com/hbQISCE.jpg",
        3: "https://imgur.com/gyskBsm.jpg",
        4: "https://imgur.com/vHMWTc2.jpg",
        5: "https://imgur.com/HvA4KVd.jpg",
        6: "https://imgur.com/JVuky8r.jpg"
    };
    return images[number];
}

function getRATE(tong) {
    const rates = {
        4: 40, 5: 35, 6: 33.33, 7: 25, 8: 20, 9: 16.66,
        10: 14.28, 11: 12.5, 12: 11.11, 13: 10, 14: 9.09,
        15: 8.33, 16: 7.69, 17: 7.14
    };
    return rates[tong] || 0;
}

async function processGame({ event, api, args }) {
    try {
        const { threadID, messageID, senderID } = event;
        const { getNameUser } = api.Users;

        let name = await getNameUser(senderID);
        let money = (await getData(senderID)).money;
        let bet = parseInt((args[1] == "allin" ? money : args[1]));
        let input = args[0];
        let tong = parseInt(args[2]);

        if (!input || !bet || bet < 1000 || bet > money) {
            throw new Error("Invalid input or bet");
        }

        let choose;
        if (["tài", "xỉu", "-t", "-x"].includes(input)) choose = input.toLowerCase();
        if (["b3gn", "bbgn", "btgn"].includes(input)) choose = 'b3gn';
        if (["b2gn", "bdgn", "bhgn"].includes(input)) choose = 'b2gn';
        if (input === 'cuoctong' || input === 'ct') choose = 'cuoctong';
        if (input === 'cuocso' || input === 'cs') choose = 'cuocso';

        if (!choose || (choose === 'cuoctong' && (tong < 4 || tong > 17)) || (choose === 'cuocso' && (tong < 1 || tong > 6))) {
            throw new Error("Invalid choice or bet");
        }

        const number = [], img = [];
        for (let i = 1; i <= 3; i++) {
            let n = Math.floor(Math.random() * 6 + 1);
            number.push(n);
            img.push((await axios.get(encodeURI(getImage(n)), { responseType: 'stream' })).data);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        let total = number.reduce((acc, curr) => acc + curr, 0);
        let ans, result, mn, mne;

        // Game logic processing here ...

        if (result === 'lose') {
            decreaseMoney(senderID, mn);
        } else if (result === 'win') {
            increaseMoney(senderID, mn);
        }

        let msg = `===== TÀI XỈU =====\n` +
            `[⏰] - Time: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Ho_Chi_Minh" })}\n` +
            `[👤] - Player: ${name}\n` +
            `[🌸] - Lựa Chọn: ${choose}\n` +
            `[⚜️] - Kết Quả: ${ans}\n` +
            `[🎲] - Xúc Xắc 1: ${number[0]}\n` +
            `[🎲] - Xúc Xắc 2: ${number[1]}\n` +
            `[🎲] - Xúc Xắc 3: ${number[2]}\n` +
            `[🎲] - Tổng Xúc Xắc: ${total}\n` +
            `[🎰] - Kết Quả: ${(result === 'win' ? 'Thắng' : 'Thua')}\n` +
            `[💸] - Tiền Cược: ${replace(bet)}\n` +
            `[💵] - Tiền ${(result === 'win' ? 'Thắng' : 'Thua')}: ${replace(Math.floor(mn))}$\n` +
            `[♻️] - Trạng Thái: ${(result === 'win' ? 'Đã Trả Thưởng' : 'Đã Trừ Tiền')}\n` +
            `[💰] - Số Tiền Hiện Tại: ${replace(mne)}$\n` +
            `===== TÀI XỈU =====`;

        api.sendMessage({ body: msg, attachment: img }, threadID, messageID);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    name: "txiu",
    author: "Yae Miko",
    version: "6.6.6",
    category: "Trò Chơi",
    description: "Tài xỉu trên hệ thống Raiden Pay đa dạng nhiều kiểu",
    usages: "[tài/xỉu/b3gn/b2gn/cs/ct] [số tiền]",
    cooldown: 5,

    onCall({ event, api, args }) {
        processGame({ event, api, args });
    }
};
