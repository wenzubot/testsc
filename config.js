global.owner = ['6285800652466']  
global.mods = ['6285800652466'] 
global.prems = ['6285800652466']
global.nameowner = 'wenzxd'
global.numberowner = '6285800652466'
global.nomorown = '6285800652466'
global.sgc = 'https://chat.whatsapp.com/'
global.namebot = '© wenz V9.0.0'
global.mail = 'onlyak1ra@gmail.com' 
global.gc = 'https://chat.whatsapp.com/'
global.fotomu = 'https://i.ibb.co.com/rHVV6DV/35404c89-4888-404c-926d-c9f9f1a082b7.jpg'
global.menu = 'https://i.ibb.co.com/rHVV6DV/35404c89-4888-404c-926d-c9f9f1a082b7.jpg' //image menu , but not work 
global.instagram = 'https://instagram.com/'
global.wm = '© wenz V9.0.0 🍁'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'wenz-md'
global.maxwarn = '2' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.lann = 'hQKCKtZi'
global.xzn = 'hQKCKtZi'
global.lol = 'hQKCKtZi'
//Daftar terlebih dahulu https://api.betabotz.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.btc = 'hQKCKtZi'
//Daftar https://api.botcahx.eu.org 

global.APIs = {   
  lann: 'https://api.betabotz.eu.org',
  lol: 'https://api.lolhuman.xyz',
  alya: 'https://api.alyachan.dev',
  btc: 'https://api.botcahx.eu.org',
  xzn: 'https://skizo.tech'
}
global.APIKeys = { 
  'https://api.betabotz.eu.org': 'nurhasanah',
  'https://api.alyachan.dev': 'OQtXCT',
  'https://skizo.tech': 'katz',
  'https://api.botcahx.eu.org': 'APIKEY'
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
