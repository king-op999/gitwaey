// ============================================
// 🚀 BRONX PAYMENT API V4.0
// DIRECT APP OPEN – CALL KARTE HI PAYMENT APP KHULEGI!
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

// ============================================
// 🔥 DIRECT PAYMENT – CALL KARTE HI APP OPEN
// ============================================
app.get('/api/pay', (req, res) => {
    const {
        method,     // upi, paypal, bitcoin, ethereum, usdt, bnb, stripe
        upi,        // UPI ID
        email,      // PayPal email
        address,    // Crypto wallet address
        link,       // Stripe/Web payment link
        count,      // Amount
        currency,   // Currency
        name,       // Merchant name
        note        // Payment note
    } = req.query;

    const paymentMethod = (method || 'upi').toLowerCase();
    const amount = parseFloat(count) || 100;
    let deepLink = '';

    // ============ UPI – DIRECT APP OPEN ============
    if (paymentMethod === 'upi') {
        if (!upi) {
            return res.send(`<h1>❌ Error</h1><p>UPI ID required!</p><code>/api/pay?method=upi&upi=example@ybl&count=100</code>`);
        }
        deepLink = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name || 'Payment')}&am=${amount}&cu=INR&tn=${encodeURIComponent(note || 'Payment')}`;
    }

    // ============ PAYPAL – DIRECT APP OPEN ============
    else if (paymentMethod === 'paypal') {
        if (!email) {
            return res.send(`<h1>❌ Error</h1><p>PayPal email required!</p><code>/api/pay?method=paypal&email=user@gmail.com&count=10</code>`);
        }
        const curr = currency || 'USD';
        deepLink = `paypal://pay?business=${email}&amount=${amount}&currency_code=${curr}&item_name=${encodeURIComponent(note || 'Payment')}`;
    }

    // ============ BITCOIN – DIRECT WALLET OPEN ============
    else if (paymentMethod === 'bitcoin' || paymentMethod === 'btc') {
        if (!address) {
            return res.send(`<h1>❌ Error</h1><p>Bitcoin address required!</p><code>/api/pay?method=bitcoin&address=YOUR_BTC&count=0.001</code>`);
        }
        deepLink = `bitcoin:${address}?amount=${amount}&label=${encodeURIComponent(note || 'Payment')}`;
    }

    // ============ ETHEREUM – DIRECT WALLET OPEN ============
    else if (paymentMethod === 'ethereum' || paymentMethod === 'eth') {
        if (!address) {
            return res.send(`<h1>❌ Error</h1><p>Ethereum address required!</p><code>/api/pay?method=ethereum&address=YOUR_ETH&count=0.01</code>`);
        }
        deepLink = `ethereum:${address}?value=${amount}`;
    }

    // ============ USDT TRC20 – DIRECT WALLET OPEN ============
    else if (paymentMethod === 'usdt' || paymentMethod === 'tron') {
        if (!address) {
            return res.send(`<h1>❌ Error</h1><p>USDT TRC20 address required!</p><code>/api/pay?method=usdt&address=YOUR_TRC20&count=10</code>`);
        }
        deepLink = `tron:${address}?amount=${amount}`;
    }

    // ============ BNB – DIRECT WALLET OPEN ============
    else if (paymentMethod === 'bnb' || paymentMethod === 'bsc') {
        if (!address) {
            return res.send(`<h1>❌ Error</h1><p>BNB address required!</p><code>/api/pay?method=bnb&address=YOUR_BNB&count=0.5</code>`);
        }
        deepLink = `bnb:${address}?amount=${amount}`;
    }

    // ============ STRIPE/WEB – DIRECT BROWSER OPEN ============
    else if (paymentMethod === 'stripe' || paymentMethod === 'web' || paymentMethod === 'card') {
        if (!link) {
            return res.send(`<h1>❌ Error</h1><p>Payment link required!</p><code>/api/pay?method=stripe&link=YOUR_LINK&count=100</code>`);
        }
        deepLink = link;
    }

    // ============ INVALID ============
    else {
        return res.send(`<h1>❌ Invalid Method</h1>
            <p>Supported: upi, paypal, bitcoin, ethereum, usdt, bnb, stripe</p>
            <code>/api/pay?method=upi&upi=example@ybl&count=100</code>`);
    }

    // ============ AUTO REDIRECT – DIRECT APP OPEN ============
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💸 Opening Payment...</title>
    <style>
        body {
            background: #000a14;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Segoe UI', sans-serif;
            text-align: center;
            margin: 0;
        }
        .box {
            background: rgba(5,15,35,.9);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(0,150,255,.2);
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0,150,255,.2);
            border-top: 3px solid #0096ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        h2 { color: #0096ff; margin-bottom: 10px; }
        p { color: #888; font-size: 14px; margin: 5px 0; }
        a { color: #00ff88; font-weight: bold; font-size: 16px; text-decoration: none; display: inline-block; margin-top: 15px; padding: 12px 30px; background: rgba(0,255,136,.1); border: 1px solid rgba(0,255,136,.3); border-radius: 10px; }
        .note { color: #ffb400; font-size: 11px; margin-top: 15px; }
    </style>
    <script>
        // Auto redirect to app
        window.onload = function() {
            var deepLink = "${deepLink}";
            console.log("Opening: " + deepLink);
            
            // Try to open app immediately
            window.location.href = deepLink;
            
            // Fallback: If app doesn't open in 3 seconds, show manual button
            setTimeout(function() {
                document.getElementById('manualBtn').style.display = 'inline-block';
                document.getElementById('fallback').style.display = 'block';
            }, 3000);
        };
    </script>
</head>
<body>
    <div class="box">
        <h2>💸 Opening Payment App...</h2>
        <div class="spinner"></div>
        <p>💰 Amount: <b>${amount} ${paymentMethod === 'upi' ? 'INR' : paymentMethod === 'paypal' ? (currency||'USD') : paymentMethod.toUpperCase()}</b></p>
        <p>📱 Method: <b>${paymentMethod.toUpperCase()}</b></p>
        
        <div id="fallback" style="display:none;">
            <p style="color:#ffb400;margin-top:15px;">⚠️ App didn't open automatically?</p>
            <a id="manualBtn" href="${deepLink}" style="display:none;">💸 OPEN APP MANUALLY</a>
        </div>
        
        <p class="note">🔗 If app doesn't open, make sure payment app is installed</p>
    </div>
</body>
</html>`);
});

// ============ JSON API (For Developers who want JSON) ============
app.get('/api/pay/json', (req, res) => {
    const {
        method, upi, email, address, link,
        count, currency, name, note
    } = req.query;

    const paymentMethod = (method || 'upi').toLowerCase();
    const amount = parseFloat(count) || 100;
    const orderID = generateOrderID();
    let deepLink = '';
    let result = { success: true, order_id: orderID, method: paymentMethod, amount };

    if (paymentMethod === 'upi') {
        if (!upi) return res.json({ success: false, error: 'UPI ID required!' });
        deepLink = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name||'Payment')}&am=${amount}&cu=INR&tn=${encodeURIComponent(note||'Payment')}`;
        result.upi_id = upi;
        result.currency = 'INR';
    } else if (paymentMethod === 'paypal') {
        if (!email) return res.json({ success: false, error: 'Email required!' });
        deepLink = `paypal://pay?business=${email}&amount=${amount}&currency_code=${currency||'USD'}`;
        result.currency = currency || 'USD';
    } else if (paymentMethod === 'bitcoin' || paymentMethod === 'btc') {
        if (!address) return res.json({ success: false, error: 'Address required!' });
        deepLink = `bitcoin:${address}?amount=${amount}`;
        result.currency = 'BTC';
    } else if (paymentMethod === 'ethereum' || paymentMethod === 'eth') {
        if (!address) return res.json({ success: false, error: 'Address required!' });
        deepLink = `ethereum:${address}?value=${amount}`;
        result.currency = 'ETH';
    } else if (paymentMethod === 'usdt' || paymentMethod === 'tron') {
        if (!address) return res.json({ success: false, error: 'Address required!' });
        deepLink = `tron:${address}?amount=${amount}`;
        result.currency = 'USDT';
    } else if (paymentMethod === 'bnb' || paymentMethod === 'bsc') {
        if (!address) return res.json({ success: false, error: 'Address required!' });
        deepLink = `bnb:${address}?amount=${amount}`;
        result.currency = 'BNB';
    } else if (paymentMethod === 'stripe' || paymentMethod === 'web') {
        if (!link) return res.json({ success: false, error: 'Link required!' });
        deepLink = link;
    } else {
        return res.json({ success: false, error: 'Invalid method', supported: ['upi','paypal','bitcoin','ethereum','usdt','bnb','stripe'] });
    }

    result.deep_link = deepLink;
    result.telegram_button = { text: `💸 PAY ${amount}`, url: deepLink };
    res.json(result);
});

