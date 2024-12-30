/* JANGAN HAPUS INI 
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/

const fetch = require("node-fetch");

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "Input Teks";

    await m.reply(wait);

    try {
        let data = await generateImage(text);
        if (data && data.imgs.length > 0) {
            for (let i = 0; i < data.imgs.length; i++) {
                await conn.sendFile(m.chat, data.imgs[i], '', `Image *(${i + 1}/${data.imgs.length})*`, m, false, {
                    mentions: [m.sender]
                });
            }
        }
    } catch (e) {
        await m.reply(eror);
    }
};

handler.help = ["gptpic"];
handler.tags = ["ai"];
handler.limit = 3
handler.private = true
handler.command = /^(gptpic(ure)?)$/i;
handler.register = handler.limit = true;

module.exports = handler;

/* New Line */
async function generateImage(captionInput) {
    const data = {
        captionInput,
        captionModel: "default"
    };

    const url = 'https://chat-gpt.pictures/api/generateImage';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}