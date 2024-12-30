// FumiAi Plugins
// IFTXH 
// informasi fumiAi https://whatsapp.com/channel/0029VadbyYw9xVJjWaRWbk3N
// Website https://ryoikitenkai.xyz | https://ai.fumifumi.xyz

const axios = require('axios')

var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `iya, orang hitam ada yg bisa saya bantu??`
async function fumi(message) {
  const res = await axios.post('https://ai.fumifumi.xyz/api/post/ajax', { query: message })
  return res.data.data.result
}
try {
  const { key } = await conn.sendMessage(m.chat, { text: "thinking...." }, { quoted: m })
  var jawab = await fumi(text)
   
await conn.sendMessage(m.chat, { text: ("> " + jawab), edit: key }, { quoted: m })
} catch (err) {
  console.error(err)
  throw "Terjadi kesalahan dalam menjawab pertanyaan"
}
}
handler.command = handler.help = ['fumi'];
handler.tags = ['tools','ai'];
handler.limit = 8
module.exports = handler;