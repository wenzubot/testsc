const fetch = require("node-fetch");

let timeout = 12e4;
let poin = Math.random() * 5001 + 5e3 | 0;

let handler = async (m, { conn, command }) => {
  db.data.game = db.data.game || {};
  db.data.game.jenaka = db.data.game.jenaka || {};
  let id = m.chat;
  if (id in db.data.game.jenaka) {
    return conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", db.data.game.jenaka[id][0]);
  }
  let response = await fetch("https://api-zenith.koyeb.app/api/game/tebakjenaka?apikey=zenkey");
  let src = await response.json();
  let json = src.result;
  let soal = json.pertanyaan;
  let jawaban = json.jawaban;

  let caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- ${soal}
*Tipe:*
- Jenaka
*Clue:*
- ${"```" + jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;

  db.data.game.jenaka[id] = [
    await conn.reply(m.chat, caption, m, {
      mentionedJid: [m.sender],
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        externalAdReply: {
          mediaType: 1,
          title: '乂 T E B A K - J E N A K A',
          thumbnailUrl: 'https://pomf2.lain.la/f/gv7itr0q.jpg',
          sourceUrl: null,
          renderLargerThumbnail: true
        }
      }
    }),
    json,
    poin,
    setTimeout(async () => {
      if (db.data.game.jenaka[id]) {
        await conn.reply(m.chat, `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*\nJawabannya adalah *${jawaban}*`, db.data.game.jenaka[id][0]);
        delete db.data.game.jenaka[id];
      }
    }, timeout)
  ];
};

handler.help = ["tebakjenaka"];
handler.tags = ["game"];
handler.limit = 4
handler.group = true
handler.command = /^tebakjenaka/i;

module.exports = handler;
