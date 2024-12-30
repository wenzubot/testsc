const fetch = require("node-fetch");
const similarity = require("similarity");
const threshold = 0.72;

let timeout = 12e4;
let poin = Math.random() * 5001 + 5e3 | 0;

let handler = async (m, { conn, command }) => {
  db.data.game = db.data.game || {};
  db.data.game.jenaka = db.data.game.jenaka || {};
  let id = m.chat;

  // Check if there is an ongoing game
  if (id in db.data.game.jenaka) {
    return conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", db.data.game.jenaka[id][0]);
  }

  // Fetch the question
  let response = await fetch("https://api-zenith.koyeb.app/api/game/tebakjenaka?apikey=zenkey");
  let src = await response.json();
  let json = src.result;
  let soal = json.pertanyaan;
  let jawaban = json.jawaban;

  // Create the question caption
  let caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*\n\n*Soal:*\n- ${soal}\n*Tipe:*\n- Jenaka\n*Clue:*\n- ${"```" + jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}\n\n*Hadiah:* ${poin} XP  \n*Waktu:* ${(timeout / 1e3).toFixed(2)} detik\n\nBalas pesan ini untuk menjawab!`;

  // Save game data
  db.data.game.jenaka[id] = [
    await conn.reply(m.chat, caption, m, { 
      mentionedJid: [m.sender], 
      contextInfo: { 
        forwardingScore: 9999, 
        isForwarded: true
      }
    }), 
    json, 
    poin, 
    setTimeout(async () => {
      if (db.data.game.jenaka[id]) {
        await conn.reply(m.chat, `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*\nJawabannya adalah *${jawaban}*`, db.data.game.jenaka[id][0]);
        delete db.data.game.jenaka[id]; // Remove game data after timeout
      }
    }, timeout)
  ];
};

// Function to handle user answers
async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !(/🕹️ GAME - TEBAKJENAKA[\s\S]*Balas pesan ini untuk menjawab/i.test(m.text || "") || /🕹️ GAME - TEBAKJENAKA[\s\S]*Balas pesan ini untuk menjawab/i.test(m.quoted?.text || ""))) return true;

  db.data.game.jenaka = db.data.game.jenaka || {};
  if (!(id in db.data.game.jenaka)) return await this.reply(m.chat, "Soal tebakjenaka itu telah berakhir", m);

  if (m.quoted?.id === db.data.game.jenaka[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) {
      clearTimeout(db.data.game.jenaka[id][3]);
      delete db.data.game.jenaka[id]; // Clear game data on surrender
      return await this.reply(m.chat, "❌ *Yah Menyerah :( !*", m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    }

    let json = JSON.parse(JSON.stringify(db.data.game.jenaka[id][1]));
    if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
      db.data.users[m.sender].exp += db.data.game.jenaka[id][2];
      await this.reply(m.chat, `✅ *Benar!*\n+${db.data.game.jenaka[id][2]} XP`, m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
      clearTimeout(db.data.game.jenaka[id][3]);
      delete db.data.game.jenaka[id]; // Clear game data after correct answer
    } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
      await this.reply(m.chat, "❗ *Sedikit Lagi!*", m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    } else {
      await this.reply(m.chat, "❌ *Salah!*", m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    }
  }

  return true;
}

const exp = 0;

module.exports = {
  handler,
  before,
  exp
};