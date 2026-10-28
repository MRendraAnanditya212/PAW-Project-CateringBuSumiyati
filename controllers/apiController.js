const ProdukModel = require('../models/produkModel');
const config = require('../config');

/**
 * Controller API - Mengelola endpoint REST API JSON
 */
const apiController = {
  /**
   * GET /api/status
   * Mengirimkan response dalam format JSON yang menunjukkan status aplikasi atau server.
   */
  getStatus(req, res) {
    const statusData = {
      status: 'online',
      aplikasi: config.appName,
      tagline: config.tagline,
      versi: '1.0.0',
      uptimeDetik: Math.round(process.uptime()),
      waktuServer: new Date().toISOString(),
      lingkungan: config.env,
      kelompok: {
        nama: config.kelompok.nama,
        kelas: config.kelompok.kelas,
        mataKuliah: config.kelompok.mataKuliah,
        anggota: config.kelompok.anggota.map(a => `${a.nama} (${a.nim})`)
      },
      sistem: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsageMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
      }
    };

    return res.status(200).json(statusData);
  },

  /**
   * GET /api/produk
   * Mengirimkan data produk dalam bentuk array JSON.
   * Mendukung filter query: ?kategori=Nasi Box
   */
  getProduk(req, res) {
    const { kategori, wrap } = req.query;
    let data = ProdukModel.getAll();

    if (kategori) {
      data = ProdukModel.getByKategori(kategori);
    }

    // Jika klien meminta format dibungkus objek { sukses: true, data: [...] }
    if (wrap === 'true' || wrap === '1') {
      return res.status(200).json({
        sukses: true,
        jumlah: data.length,
        kategori: kategori || 'Semua',
        data: data
      });
    }

    // Default sesuai instruksi PPAW Week 7: Mengirimkan data produk dalam bentuk array JSON
    return res.status(200).json(data);
  },

  /**
   * GET /api/produk/:id
   * Mengambil detail satu produk berdasarkan ID
   */
  getProdukById(req, res) {
    const { id } = req.params;
    const produk = ProdukModel.getById(id);

    if (!produk) {
      return res.status(404).json({
        sukses: false,
        pesan: `Produk dengan ID #${id} tidak ditemukan.`
      });
    }

    return res.status(200).json(produk);
  }
};

module.exports = apiController;
