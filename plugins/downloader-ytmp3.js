const fetch = require('node-fetch');

let handler = async (m, {
	conn,
	usedPrefix,
	command,
	args
}) => {
	if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Example: *${usedPrefix}${command}* https://youtu.be/pvlDjh_UgvA`)
	try {
		m.reply(wait)
		let beta = await (await fetch(`https://api.botcahx.eu.org/api/download/yt?url=${args[0]}&apikey=${btc}`)).json()
		let doc = {
			audio: {
				url: beta.result.mp3
			},
			mimetype: "audio/mpeg",
			fileName: beta.result.title,
			contextInfo: {
				forwardingScore: 1,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					newsletterJid: global.sgc,
					serverMessageId: null,
					newsletterName: global.sgc,
				},
				externalAdReply: {
					showAdAttribution: true,
					mediaType: 2,
					mediaUrl: args[0],
					title: beta.result.title,
					body: wm,
					sourceUrl: args[0],
					thumbnailUrl: beta.result.thumb,
					renderLargerThumbnail: true
				}
			}
		}

		await conn.sendMessage(m.chat, doc, {
			quoted: m
		})
		await conn.sendMessage(m.chat, {
			document: {
				url: beta.result.mp3
			},
			mimetype: 'audio/mpeg',
			fileName: `${beta.result.title}.mp3`,
			caption: ''
		}, {
			quoted: m
		})
	} catch (e) {
		console.log(e)
		await m.reply(global.eror)
	}
}
handler.tags = ['downloader']
handler.help = ['ytmp3']
handler.command = /^(yta|ytmp3)$/i

handler.limit = 3;

module.exports = handler;