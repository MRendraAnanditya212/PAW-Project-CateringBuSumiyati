const ProdukModel = require('../models/produkModel');
const config = require('../config');
const { formatRupiah } = require('../utils/currency');

/**
 * Controller Frontend (Web Pages)
 * Mengatur alur pemrosesan request untuk merender tampilan EJS
 */
const homeController = {
  /**
   * Halaman Utama (Homepage)
   * Merender view EJS dengan data dinamis dari Model
   */
  index(req, res) {
    const daftarProduk = ProdukModel.getAll();
    
    // Ekstraksi kategori unik untuk navigasi tab filter
    const kategoriList = ['Semua', ...new Set(daftarProduk.map(p => p.kategori))];

    res.render('index', {
      judul: `${config.appName} — PPAW Week 7 (MVC & REST API)`,
      config: config,
      produk: daftarProduk,
      kategoriList: kategoriList,
      formatRupiah: formatRupiah,
      totalProduk: daftarProduk.length,
      anggotaKelompok: config.kelompok.anggota
    });
  }
};

module.exports = homeController;
