// ============================================
// 🚀 BRONX DYNAMIC PAYMENT API V3.0
// ALL GATEWAYS – ENDPOINT MEIN DO, USI PE JAYEGA
// VERCEL READY
// ============================================
const express = require('express');
const app = express();

// ============ HELPERS ============
function generateOrderID() {
    return 'BRONX' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// ============ CORS ============
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.json());
app.use(express.static('public'));

// ============ DASHBOARD ============
app.get('/', (req, res) => {
    const baseURL = `https://${req.get('host')}`;
    
    const cards = [
        { icon: '📱', name: 'UPI', color: '#0096ff', desc: 'GPay/PhonePe/Paytm',
          required: 'upi', example: `${baseURL}/api/pay?method=upi&upi=example@ybl&count=100&name=MyShop` },
        { icon: '💰', name: 'PayPal', color: '#003087', desc: 'International',
          required: 'email', example: `${baseURL}/api/pay?method=paypal&email=user@gmail.com&count=10&currency=USD` },
        { icon: '₿', name: 'Bitcoin', color: '#f7931a', desc: 'BTC Network',
          required: 'address', example: `${baseURL}/api/pay?method=bitcoin&address=bc1qexample&count=0.001` },
        { icon: 'Ξ', name: 'Ethereum', color: '#627eea', desc: 'ETH Network',
          required: 'address', example: `${baseURL}/api/pay?method=ethereum&address=0xExample&count=0.01` },
        { icon: '💎', name: 'USDT', color: '#26a17b', desc: 'TRC20 Network',
          required: 'address', example: `${baseURL}/api/pay?method=usdt&address=TExample&count=10` },
        { icon: '💛', name: 'BNB', color: '#f3ba2f', desc: 'BSC Network',
          required: 'address', example: `${baseURL}/api/pay?method=bnb&address=bnbExample&count=0.5` },
        { icon: '💳', name: 'Stripe', color: '#635bff', desc: 'Card Payment',
          required: 'link', example: `${baseURL}/api/pay?method=stripe&link=https://buy.stripe.com/example&count=100` }
    ];

    const cardsHTML = cards.map(c => `
        <div class="card" style="border-top:3px solid ${c.color}">
            <div class="icon">${c.icon}</div>
            <h3>${c.name}</h3>
            <p>${c.desc}</p>
            <span class="req">Required: ${c.required}</span>
            <code>${c.example}</code>
            <button onclick="window.open('${c.example}','_blank')">🔗 TEST</button>
        </div>
    `).join('');

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>🚀 BRONX PAYMENT API V3</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root{--bg:#000a14;--s:rgba(5,15,35,.85);--b:rgba(0,150,255,.08);--t:#d0d8f0}
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:var(--bg);color:var(--t);font-family:'Rajdhani',sans-serif;min-height:100vh}
        body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(0,150,255,.06),transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(139,0,255,.04),transparent 60%);pointer-events:none;z-index:0}
        .top{text-align:center;padding:40px 20px 20px;position:relative;z-index:1}
        .top h1{font-family:'Orbitron',sans-serif;font-size:clamp(24px,5vw,40px);background:linear-gradient(90deg,#0096ff,#00d4ff,#8b00ff,#ffb400);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:rb 4s linear infinite}@keyframes rb{0%{background-position:0% 50%}100%{background-position:300% 50%}}
        .top p{color:#667;font-size:14px;margin-top:8px}
        .container{max-width:1400px;margin:0 auto;padding:20px;position:relative;z-index:1}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
        .card{background:var(--s);border:1px solid var(--b);border-radius:18px;padding:24px;transition:.3s;backdrop-filter:blur(20px)}
        .card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.5)}
        .icon{font-size:36px;margin-bottom:8px}
        .card h3{color:#fff;font-size:18px;margin-bottom:4px;font-family:'Orbitron',sans-serif}
        .card p{color:#667;font-size:12px;margin-bottom:4px}
        .req{color:#ffb400;font-size:10px;display:block;margin-bottom:8px}
        code{display:block;background:rgba(0,0,0,.5);color:#00ff88;padding:10px;border-radius:10px;font-size:9px;word-break:break-all;margin-bottom:10px;font-family:monospace}
        button{background:linear-gradient(135deg,#0096ff,#0066cc);color:#fff;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-weight:700;font-family:'Orbitron',sans-serif;width:100%;transition:.3s}
        button:hover{transform:scale(1.02);box-shadow:0 0 30px rgba(0,150,255,.3)}
        .info{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:20px;margin-top:30px;text-align:center}
        .info h3{color:#0096ff;font-family:'Orbitron',sans-serif;margin-bottom:10px}
        .badge{display:inline-block;background:rgba(0,255,136,.06);color:#00ff88;padding:4px 12px;border-radius:20px;font-size:10px;border:1px solid rgba(0,255,136,.12);margin:4px}
        footer{text-align:center;padding:20px;border-top:1px solid var(--b);margin-top:30px;position:relative;z-index:1}
    </style>
</head>
<body>
<div class="top">
    <h1>🚀 BRONX PAYMENT API V3</h1>
    <p>All Gateways Dynamic • Endpoint Mein Do → Usi Pe Payment Jayega!</p>
    <div style="margin-top:12px">
        <span class="badge">📱 UPI</span><span class="badge">💰 PayPal</span>
        <span class="badge">₿ Bitcoin</span><span class="badge">Ξ Ethereum</span>
        <span class="badge">💎 USDT</span><span class="badge">💛 BNB</span>
        <span class="badge">💳 Stripe</span>
    </div>
</div>
<div class="container">
    <div class="grid">${cardsHTML}</div>
    <div class="info">
        <h3>💡 KAISE USE KAREIN</h3>
        <p style="color:#667;font-size:13px">
            <b>Endpoint mein apni ID do</b> → API deep link banayega → Payment usi account mein jayega!<br><br>
            <b>Telegram Bot:</b> <code style="display:inline;padding:4px 8px;font-size:11px">data.deep_link</code> ko inline button mein use karo<br>
            <b>Website:</b> <code style="display:inline;padding:4px 8px;font-size:11px">&lt;a href="API_URL"&gt;Pay&lt;/a&gt;</code>
        </p>
    </div>
</div>
<footer><p style="font-family:'Orbitron',sans-serif;background:linear-gradient(90deg,#0096ff,#00d4ff,#8b00ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:12px">BRONX DYNAMIC PAYMENT API V3.0</p></footer>
</body></html>`);
});

// ============================================
// 🔥 UNIVERSAL PAYMENT API – ALL METHODS
// ============================================
app.get('/api/pay', (req, res) => {
    const {
        method, upi, email, address, link,
        count, currency, name, note
    } = req.query;

    const paymentMethod = (method || 'upi').toLowerCase();
    const amount = parseFloat(count) || 100;
    const orderID = generateOrderID();
    const baseURL = `https://${req.get('host')}`;

    let result = {
        success: false,
        error: '',
        order_id: orderID,
        method: paymentMethod,
        amount: amount,
        timestamp: new Date().toISOString()
    };

    // ============ UPI ============
    if (paymentMethod === 'upi') {
        if (!upi) { result.error = 'UPI ID required! /api/pay?method=upi&upi=example@ybl&count=100'; return res.json(result); }
        result.success = true;
        result.currency = 'INR';
        result.upi_id = upi;
        result.merchant_name = name || 'Payment';
        result.deep_link = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name||'Payment')}&am=${amount}&cu=INR&tn=${encodeURIComponent(note||'Payment')}`;
        result.web_link = `https://pay.google.com/gp/v/send?pa=${upi}&pn=${encodeURIComponent(name||'Payment')}&am=${amount}`;
        result.qr_data = result.deep_link;
        result.instructions = 'Click deep_link → UPI app opens';
        result.apps = ['PhonePe', 'Google Pay', 'Paytm', 'BHIM'];
    }

    // ============ PAYPAL ============
    else if (paymentMethod === 'paypal') {
        if (!email) { result.error = 'Email required! /api/pay?method=paypal&email=user@gmail.com&count=10'; return res.json(result); }
        const curr = currency || 'USD';
        result.success = true;
        result.currency = curr;
        result.email = email;
        result.deep_link = `paypal://pay?business=${email}&amount=${amount}&currency_code=${curr}&item_name=${encodeURIComponent(note||'Payment')}`;
        result.web_link = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${email}&amount=${amount}&currency_code=${curr}`;
        result.instructions = 'Click deep_link → PayPal app opens';
    }

    // ============ BITCOIN ============
    else if (paymentMethod === 'bitcoin' || paymentMethod === 'btc') {
        if (!address) { result.error = 'Address required! /api/pay?method=bitcoin&address=YOUR_BTC&count=0.001'; return res.json(result); }
        result.success = true;
        result.currency = 'BTC';
        result.wallet_address = address;
        result.network = 'Bitcoin';
        result.deep_link = `bitcoin:${address}?amount=${amount}&label=${encodeURIComponent(note||'Payment')}`;
        result.web_link = `https://blockchain.info/payment_request?address=${address}&amount=${amount}`;
        result.instructions = 'Click deep_link → Bitcoin wallet opens';
    }

    // ============ ETHEREUM ============
    else if (paymentMethod === 'ethereum' || paymentMethod === 'eth') {
        if (!address) { result.error = 'Address required! /api/pay?method=ethereum&address=YOUR_ETH&count=0.01'; return res.json(result); }
        result.success = true;
        result.currency = 'ETH';
        result.wallet_address = address;
        result.network = 'Ethereum';
        result.deep_link = `ethereum:${address}?value=${amount}`;
        result.web_link = `https://etherscan.io/address/${address}`;
        result.instructions = 'Click deep_link → Ethereum wallet opens';
    }

    // ============ USDT TRC20 ============
    else if (paymentMethod === 'usdt' || paymentMethod === 'tron') {
        if (!address) { result.error = 'Address required! /api/pay?method=usdt&address=YOUR_TRC20&count=10'; return res.json(result); }
        result.success = true;
        result.currency = 'USDT';
        result.wallet_address = address;
        result.network = 'TRC20';
        result.deep_link = `tron:${address}?amount=${amount}`;
        result.web_link = `https://tronscan.org/#/address/${address}`;
        result.instructions = 'Click deep_link → Tron wallet opens';
    }

    // ============ BNB ============
    else if (paymentMethod === 'bnb' || paymentMethod === 'bsc') {
        if (!address) { result.error = 'Address required! /api/pay?method=bnb&address=YOUR_BNB&count=0.5'; return res.json(result); }
        result.success = true;
        result.currency = 'BNB';
        result.wallet_address = address;
        result.network = 'BSC';
        result.deep_link = `bnb:${address}?amount=${amount}`;
        result.web_link = `https://bscscan.com/address/${address}`;
        result.instructions = 'Click deep_link → BNB wallet opens';
    }

    // ============ STRIPE/WEB ============
    else if (paymentMethod === 'stripe' || paymentMethod === 'web' || paymentMethod === 'card') {
        if (!link) { result.error = 'Link required! /api/pay?method=stripe&link=YOUR_LINK&count=100'; return res.json(result); }
        result.success = true;
        result.currency = currency || 'INR';
        result.deep_link = link;
        result.web_link = link;
        result.instructions = 'Click link → Payment page opens';
    }

    // ============ INVALID ============
    else {
        result.error = 'Invalid method';
        result.supported = ['upi', 'paypal', 'bitcoin', 'ethereum', 'usdt', 'bnb', 'stripe'];
        result.examples = {
            upi: `${baseURL}/api/pay?method=upi&upi=example@ybl&count=100`,
            paypal: `${baseURL}/api/pay?method=paypal&email=user@gmail.com&count=10`,
            bitcoin: `${baseURL}/api/pay?method=bitcoin&address=YOUR_BTC&count=0.001`,
            ethereum: `${baseURL}/api/pay?method=ethereum&address=YOUR_ETH&count=0.01`,
            usdt: `${baseURL}/api/pay?method=usdt&address=YOUR_TRC20&count=10`,
            bnb: `${baseURL}/api/pay?method=bnb&address=YOUR_BNB&count=0.5`,
            stripe: `${baseURL}/api/pay?method=stripe&link=YOUR_LINK&count=100`
        };
        return res.json(result);
    }

    // Telegram button ready
    result.telegram_button = {
        text: `💸 PAY ${result.currency||''} ${amount}`,
        url: result.deep_link
    };

    res.json(result);
});

// ============ SHORT ENDPOINTS ============
app.get('/api/upi', (req, res) => {
    const { upi, count, name, note } = req.query;
    if (!upi) return res.json({ error: 'UPI ID required! /api/upi?upi=example@ybl&count=100' });
    res.redirect(`/api/pay?method=upi&upi=${upi}&count=${count||100}&name=${name||'Payment'}&note=${note||''}`);
});

app.get('/api/paypal', (req, res) => {
    const { email, count, currency, note } = req.query;
    if (!email) return res.json({ error: 'Email required! /api/paypal?email=user@gmail.com&count=10' });
    res.redirect(`/api/pay?method=paypal&email=${email}&count=${count||10}&currency=${currency||'USD'}&note=${note||''}`);
});

app.get('/api/btc', (req, res) => {
    const { address, count, note } = req.query;
    if (!address) return res.json({ error: 'Address required! /api/btc?address=YOUR_BTC&count=0.001' });
    res.redirect(`/api/pay?method=bitcoin&address=${address}&count=${count||0.001}&note=${note||''}`);
});

app.get('/api/eth', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.json({ error: 'Address required! /api/eth?address=YOUR_ETH&count=0.01' });
    res.redirect(`/api/pay?method=ethereum&address=${address}&count=${count||0.01}`);
});

app.get('/api/usdt', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.json({ error: 'Address required! /api/usdt?address=YOUR_TRC20&count=10' });
    res.redirect(`/api/pay?method=usdt&address=${address}&count=${count||10}`);
});

app.get('/api/bnb', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.json({ error: 'Address required! /api/bnb?address=YOUR_BNB&count=0.5' });
    res.redirect(`/api/pay?method=bnb&address=${address}&count=${count||0.5}`);
});

// ============ ALL METHODS ============
app.get('/api/methods', (req, res) => {
    const baseURL = `https://${req.get('host')}`;
    res.json({
        success: true,
        base_url: baseURL,
        methods: {
            upi: { name: '📱 UPI', example: `${baseURL}/api/pay?method=upi&upi=example@ybl&count=100`, required: 'upi' },
            paypal: { name: '💰 PayPal', example: `${baseURL}/api/pay?method=paypal&email=user@gmail.com&count=10`, required: 'email' },
            bitcoin: { name: '₿ Bitcoin', example: `${baseURL}/api/pay?method=bitcoin&address=YOUR_BTC&count=0.001`, required: 'address' },
            ethereum: { name: 'Ξ Ethereum', example: `${baseURL}/api/pay?method=ethereum&address=YOUR_ETH&count=0.01`, required: 'address' },
            usdt: { name: '💎 USDT', example: `${baseURL}/api/pay?method=usdt&address=YOUR_TRC20&count=10`, required: 'address' },
            bnb: { name: '💛 BNB', example: `${baseURL}/api/pay?method=bnb&address=YOUR_BNB&count=0.5`, required: 'address' },
            stripe: { name: '💳 Stripe', example: `${baseURL}/api/pay?method=stripe&link=YOUR_LINK&count=100`, required: 'link' }
        }
    });
});

// ============ 404 ============
app.use((req, res) => {
    res.json({ error: 'Not found', dashboard: '/', docs: '/api/methods' });
});

// ============ START ============
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 BRONX API on port ${PORT}`));

module.exports = app;
