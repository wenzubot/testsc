const sharp = require('sharp');

const TIMEOUT = 10000; // 10 detik

const handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `Reply sticker dengan command *${usedPrefix + command}*`;

  if (!m.quoted) throw notStickerMessage;

  const q = m.quoted || m;
  const mime = q.mimetype || '';

  if (!/image\/webp/.test(mime)) throw notStickerMessage;

  try {
    // Download sticker
    const media = await q.download();

    // Dekoding WebP tanpa webp-js
    const decodedBuffer = await sharp(media).toFormat('png').toBuffer();

    // Send PNG image
    if (decodedBuffer.length > 0) {
      await conn.sendFile(m.chat, decodedBuffer, 'out.png', wm, m);
    } else {
      throw `${global.eror}`;
    }
  } catch (error) {
    console.error(error);
    if (error.message === 'Timeout of 10000ms exceeded') {
      m.reply('Proses konversi terlalu lama. Silakan coba lagi.');
    } else {
      m.reply(global.eror);
    }
  }
};

handler.help = ['toimg'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'toimage'];
handler.limit = true;

module.exports = handler;