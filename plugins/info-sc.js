let handler = async (m, { conn, usedPrefix }) => {
let text = `*SELL SCRIPT Fuuka Kitachi V10.0.0*
🏷️ Price : *Rp. 50.000* 

*Special Features & Benefit :*
- AI & AI Image
- Chat GPT (Turbo 3.5)
- Anti Bot
- Chat Bot
- Chat Ai (Character Ai)
- 40 Mini Games
- 60 Ai Features 
- Automatic Chatbots 
- Atlantic Pedia (H2H)
- Leveling & Roles
- Buyprem Gateway
- Deposit Gateway
- Captcha Verification
- Send Email
- Free Updates

_Minat ? chat_
wa.me/628999811229`
conn.sendFile(m.chat, 'https://btch.pages.dev/file/2fd54032eb4ffb4f42ac6.jpg', '', text, m)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info','main']
handler.command = /^(sc|sourcecode)$/i
handler.register = false

module.exports = handler