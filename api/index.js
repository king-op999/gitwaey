// ============================================
// 🚀 BRONX PAYMENT API V5.0
// AUTO REDIRECT – JSON NAHI, DIRECT APP OPEN!
// ============================================
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.json());

// ============ DASHBOARD ============
app.get('/', (req, res) => {
    const baseURL = `https://${req.get('host')}`;
    res.send(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>🚀 BRONX PAYMENT API V5</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#000a14;--s:rgba(5,15,35,.85);--b:rgba(0,150,255,.08);--t:#d0d8f0}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--t);font-family:'Rajdhani',sans-serif;min-height:100vh}
body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(0,150,255,.06),transparent 60%);pointer-events:none;z-index:0}
.top{text-align:center;padding:30px 20px;position:relative;z-index:1}
.top h1{font-family:'Orbitron',sans-serif;font-size:clamp(22px,5vw,36px);background:linear-gradient(90deg,#0096ff,#00d4ff,#8b00ff,#ffb400);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:rb 4s linear infinite}@keyframes rb{0%{background-position:0% 50%}100%{background-position:300% 50%}}
.container{max-width:1200px;margin:0 auto;padding:20px;position:relative;z-index:1}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.card{background:var(--s);border:1px solid var(--b);border-radius:16px;padding:22px;transition:.3s;backdrop-filter:blur(20px)}
.card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.5)}
.icon{font-size:32px;margin-bottom:6px}
.card h3{color:#fff;font-size:16px;margin-bottom:4px;font-family:'Orbitron',sans-serif}
.card p{color:#667;font-size:11px;margin-bottom:8px}
code{display:block;background:rgba(0,0,0,.5);color:#00ff88;padding:10px;border-radius:10px;font-size:9px;word-break:break-all;margin-bottom:10px;font-family:monospace}
button{background:linear-gradient(135deg,#0096ff,#0066cc);color:#fff;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-weight:700;font-family:'Orbitron',sans-serif;width:100%;transition:.3s;font-size:12px}
button:hover{transform:scale(1.02)}
.badge{display:inline-block;background:rgba(0,255,136,.06);color:#00ff88;padding:4px 12px;border-radius:20px;font-size:10px;border:1px solid rgba(0,255,136,.12);margin:3px}
.alert{background:rgba(0,255,136,.06);border:1px solid rgba(0,255,136,.15);border-radius:12px;padding:16px;margin-bottom:20px;text-align:center;color:#00ff88;font-weight:700;font-size:14px}
</style></head><body>
<div class="top"><h1>🚀 BRONX PAYMENT API V5</h1><p style="color:#667;font-size:13px">⚡ Auto Redirect – Direct App Open!</p>
<div style="margin-top:10px"><span class="badge">📱 UPI</span><span class="badge">💰 PayPal</span><span class="badge">₿ BTC</span><span class="badge">Ξ ETH</span><span class="badge">💎 USDT</span><span class="badge">💛 BNB</span><span class="badge">💳 Stripe</span></div></div>
<div class="container">
<div class="alert">⚡ API Call Karte Hi Payment App Khulegi! (No JSON)</div>
<div class="grid">
<div class="card" style="border-top:3px solid #0096ff"><div class="icon">📱</div><h3>UPI</h3><p>GPay/PhonePe/Paytm</p><code>${baseURL}/api/upi?upi=example@ybl&count=100</code><button onclick="location.href='/api/upi?upi=example@ybl&count=100'">💸 TEST NOW</button></div>
<div class="card" style="border-top:3px solid #003087"><div class="icon">💰</div><h3>PayPal</h3><p>International</p><code>${baseURL}/api/paypal?email=user@gmail.com&count=10</code><button onclick="location.href='/api/paypal?email=user@gmail.com&count=10'">💸 TEST NOW</button></div>
<div class="card" style="border-top:3px solid #f7931a"><div class="icon">₿</div><h3>Bitcoin</h3><p>BTC Network</p><code>${baseURL}/api/btc?address=YOUR_BTC&count=0.001</code><button onclick="location.href='/api/btc?address=YOUR_BTC&count=0.001'">💸 TEST NOW</button></div>
<div class="card" style="border-top:3px solid #627eea"><div class="icon">Ξ</div><h3>Ethereum</h3><p>ETH Network</p><code>${baseURL}/api/eth?address=YOUR_ETH&count=0.01</code><button onclick="location.href='/api/eth?address=YOUR_ETH&count=0.01'">💸 TEST NOW</button></div>
<div class="card" style="border-top:3px solid #26a17b"><div class="icon">💎</div><h3>USDT</h3><p>TRC20 Network</p><code>${baseURL}/api/usdt?address=YOUR_TRC20&count=10</code><button onclick="location.href='/api/usdt?address=YOUR_TRC20&count=10'">💸 TEST NOW</button></div>
<div class="card" style="border-top:3px solid #f3ba2f"><div class="icon">💛</div><h3>BNB</h3><p>BSC Network</p><code>${baseURL}/api/bnb?address=YOUR_BNB&count=0.5</code><button onclick="location.href='/api/bnb?address=YOUR_BNB&count=0.5'">💸 TEST NOW</button></div>
<div class="card" style="border-top:3px solid #635bff"><div class="icon">💳</div><h3>Stripe</h3><p>Card Payment</p><code>${baseURL}/api/stripe?link=YOUR_LINK&count=100</code><button onclick="location.href='/api/stripe?link=YOUR_LINK&count=100'">💸 TEST NOW</button></div>
</div></div></body></html>`);
});

// ============================================
// 🔥 DIRECT REDIRECT – NO JSON, ONLY APP OPEN
// ============================================

// 📱 UPI
app.get('/api/upi', (req, res) => {
    const { upi, count, name, note } = req.query;
    if (!upi) return res.send('<h1>❌ UPI ID Required!</h1><p>Use: /api/upi?upi=example@ybl&count=100</p>');
    const amount = parseFloat(count) || 100;
    const deepLink = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name || 'Payment')}&am=${amount}&cu=INR&tn=${encodeURIComponent(note || 'Payment')}`;
    res.redirect(302, deepLink);
});

// 💰 PayPal
app.get('/api/paypal', (req, res) => {
    const { email, count, currency, note } = req.query;
    if (!email) return res.send('<h1>❌ Email Required!</h1><p>Use: /api/paypal?email=user@gmail.com&count=10</p>');
    const amount = parseFloat(count) || 10;
    const curr = currency || 'USD';
    const deepLink = `paypal://pay?business=${email}&amount=${amount}&currency_code=${curr}&item_name=${encodeURIComponent(note || 'Payment')}`;
    res.redirect(302, deepLink);
});

// ₿ Bitcoin
app.get('/api/btc', (req, res) => {
    const { address, count, note } = req.query;
    if (!address) return res.send('<h1>❌ Address Required!</h1><p>Use: /api/btc?address=YOUR_BTC&count=0.001</p>');
    const amount = parseFloat(count) || 0.001;
    const deepLink = `bitcoin:${address}?amount=${amount}&label=${encodeURIComponent(note || 'Payment')}`;
    res.redirect(302, deepLink);
});

// Ξ Ethereum
app.get('/api/eth', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.send('<h1>❌ Address Required!</h1><p>Use: /api/eth?address=YOUR_ETH&count=0.01</p>');
    const amount = parseFloat(count) || 0.01;
    const deepLink = `ethereum:${address}?value=${amount}`;
    res.redirect(302, deepLink);
});

// 💎 USDT TRC20
app.get('/api/usdt', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.send('<h1>❌ Address Required!</h1><p>Use: /api/usdt?address=YOUR_TRC20&count=10</p>');
    const amount = parseFloat(count) || 10;
    const deepLink = `tron:${address}?amount=${amount}`;
    res.redirect(302, deepLink);
});

// 💛 BNB
app.get('/api/bnb', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.send('<h1>❌ Address Required!</h1><p>Use: /api/bnb?address=YOUR_BNB&count=0.5</p>');
    const amount = parseFloat(count) || 0.5;
    const deepLink = `bnb:${address}?amount=${amount}`;
    res.redirect(302, deepLink);
});

// 💳 Stripe/Web
app.get('/api/stripe', (req, res) => {
    const { link, count } = req.query;
    if (!link) return res.send('<h1>❌ Link Required!</h1><p>Use: /api/stripe?link=YOUR_LINK&count=100</p>');
    res.redirect(302, link);
});

// ============ JSON API (For Developers/Bots) ============
app.get('/api/json/upi', (req, res) => {
    const { upi, count, name, note } = req.query;
    if (!upi) return res.json({ error: 'UPI ID required!' });
    const amount = parseFloat(count) || 100;
    const deepLink = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name || 'Payment')}&am=${amount}&cu=INR&tn=${encodeURIComponent(note || 'Payment')}`;
    res.json({ success: true, method: 'upi', amount, upi_id: upi, deep_link: deepLink, telegram_button: { text: `💸 PAY ₹${amount}`, url: deepLink } });
});

app.get('/api/json/paypal', (req, res) => {
    const { email, count, currency, note } = req.query;
    if (!email) return res.json({ error: 'Email required!' });
    const amount = parseFloat(count) || 10;
    const deepLink = `paypal://pay?business=${email}&amount=${amount}&currency_code=${currency || 'USD'}`;
    res.json({ success: true, method: 'paypal', amount, email, deep_link: deepLink, telegram_button: { text: `💸 PAY ${amount}`, url: deepLink } });
});

app.get('/api/json/btc', (req, res) => {
    const { address, count, note } = req.query;
    if (!address) return res.json({ error: 'Address required!' });
    const deepLink = `bitcoin:${address}?amount=${parseFloat(count)||0.001}`;
    res.json({ success: true, method: 'bitcoin', deep_link: deepLink, telegram_button: { text: '💸 PAY BTC', url: deepLink } });
});

// ============ 404 ============
app.use((req, res) => res.redirect('/'));

// ============ START ============
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 BRONX V5 on port ${PORT}`));
module.exports = app;
