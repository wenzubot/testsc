const fs = require('fs');

let handler = async (m, { conn }) => {
	let pfft = `
*_🟢 Open Sewa Bot WhatsApp_*

- *Rp 5,000* _18 Hari_
- *Rp 10,000* _36 Hari_
- *Rp 20,000* _54 Hari_
- *Rp 35,000* _Permanen_


 *Jika minat/mau tanya ² 👤*
 wa.me/6285845905294
`;
conn.sendMessage(m.chat, {
      text: pfft,
      contextInfo: {
      externalAdReply: {
      title: `○ Halo kak 🤗`,
      body: global.author,
      thumbnailUrl: `https://i.ibb.co.com/rHVV6DV/35404c89-4888-404c-926d-c9f9f1a082b7.jpg`,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}})
}

handler.help = ['sewa']
handler.tags = ['main']
handler.command = /^(sewa|rental|sewabot)$/i

module.exports = handler;