/**
 * Entry Point Utama Aplikasi - Catering Bu Sumiyati
 * PPAW Week 7: Integrasi Frontend, REST API, dan Middleware Logger
 * Berbasis Express.js dengan pola arsitektur Model-View-Controller (MVC)
 */

const express = require('express');
const path = require('path');
const config = require('./config');
const requestLogger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

// ==========================================
// 1. PENGATURAN TEMPLATE ENGINE (EJS)
// ==========================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// 2. MIDDLEWARES APLIKASI
// ==========================================
// Middleware Logger (Mencatat Method, URL, Status HTTP, Waktu & IP)
app.use(requestLogger);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Melayani file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// 3. ROUTING APLIKASI (WEB & API)
// ==========================================
app.use('/', routes);

// ==========================================
// 4. PENANGANAN 404 (NOT FOUND)
// ==========================================
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      sukses: false,
      pesan: `Endpoint API '${req.method} ${req.originalUrl}' tidak ditemukan.`,
      dokumentasi: {
        status: 'GET /api/status',
        produk: 'GET /api/produk',
        detailProduk: 'GET /api/produk/:id'
      }
    });
  }

  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>404 - Halaman Tidak Ditemukan</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
      <div class="text-center max-w-md">
        <h1 class="text-6xl font-extrabold text-amber-500 mb-4">404</h1>
        <h2 class="text-xl font-bold mb-2">Halaman Tidak Ditemukan</h2>
        <p class="text-slate-400 text-sm mb-6">Jalur URL yang Anda minta tidak tersedia pada server ${config.appName}.</p>
        <a href="/" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-sm transition-colors">
          Kembali ke Beranda
        </a>
      </div>
    </body>
    </html>
  `);
});

// ==========================================
// 5. PENANGANAN ERROR GLOBAL (500)
// ==========================================
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err.stack);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(500).json({
      sukses: false,
      pesan: 'Terjadi kesalahan internal pada server.',
      error: config.env === 'development' ? err.message : undefined
    });
  }
  res.status(500).send('Terjadi kesalahan pada server kami.');
});

// ==========================================
// 6. MENJALANKAN SERVER
// ==========================================
app.listen(config.port, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 ${config.appName} — Server Berjalan`);
  console.log(`📍 URL Lokal   : http://localhost:${config.port}`);
  console.log(`📦 Status API  : http://localhost:${config.port}/api/status`);
  console.log(`🍲 Produk API  : http://localhost:${config.port}/api/produk`);
  console.log(`🧩 Arsitektur  : Model-View-Controller (MVC) + EJS`);
  console.log(`📝 Log Request : ${path.join(config.logDir, config.logFile)}`);
  console.log(`======================================================\n`);
});

module.exports = app;