// ============ SHORT ENDPOINTS (DIRECT REDIRECT) ============
app.get('/api/upi', (req, res) => {
    const { upi, count, name, note } = req.query;
    if (!upi) return res.send('<h1>❌ UPI ID required!</h1>');
    res.redirect(`/api/pay?method=upi&upi=${upi}&count=${count||100}&name=${name||'Payment'}&note=${note||''}`);
});

app.get('/api/paypal', (req, res) => {
    const { email, count, currency, note } = req.query;
    if (!email) return res.send('<h1>❌ Email required!</h1>');
    res.redirect(`/api/pay?method=paypal&email=${email}&count=${count||10}&currency=${currency||'USD'}&note=${note||''}`);
});

app.get('/api/btc', (req, res) => {
    const { address, count, note } = req.query;
    if (!address) return res.send('<h1>❌ Address required!</h1>');
    res.redirect(`/api/pay?method=bitcoin&address=${address}&count=${count||0.001}&note=${note||''}`);
});

app.get('/api/eth', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.send('<h1>❌ Address required!</h1>');
    res.redirect(`/api/pay?method=ethereum&address=${address}&count=${count||0.01}`);
});

app.get('/api/usdt', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.send('<h1>❌ Address required!</h1>');
    res.redirect(`/api/pay?method=usdt&address=${address}&count=${count||10}`);
});

