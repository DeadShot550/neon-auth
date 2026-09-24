// Minimal static file server with SPA fallback.
// Runs via Electron's embedded Node: ELECTRON_RUN_AS_NODE=1 Freebuff.exe server.cjs
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8619;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let filePath = path.normalize(path.join(ROOT, urlPath));

    // Prevent path traversal
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    // If path has no extension and doesn't exist, serve index.html (SPA fallback)
    let stat = null;
    try {
      stat = fs.statSync(filePath);
    } catch {
      stat = null;
    }

    if (stat && stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
      stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    }

    if (!stat) {
      // SPA fallback: any extensionless route serves index.html
      if (!path.extname(urlPath)) {
        filePath = path.join(ROOT, "index.html");
        stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
      }
      if (!stat) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("404 Not Found");
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", () => {
      res.destroy();
    });
    stream.pipe(res);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 Internal Server Error");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Croxy Auth dev server running at http://127.0.0.1:${PORT}`);
});
