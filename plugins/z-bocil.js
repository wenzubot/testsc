const fetch = require('node-fetch');

// Fungsi untuk menambahkan delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn, usedPrefix, command }) => {
  // Menunggu selama 4 detik
  await delay(4000);

  // Mengambil data dari API
  let res = await fetch('https://raw.githubusercontent.com/binjaicity/warga62/master/bocil.json');
  let asup = await res.json();

  // Memilih elemen acak dari data yang diterima
  let json = asup[Math.floor(Math.random() * asup.length)];

  // Mengirim file ke chat
  conn.sendFile(m.chat, json.url, '', '_Nih Kak_', m);
};

// Metadata untuk handler
handler.help = ['bocil'];
handler.tags = ['internet'];
handler.limit = 6;
handler.command = /^(bocil)$/i;

module.exports = handler;