app.get('/api/bnb', (req, res) => {
    const { address, count } = req.query;
    if (!address) return res.send('<h1>❌ Address required!</h1>');
    res.redirect(`/api/pay?method=bnb&address=${address}&count=${count||0.5}`);
});

// ============ DASHBOARD ============
app.get('/', (req, res) => {
    const baseURL = `https://${req.get('host')}`;
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>🚀 BRONX PAYMENT API V4</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root{--bg:#000a14;--s:rgba(5,15,35,.85);--b:rgba(0,150,255,.08);--t:#d0d8f0}
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:var(--bg);color:var(--t);font-family:'Rajdhani',sans-serif;min-height:100vh}
        body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(0,150,255,.06),transparent 60%);pointer-events:none;z-index:0}
        .top{text-align:center;padding:40px 20px 20px;position:relative;z-index:1}
        .top h1{font-family:'Orbitron',sans-serif;font-size:clamp(24px,5vw,40px);background:linear-gradient(90deg,#0096ff,#00d4ff,#8b00ff,#ffb400);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:rb 4s linear infinite}@keyframes rb{0%{background-position:0% 50%}100%{background-position:300% 50%}}
        .top p{color:#667;font-size:14px}
        .container{max-width:1400px;margin:0 auto;padding:20px;position:relative;z-index:1}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
        .card{background:var(--s);border:1px solid var(--b);border-radius:18px;padding:24px;transition:.3s;backdrop-filter:blur(20px)}
        .card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.5)}
        .icon{font-size:36px;margin-bottom:8px}
        .card h3{color:#fff;font-size:18px;margin-bottom:4px;font-family:'Orbitron',sans-serif}
        .card p{color:#667;font-size:12px;margin-bottom:8px}
        code{display:block;background:rgba(0,0,0,.5);color:#00ff88;padding:10px;border-radius:10px;font-size:9px;word-break:break-all;margin-bottom:10px;font-family:monospace}
        button{background:linear-gradient(135deg,#0096ff,#0066cc);color:#fff;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-weight:700;font-family:'Orbitron',sans-serif;width:100%;transition:.3s}
        button:hover{transform:scale(1.02)}
        .badge{display:inline-block;background:rgba(0,255,136,.06);color:#00ff88;padding:4px 12px;border-radius:20px;font-size:10px;border:1px solid rgba(0,255,136,.12);margin:4px}
        .highlight{background:rgba(0,150,255,.08);border:1px solid rgba(0,150,255,.15);border-radius:12px;padding:16px;margin-top:20px;text-align:center}
        .highlight h3{color:#0096ff}
        .highlight p{color:#00ff88;font-size:18px;font-weight:700}
    </style>
</head>
<body>
<div class="top">
    <h1>🚀 BRONX PAYMENT API V4</h1>
    <p>⚡ API Call Karte Hi DIRECT APP OPEN! ⚡</p>
    <div style="margin-top:12px">
        <span class="badge">📱 UPI</span><span class="badge">💰 PayPal</span>
        <span class="badge">₿ Bitcoin</span><span class="badge">Ξ Ethereum</span>
        <span class="badge">💎 USDT</span><span class="badge">💛 BNB</span>
        <span class="badge">💳 Stripe</span>
    </div>
</div>
<div class="container">
    <div class="highlight">
        <h3>⚡ DIRECT APP OPEN</h3>
        <p>API Call Karte Hi Payment App Khulegi!</p>
        <p style="color:#667;font-size:12px">No JSON response, seedha app redirect</p>
    </div>
    <div class="grid" style="margin-top:20px">
        <div class="card" style="border-top:3px solid #0096ff">
            <div class="icon">📱</div><h3>UPI</h3><p>GPay/PhonePe/Paytm</p>
            <code>${baseURL}/api/pay?method=upi&upi=example@ybl&count=100</code>
            <button onclick="window.open('${baseURL}/api/pay?method=upi&upi=example@ybl&count=100','_blank')">💸 TEST</button>
        </div>
        <div class="card" style="border-top:3px solid #003087">
            <div class="icon">💰</div><h3>PayPal</h3><p>International</p>
            <code>${baseURL}/api/pay?method=paypal&email=user@gmail.com&count=10</code>
            <button onclick="window.open('${baseURL}/api/pay?method=paypal&email=user@gmail.com&count=10','_blank')">💸 TEST</button>
        </div>
        <div class="card" style="border-top:3px solid #f7931a">
            <div class="icon">₿</div><h3>Bitcoin</h3><p>BTC Network</p>
            <code>${baseURL}/api/pay?method=bitcoin&address=YOUR_BTC&count=0.001</code>
            <button onclick="window.open('${baseURL}/api/pay?method=bitcoin&address=YOUR_BTC&count=0.001','_blank')">💸 TEST</button>
        </div>
        <div class="card" style="border-top:3px solid #627eea">
            <div class="icon">Ξ</div><h3>Ethereum</h3><p>ETH Network</p>
            <code>${baseURL}/api/pay?method=ethereum&address=YOUR_ETH&count=0.01</code>
            <button onclick="window.open('${baseURL}/api/pay?method=ethereum&address=YOUR_ETH&count=0.01','_blank')">💸 TEST</button>
        </div>
        <div class="card" style="border-top:3px solid #26a17b">
            <div class="icon">💎</div><h3>USDT</h3><p>TRC20 Network</p>
            <code>${baseURL}/api/pay?method=usdt&address=YOUR_TRC20&count=10</code>
            <button onclick="window.open('${baseURL}/api/pay?method=usdt&address=YOUR_TRC20&count=10','_blank')">💸 TEST</button>
        </div>
        <div class="card" style="border-top:3px solid #f3ba2f">
            <div class="icon">💛</div><h3>BNB</h3><p>BSC Network</p>
            <code>${baseURL}/api/pay?method=bnb&address=YOUR_BNB&count=0.5</code>
            <button onclick="window.open('${baseURL}/api/pay?method=bnb&address=YOUR_BNB&count=0.5','_blank')">💸 TEST</button>
        </div>
        <div class="card" style="border-top:3px solid #635bff">
            <div class="icon">💳</div><h3>Stripe</h3><p>Card Payment</p>
            <code>${baseURL}/api/pay?method=stripe&link=YOUR_LINK&count=100</code>
            <button onclick="window.open('${baseURL}/api/pay?method=stripe&link=YOUR_LINK&count=100','_blank')">💸 TEST</button>
        </div>
    </div>
</div>
</body></html>`);
});

// ============ 404 ============
app.use((req, res) => {
    res.send(`<h1>❌ Not Found</h1><p><a href="/">Dashboard</a></p>`);
});

// ============ START ============
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 BRONX V4 on port ${PORT}`));
module.exports = app;
