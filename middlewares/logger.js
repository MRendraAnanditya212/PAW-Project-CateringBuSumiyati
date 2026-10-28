const fs = require('fs');
const path = require('path');
const config = require('../config');

// Inisialisasi direktori log dan berkas tabel Markdown
const logPath = path.join(config.logDir, config.logFile);

try {
  fs.mkdirSync(config.logDir, { recursive: true });
  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(
      logPath,
      '# Log Aktivitas HTTP Request — ' + config.appName + '\n\n' +
      'Tercatat otomatis oleh middleware logger Express.js (PPAW Week 7).\n\n' +
      '| Timestamp (ISO) | Method | Endpoint URL | Status | Durasi | Client IP |\n' +
      '|---|:---:|---|:---:|:---:|---|\n'
    );
  }
} catch (err) {
  console.error('[LOGGER INIT ERROR]:', err.message);
}

// Helper untuk sanitasi karakter pipe '|' agar tabel markdown tidak rusak
const escapeMarkdown = (text) => String(text || '').replace(/\|/g, '%7C');

/**
 * Middleware Logger Express
 * Mencatat Method HTTP, Endpoint, Status HTTP Response, Timestamp, dan Durasi Eksekusi.
 */
function requestLogger(req, res, next) {
  const hrStart = process.hrtime.bigint();
  const timestampLocal = new Date().toLocaleTimeString('id-ID');
  const timestampISO = new Date().toISOString();

  // Tangkap event 'finish' saat respons selesai dikirim ke browser/klien
  res.on('finish', () => {
    const durationMs = (Number(process.hrtime.bigint() - hrStart) / 1e6).toFixed(2);
    const statusCode = res.statusCode;
    const method = req.method;
    const url = req.originalUrl || req.url;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    // 1. Tampilkan ke Terminal / Console Backend
    const statusColor = statusCode >= 400 ? '\x1b[31m' : statusCode >= 300 ? '\x1b[33m' : '\x1b[32m';
    const resetColor = '\x1b[0m';
    console.log(
      `[${timestampLocal}] ${method} ${url} -> ${statusColor}${statusCode}${resetColor} (${durationMs} ms) - IP: ${clientIp}`
    );

    // 2. Tulis ke file log markdown (logs/logger.md)
    const logLine = `| ${timestampISO} | \`${method}\` | \`${escapeMarkdown(url)}\` | **${statusCode}** | ${durationMs} ms | ${escapeMarkdown(clientIp)} |\n`;
    fs.appendFile(logPath, logLine, (err) => {
      if (err) {
        console.error('[LOGGER WRITE ERROR]:', err.message);
      }
    });
  });

  next();
}

module.exports = requestLogger;
