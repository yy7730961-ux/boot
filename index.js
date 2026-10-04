const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => { res.send('البوت شغال وعال العال! 🚀'); });
app.listen(PORT, () => { console.log(`سيرفر الويب شغال على بورت ${PORT}`); });
const BOT_NUMBER = "201287455626";
const allowedNumbers = ["201008396086@c.us", "201226925449@c.us"];
const client = new Client({
    authStrategy: new LocalAuth({ pairingCode: { phoneNumber: BOT_NUMBER } }),
    puppeteer: { headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--disable-accelerated-2d-canvas','--no-first-run','--no-zygote','--single-process','--disable-gpu'] }
});
let botShagal = false; let mode = null; let fawakehIndex = 0; let animeIndex = 0;
function isAllowed(msg) { if (msg.fromMe) return true; let sender = msg.author || msg.from; return allowedNumbers.includes(sender); }
const fawakeh = ["🍉","🍇","🍓","🍑","🍒","🍍","🍌","🍎","🍊","🥭","🍐","🥝"];
const anime = ["ناروتو","ون بيس","هجوم العمالقة","ديث نوت","دراغون بول","بليتش","هنتر x هنتر","كيميتسو نو يايبا","جوجوتسو كايسن","ون بنش مان","طوكيو غول","بوكو نو هيرو","فولميتال","كود جياس","ستاينز جيت","موب سايكو 100","بلاك كلوفر","فيري تيل","ري زيرو","اوفرلورد","سولو ليفلينج","فرييرين","سباي فاميلي","تشينسو مان","بلو لوك","فينلاند ساغا"];
client.on('pairing_code', (code) => { console.log(`======================`); console.log(`كود الربط بتاعك هو: ${code}`); console.log(`======================`); });
client.on('ready', () => { console.log('✅ البوت اشتغل وجاهز للاستخدام!'); });
client.on('message', async msg => {
    let text = msg.body.trim();
    if (!isAllowed(msg) && [".تشغيل", ".ايقاف", ".فواكه", ".كتابة"].includes(text)) return;
    if (text === '.تشغيل' && isAllowed(msg)) { botShagal = true; await msg.reply('✅ اشتغل'); return; }
    if (text === '.ايقاف' && isAllowed(msg)) { botShagal = false; mode = null; await msg.reply('❌ اتقفل'); return; }
    if (text === '.فواكه' && isAllowed(msg)) { if (!botShagal) return; mode = 'فواكه'; fawakehIndex = 0; await client.sendMessage(msg.from, `فواكه 🍉: ${fawakeh[0]}`); return; }
    if (text === '.كتابة' && isAllowed(msg)) { if (!botShagal) return; mode = 'كتابة'; animeIndex = 0; await client.sendMessage(msg.from, `انمي ✍️: ${anime[0]}`); return; }
    if (!botShagal ||!mode) return;
    if (mode === 'فواكه' && text.includes(fawakeh[fawakehIndex])) { fawakehIndex = (fawakehIndex + 1) % fawakeh.length; await client.sendMessage(msg.from, fawakeh[fawakehIndex]); }
    if (mode === 'كتابة' && text === anime[animeIndex]) { animeIndex = (animeIndex + 1) % anime.length; await client.sendMessage(msg.from, anime[animeIndex]); }
});
client.initialize();
