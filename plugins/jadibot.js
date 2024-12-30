const fs = require('fs');

let handler = async (m, { conn }) => {
	let pfft = `

*_🟢 Open Jadi Bot WhatsApp_*

- *Rp 10,000* _1 bulan_
- *Rp 20,000* _2 bulan_
- *Rp 30,000* _3 bulan_
- *Rp 104,000* _Permanen_

 *_Note 📌_*
• Bisa Di Jual Kembali atau open sewa bot
• Bisa Jadi Owner bot
• Request fitur bot
• Anti Eror 
• Tidak perlu 2 hp untuk terhubung ke bot, hanya masukan code saja *( Aman )*
• Fresh Respon


 *Jika minat/mau tanya ² 👤*
 wa.me/6285845905294
`;
conn.sendMessage(m.chat, {
      text: pfft,
      contextInfo: {
      externalAdReply: {
      title: `○ Halo kak 🤗`,
      body: global.author,
      thumbnailUrl: `https://pomf2.lain.la/f/89h4fhn1.jpg`,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}})
}

handler.help = ['jadibot']
handler.tags = ['main']
handler.command = /^(jadibot)$/i

module.exports = handler;