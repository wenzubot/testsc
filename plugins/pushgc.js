let handler = async (m, { conn, groupMetadata, usedPrefix, text, command }) => {
    if (!text && !m.quoted) return m.reply("Pesannya Sayang?\nFormat salah. Contoh penggunaan: .pushgc 10|text");
    
    let arg = text.split('|');
    if (arg.length !== 2 || isNaN(arg[0]) || arg[1].trim().length === 0) {
        return m.reply('Format salah. Contoh penggunaan: ' + usedPrefix + 'vynaa-push 5|text');
    }

    let delay = parseInt(arg[0]);
    if (delay < 1 || delay > 60) {
        return m.reply('Delay harus antara 1 hingga 60 detik.');
    }

    let get = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    let count = get.length;
    let sentCount = 0;
    m.reply("Mengirim pesan kepada " + count + " kontak dengan delay " + delay + " detik.");

    for (let i = 0; i < get.length; i++) {
        setTimeout(function() {
            if (text && m.quoted) {
                conn.sendMessage(get[i], {
                    text: arg[1] + "\n" + m.quoted.text
                });
            } else if (text) {
                conn.sendMessage(get[i], {
                    text: arg[1]
                });
            } else if (m.quoted) {
                conn.copyNForward(get[i], m.getQuotedObj(), false);
            }

            count--;
            sentCount++;
            if (count === 0) {
                m.reply("Berhasil Push Kontak:\nJumlah Pesan Terkirim: " + sentCount);
            }
        }, delay * 1000 * (i + 1)); // Penyesuaian delay
    }
};

handler.command = ['pushgc'];
handler.tags = ['owner', 'group'];
handler.help = ['pushgc'];
handler.group = true;
handler.owner = true;

module.exports = handler;