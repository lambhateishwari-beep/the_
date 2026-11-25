// Local preview:  ADMIN_PASSWORD=yourpassword node dev-server.js   ->  http://localhost:3000
// (Vercel does this routing for you when deployed; this file is only for testing on a computer.)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUB = path.join(__dirname, 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = decodeURIComponent(url.pathname);
  if (p.startsWith('/api/')) {
    const name = p.slice(5).replace(/[^a-z]/gi, '');
    const file = path.join(__dirname, 'api', name + '.js');
    if (!fs.existsSync(file)) { res.statusCode = 404; return res.end('{"error":"not found"}'); }
    return Promise.resolve(require(file)(req, res)).catch((e) => { console.error(e); res.statusCode = 500; res.end('{}'); });
  }
  if (p === '/') p = '/index.html';
  else if (!path.extname(p)) p += '.html'; // cleanUrls
  const full = path.normalize(path.join(PUB, p));
  if (!full.startsWith(PUB) || !fs.existsSync(full)) { res.statusCode = 404; return res.end('Not found'); }
  res.setHeader('Content-Type', TYPES[path.extname(full)] || 'application/octet-stream');
  fs.createReadStream(full).pipe(res);
}).listen(PORT, () => console.log('Preview on http://localhost:' + PORT));
